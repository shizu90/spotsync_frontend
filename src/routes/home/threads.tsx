import { Thread } from "@/components/post/thread";
import { Spinner } from "@/components/ui/spinner";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function Threads() {
    const postService = new PostService();

    const {data, fetchNextPage, hasNextPage }  = useInfiniteQuery({
        queryKey: ['home-threads'],
        queryFn: ({pageParam}) => {
            return postService.paginatePosts({page: pageParam, limit: 6});
        },
        getNextPageParam: (res) => {
            return res?.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
        },
        initialPageParam: 1
    });

    const posts = useMemo(() => {
        return data?.pages.reduce((acc: PostModel[], page) => {
            return [...acc, ...page?.data.data.items || []];
        }, []);
    }, [data]);

    return (
        <InfiniteScroll 
            dataLength={posts?.length || 0}    
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Spinner className="size-8"/>}
            endMessage={<p className="text-center text-sm text-foreground/60 mt-8">No more posts to show</p>}
            className="flex flex-col items-center gap-4 mt-2 justify-center"
            style={{overflow: 'hidden'}}    
        >
            {
                posts?.map((item) => (
                    <div key={item.id} className="w-full">
                        <Thread post={item}/>
                    </div>
                ))
            }
        </InfiniteScroll>
    );
}
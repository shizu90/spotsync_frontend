import { Post } from "@/components/post/post";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function Posts() {
    const { auth, signOut } = useAuthStore();

    if (!auth) return null;

    const postService = new PostService(auth?.bearerToken);

    const observer = useRef<IntersectionObserver>();
    const {data, fetchNextPage, hasNextPage, isFetching, isLoading }  = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam}) => {
            const res = postService.paginatePosts({page: pageParam, limit: 6})
                .then((res) => res)
                .catch((err: AxiosError) => {
                    if (err.response?.status === 403) {
                        signOut();
                    }
                });

            return res;
        },
        getNextPageParam: (res) => {
            return res?.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
        },
        initialPageParam: 1
    });

    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasNextPage, isFetching, fetchNextPage]);

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
                    <div ref={lastElementRef} key={item.id} className="w-full">
                        <Post post={item}/>
                    </div>
                ))
            }
        </InfiniteScroll>
    );
}
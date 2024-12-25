import { Thread } from "@/components/post/thread";
import { ThreadSkeleton } from "@/components/post/thread.skeleton";
import { Spinner } from "@/components/ui/spinner";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

export function PostDetail() {
    const { postId } = useParams();
    const postData = useQuery({
        queryKey: [`post-${postId}`],
        queryFn: () => {
            if (!postId) {
                return Promise.resolve(null);
            }

            const postService = new PostService();
            return postService.getPost(postId);
        }
    });

    const repliesData  = useInfiniteQuery({
        queryKey: [`post-${postId}-replies`],
        queryFn: ({pageParam}) => {
            const postService = new PostService();

            return postService.paginatePosts({
                parent_id: postId,
                page: pageParam,
                limit: 6
            });
        },
        getNextPageParam: (res) => {
            return res?.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
        },
        initialPageParam: 1
    });

    const replies = useMemo(() => {
        return repliesData.data?.pages.reduce((acc: PostModel[], page) => {
            return [...acc, ...page?.data.data.items || []];
        }, []);
    }, [repliesData.data]);

    return (
        <div className="flex flex-col gap-4 md:w-3/5 w-full">
            {
                postData.isLoading ? (
                    <ThreadSkeleton/>
                ) : (
                    postData.data ? (
                        <div>
                            <Thread post={postData.data.data.data} shouldNavigate={false} showReplyingTo={true}/>

                            <hr className="my-4 border-foreground/10"/>

                            <div
                                className="flex flex-col gap-4"
                            >
                                <InfiniteScroll 
                                    dataLength={replies?.length || 0}    
                                    next={repliesData.fetchNextPage}
                                    hasMore={repliesData.hasNextPage}
                                    loader={<Spinner className="size-8"/>}
                                    endMessage={<p className="text-center text-sm text-foreground/60 mt-8">No more replies to show</p>}
                                    className="flex flex-col items-center gap-4 mt-2 justify-center"
                                    style={{overflow: 'hidden'}}    
                                >
                                    {
                                        replies?.map((item) => (
                                            <div key={item.id} className="w-full">
                                                <Thread post={item} shouldNavigate={true} showReplyingTo={false}/>
                                            </div>
                                        ))
                                    }
                                </InfiniteScroll>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-foreground text-xs">
                            Post not found
                        </div>
                    )
                )
            }
        </div>
    );
}
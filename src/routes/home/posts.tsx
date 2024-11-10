import { Post } from "@/components/post/post";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";

export function Posts() {
    const { auth } = useAuthStore();

    if (!auth) return null;

    const postService = new PostService(auth?.bearerToken);

    const observer = useRef<IntersectionObserver>();
    const {data, fetchNextPage, hasNextPage, isFetching, isLoading}  = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam}) => postService.paginatePosts(
            {
                page: pageParam,
                limit: 12
            }
        ),
        getNextPageParam: (res) => {
            return res.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
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
            return [...acc, ...page.data.data.items];
        }, []);
    }, [data]);

    return ( 
        <div className="flex flex-col items-center gap-4 mt-2">
            {
                posts?.map((item) => (
                    <div ref={lastElementRef} key={item.id} className="w-full">
                        <Post post={item}/>
                    </div>
                ))
            }
            {
                isFetching && <Spinner className="size-8"/>
            }
        </div>
    );
}
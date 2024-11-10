import { Post } from "@/components/post/post";
import { useAuthStore } from "@/hooks/auth-store";
import { Post as PostModel, PostService } from "@/services/posts";
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

    if (isLoading) return <div>Loading...</div>;

    return ( 
        <div className="flex flex-col gap-4 mt-2">
            {
                posts?.map((item) => (
                    <div ref={lastElementRef} key={item.id}>
                        <Post post={item}/>
                    </div>
                ))
            }
        </div>
    );
}
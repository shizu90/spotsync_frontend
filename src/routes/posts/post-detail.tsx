import { Post } from "@/components/post/post";
import { Spinner } from "@/components/ui/spinner";
import { PostService } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function PostDetail() {
    const { postId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => {
            if (!postId) {
                return Promise.resolve(null);
            }

            const postService = new PostService();
            return postService.getPost(postId);
        }
    })

    return (
        <div className="flex flex-col gap-4 w-2/5">
            {
                isLoading ? (
                    <Spinner/>
                ) : (
                    data ? (
                        <div>
                            <Post post={data.data.data}/>

                            <hr className="my-4 border-foreground/10"/>

                            {
                                data.data.data.children_posts.map((post) => (
                                    <Post post={post} key={post.id}/>
                                ))
                            }
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
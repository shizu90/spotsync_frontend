import { readableTime } from "@/lib/time";
import { Post as PostModel } from "@/types/posts";
import clsx from "clsx";
import { useState } from "react";
import { FaHeart, FaReply } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { PostAttachment } from "./post-attachment";

interface PostProps {
    post: PostModel;
}

export function Post(props: PostProps) {
    const [post, setPost] = useState<PostModel>(props.post);
    
    const likePost = () => {
        setPost({
            ...post,
            liked: !post.liked,
            total_likes: post.liked ? post.total_likes - 1 : post.total_likes + 1
        });
    };

    const replyPost = () => {
        setPost({
            ...post,
            total_childrens: post.total_childrens + 1
        });
    };

    return (
        <div className="bg-background border border-foreground/10 shadow-sm flex flex-col gap-4 p-4 rounded-lg">
            <div className="flex gap-4">
                {
                    post.group ? (
                        <div className="flex flex-col relative w-10">
                            <Avatar className="size-8">
                                <AvatarImage src="src/assets/spotsync_icon.svg" />
                            </Avatar>
                            <Avatar className="size-6 absolute bottom-0 right-0">
                                <AvatarImage src="src/assets/spotsync_icon.svg" />
                            </Avatar>
                        </div>
                    ) : (
                        <Avatar className="size-10">
                            <AvatarImage src="src/assets/spotsync_icon.svg" />
                        </Avatar>
                    )
                }
                <div className="flex flex-col gap-[-2]">
                    {
                        post.group ? (
                            <div className="flex gap-2 items-center">
                                <Link to={`/users/${post.creator.id}`} className="font-bold text-md">{post.creator.profile.display_name}</Link>
                                <Link to={`/groups/${post.group.id}`} className="text-xs text-muted-foreground">{post.group.name}</Link>
                            </div>    
                        ) : (
                            <Link to={`/users/${post.creator.id}`} className="font-bold text-md">{post.creator.profile.display_name}</Link>
                        )
                    }
                    <span className="text-xs text-muted-foreground">
                        {readableTime(post.created_at)}
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm">
                    {post.content}
                </p>
                <div className="flex gap-4 items-center">
                    {
                        post.attachments.map((attachment) => <PostAttachment attachment={attachment}/>)
                    }
                </div>
            </div>
            <div className="flex gap-4 justify-end">
                <button className="flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary" onClick={() => replyPost()}>
                    <FaReply/>
                    <span>{post.total_childrens} replies</span>
                </button>
                <button className={clsx(
                    "flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary",
                    post.liked ? "text-secondary" : "text-foreground"
                )} onClick={() => likePost()}>
                    <FaHeart/>
                    <span>{post.total_likes} likes</span>
                </button>
            </div>
        </div>
    );
}
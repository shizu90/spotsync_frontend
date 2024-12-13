import { useToast } from "@/hooks/use-toast";
import { readableTime } from "@/lib/time";
import { LikableSubject, LikeService } from "@/services/likes";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import clsx from "clsx";
import { useState } from "react";
import { FaHeart, FaReply } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PostAttachment } from "./post-attachment";
import { ReplyPost } from "./reply-post";

interface ThreadProps {
    post: PostModel;
}

export function Thread(props: ThreadProps) {
    const [post, setPost] = useState<PostModel>(props.post);
    const [isReplying, setIsReplying] = useState(false);
    const { toast } = useToast();
    
    const refetchPost = () => {
        const post = new PostService();

        post.getPost(props.post.id).then((res) => {
            setPost(res.data.data);
        });
    };

    const likePost = () => {
        const service = new LikeService();

        if (post.liked) {
            service.unlike(LikableSubject.POST, post.id).then(() => {
                refetchPost();
            });
        } else {
            service.like({
                subject: LikableSubject.POST,
                subject_id: post.id,
            }).then(() => {
                refetchPost();
            }).catch((err) => {
                toast({
                    title: 'Failed to like post',
                    description: err.response.data.message,
                    variant: 'destructive',
                });
            });
        }
    };

    const onReplied = () => {
        setIsReplying(false);
        setPost({
            ...post,
            total_childrens: post.total_childrens + 1,
        });
    };

    return (
        <div className="bg-popover border border-foreground/10 shadow-sm flex flex-col gap-4 p-4 rounded-lg">
            <div className="w-ful flex justify-between">
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
                                    <Link to={`/users/${post.creator.id}`} className="font-bold text-md hover:underline">{post.creator.profile.display_name}</Link>
                                    <Link to={`/groups/${post.group.id}`} className="text-xs text-muted-foreground hover:underline">{post.group.name}</Link>
                                </div>    
                            ) : (
                                <Link to={`/users/${post.creator.id}`} className="font-bold text-md hover:underline">{post.creator.profile.display_name}</Link>
                            )
                        }
                        <span className="text-xs text-muted-foreground">
                            {readableTime(post.created_at)}
                        </span>
                    </div>
                </div>
                {
                    post.total_childrens > 0 && (
                        <Link to={`/posts/${props.post.id}`} className="text-sm hover:underline hover:text-secondary">
                            View thread
                        </Link>
                    )
                }
            </div>
            <div>
                <p className="text-sm">
                    {post.content}
                </p>
                <div className={clsx(
                    "flex gap-4 items-center flex-wrap",
                    post.attachments.length > 0 ? "mt-4" : ""
                )}>
                    {
                        post.attachments.map((attachment) => (
                            <PostAttachment
                                postId={props.post.id}
                                attachment={attachment}
                                className="w-5/12 h-32"
                                key={attachment.id}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="flex gap-4 justify-end">
                <Dialog open={isReplying} onOpenChange={() => {
                    setIsReplying(!isReplying);
                }}>
                    <DialogTrigger asChild>
                        <button className="flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary">
                            <FaReply/>
                            <span>{post.total_childrens} replies</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Reply to {post.creator.profile.display_name}'s post</DialogTitle>
                        </DialogHeader>
                        <ReplyPost parentPost={post} onReplied={onReplied}/>
                    </DialogContent>
                </Dialog>
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
import { useToast } from "@/hooks/use-toast";
import { readableTime } from "@/lib/time";
import { LikableSubject, LikeService } from "@/services/likes";
import { PostService } from "@/services/posts";
import { Post as PostModel } from "@/types/posts";
import clsx from "clsx";
import { useState } from "react";
import { FaHeart, FaReply } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { DefaultUserIcon } from "../icon/default-user-icon";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PostAttachment } from "./post-attachment";
import { ReplyPost } from "./reply-post";

interface ThreadProps {
    post: PostModel;
    shouldNavigate?: boolean;
    showReplyingTo?: boolean;
}

export function Thread(props: ThreadProps) {
    const [post, setPost] = useState<PostModel>(props.post);
    const [isReplying, setIsReplying] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    
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

        navigate(`/posts/${post.id}`);
    };

    return (
        <div 
            className={clsx(
                "bg-popover border border-foreground/10 shadow-sm flex flex-col gap-4 p-4 rounded-lg z-0",
                props.shouldNavigate ? "hover:cursor-pointer" : ""
            )}
            onClick={(_) => {props.shouldNavigate ? navigate(`/posts/${post.id}`) : null}}
            id={`post-${post.id}`}
        >
            {
                props.post.parent_id && props.showReplyingTo ? (
                    <Link
                        to={`/posts/${props.post.parent_id}`}
                        className="text-xs flex gap-2 items-center hover:text-secondary caret-transparent"
                    >
                        <FaReply className="size-3"/>
                        Replying to {props.post.parent?.creator.profile.display_name}'s post
                    </Link>
                ) : null
            }
            <div className="w-ful flex justify-between">
                <div className="flex gap-4">
                    {
                        post.group ? (
                            <div className="flex flex-col relative w-10 caret-transparent">
                                <Link
                                    to={`/groups/${props.post.group?.id}`}
                                >
                                    <Avatar className="size-8">
                                        <AvatarImage src={props.post.group?.group_picture} />
                                    </Avatar>
                                </Link>
                                <Link
                                    to={`/users/${props.post.creator.id}`}
                                >
                                    <Avatar className="size-6 absolute bottom-0 right-0">
                                        <AvatarImage src={props.post.creator.profile.profile_picture} />
                                    </Avatar>
                                </Link>
                            </div>
                        ) : (
                            <Link
                                to={`/users/${props.post.creator.id}`}
                            >
                                {
                                props.post.creator.profile.profile_picture ? (
                                    <Avatar className="size-10 caret-transparent">
                                        <AvatarImage src={props.post.creator.profile.profile_picture} className="hover:opacity-90"/>
                                    </Avatar>
                                ) : (
                                    <DefaultUserIcon className="p-2 caret-transparent"/>
                                )
                                }
                            </Link>
                        )
                    }
                    <div className="flex flex-col gap-[-2] caret-transparent">
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
            </div>
            <div>
                <p className="text-sm caret-transparent">
                    {post.content}
                </p>
                <div className={clsx(
                    "flex gap-4 items-center flex-wrap caret-transparent",
                    post.attachments.length > 0 ? "mt-4" : ""
                )}>
                    {
                        post.attachments.map((attachment) => (
                            <PostAttachment
                                postId={props.post.id}
                                attachment={attachment}
                                className="w-5/12 h-32"
                                key={attachment.id}
                                data-ignore-nested-link
                            />
                        ))
                    }
                </div>
            </div>
            <div className="flex gap-4 justify-end">
                <Dialog open={isReplying} onOpenChange={() => {
                    setIsReplying(!isReplying);
                }}>
                    <DialogTrigger asChild className="z-10" onClick={(e) => e.stopPropagation()}>
                        <button className="flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary caret-transparent">
                            <FaReply/>
                            <span>{post.total_childrens} replies</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Reply to {post.creator.profile.display_name}'s post</DialogTitle>
                        </DialogHeader>
                        <ReplyPost parentPost={props.post} onReplied={onReplied}/>
                    </DialogContent>
                </Dialog>
                <button className={clsx(
                    "flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary caret-transparent",
                    post.liked ? "text-secondary" : "text-foreground"
                )} onClick={(e) => {likePost();e.stopPropagation()}} data-ignore-nested-link>
                    <FaHeart/>
                    <span>{post.total_likes} likes</span>
                </button>
            </div>
        </div>
    );
}
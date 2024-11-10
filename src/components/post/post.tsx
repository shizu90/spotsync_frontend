import { readableTime } from "@/lib/time";
import { Post as PostModel } from "@/types/posts";
import clsx from "clsx";
import { FaHeart, FaReply } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { PostAttachment } from "./post-attachment";

interface PostProps {
    post: PostModel;
}

export function Post(props: PostProps) {
    return (
        <div className="bg-background border border-foreground/10 shadow-sm flex flex-col gap-4 p-4 rounded-lg">
            <div className="flex gap-4">
                {
                    props.post.group ? (
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
                        props.post.group ? (
                            <div className="flex gap-2 items-center">
                                <Link to={`/users/${props.post.creator.id}`} className="font-bold text-md">{props.post.creator.profile.display_name}</Link>
                                <Link to={`/groups/${props.post.group.id}`} className="text-xs text-muted-foreground">{props.post.group.name}</Link>
                            </div>    
                        ) : (
                            <Link to={`/users/${props.post.creator.id}`} className="font-bold text-md">{props.post.creator.profile.display_name}</Link>
                        )
                    }
                    <span className="text-xs text-muted-foreground">
                        {readableTime(props.post.created_at)}
                    </span>
                </div>
            </div>
            <div>
                <p className="text-sm">
                    {props.post.content}
                </p>
                <div className="flex gap-4 items-center">
                    {
                        props.post.attachments.map((attachment) => <PostAttachment attachment={attachment}/>)
                    }
                </div>
            </div>
            <div className="flex gap-4 justify-end">
                <button className="flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary">
                    <FaReply/>
                    <span>{props.post.total_childrens}</span>
                </button>
                <button className={clsx(
                    "flex gap-2 items-center text-sm duration-100 focus:text-secondary hover:text-secondary",
                    props.post.liked ? "text-secondary" : "text-foreground"
                )}>
                    <FaHeart/>
                    <span>{props.post.total_likes}</span>
                </button>
            </div>
        </div>
    );
}
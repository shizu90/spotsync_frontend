import { PostAttachment as PostAttachmentModel } from "@/types/posts";
import clsx from "clsx";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface PostAttachmentProps {
    attachment: PostAttachmentModel;
    className?: string;
}

export function PostAttachment(props: PostAttachmentProps) {
    return (
        <Dialog>
            <DialogTrigger asChild className={
                clsx(
                    `cursor-pointer ${props.className}`
                )
            }>
                {
                    props.attachment.file_type.includes("image") ? (
                        <img src={props.attachment.file_content} className={clsx(
                            "rounded-lg border border-foreground/10 shadow-sm object-cover",
                            props.className,
                        )}/>
                    ) : (
                        <video/>
                    )
                }
            </DialogTrigger>
            <DialogContent className="p-0 border-0 shadow-none rounded-lg">
                <img src={props.attachment.file_content} className="w-full max-w-full max-h-96 h-full object-contain"/>
            </DialogContent>
        </Dialog>
    );
}
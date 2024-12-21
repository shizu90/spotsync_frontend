import { PostAttachment as PostAttachmentModel } from "@/types/posts";
import clsx from "clsx";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

interface PostAttachmentProps {
    postId: string;
    attachment: PostAttachmentModel;
    className?: string;
}

export function PostAttachment(props: PostAttachmentProps) {
    return (
        <Dialog data-ignore-nested-link>
            {
                props.attachment.file_type.includes("image") ? (
                    <>
                        <DialogTrigger asChild className={
                            clsx(
                                `cursor-pointer ${props.className}`
                            )
                        } onClick={(e) => e.stopPropagation()}>
                            <img src={props.attachment.url} className={clsx(
                                "rounded-lg border border-foreground/10 shadow-sm object-cover",
                                props.className,
                            )}/>
                        </DialogTrigger>
                        <DialogContent 
                            className="p-0 border-0 shadow-none rounded-lg"
                            aria-describedby={undefined}
                            data-ignore-nested-link
                        >
                            <DialogTitle className="hidden">
                                Attachment
                            </DialogTitle>
                            <img src={props.attachment.url} className="w-full max-w-full max-h-96 h-full object-contain"/>
                        </DialogContent>
                    </>
                ) : (
                    <>
                        <DialogTrigger asChild className={
                            clsx(
                                `cursor-pointer ${props.className}`
                            )
                        }>
                            <video src={props.attachment.url} className={clsx(
                                "rounded-lg border border-foreground/10 shadow-sm object-cover",
                                props.className,
                            )}/>
                        </DialogTrigger>
                        <DialogContent 
                            className="p-0 border-0 shadow-none rounded-lg"
                            aria-describedby={undefined}
                        >
                            <DialogTitle className="hidden">
                                Attachment
                            </DialogTitle>
                            <video src={props.attachment.url} className="w-full max-w-full max-h-96 h-full object-contain"/>
                        </DialogContent>
                    </>
                )
            }
        </Dialog>
    );
}
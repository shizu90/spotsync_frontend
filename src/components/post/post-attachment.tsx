import { PostService } from "@/services/posts";
import { PostAttachment as PostAttachmentModel } from "@/types/posts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Spinner } from "../ui/spinner";

interface PostAttachmentProps {
    postId: string;
    attachment: PostAttachmentModel;
    className?: string;
}

export function PostAttachment(props: PostAttachmentProps) {
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

    useEffect(() => {
        const service = new PostService();

        service.getAttachment(props.postId, props.attachment.id).then((res) => {
            setAttachmentUrl(URL.createObjectURL(new Blob([res.data])));
        });
    }, []);

    return attachmentUrl ? (
        <Dialog>
            {
                props.attachment.file_type.includes("image") ? (
                    <>
                        <DialogTrigger asChild className={
                            clsx(
                                `cursor-pointer ${props.className}`
                            )
                        }>
                            <img src={attachmentUrl} className={clsx(
                                "rounded-lg border border-foreground/10 shadow-sm object-cover",
                                props.className,
                            )}/>
                        </DialogTrigger>
                        <DialogContent className="p-0 border-0 shadow-none rounded-lg">
                            <img src={attachmentUrl} className="w-full max-w-full max-h-96 h-full object-contain"/>
                        </DialogContent>
                    </>
                ) : (
                    <>
                        <DialogTrigger asChild className={
                            clsx(
                                `cursor-pointer ${props.className}`
                            )
                        }>
                            <video src={attachmentUrl} className={clsx(
                                "rounded-lg border border-foreground/10 shadow-sm object-cover",
                                props.className,
                            )}/>
                        </DialogTrigger>
                        <DialogContent className="p-0 border-0 shadow-none rounded-lg">
                            <video src={attachmentUrl} className="w-full max-w-full max-h-96 h-full object-contain"/>
                        </DialogContent>
                    </>
                )
            }
        </Dialog>
    ) : (<Spinner/>);
}
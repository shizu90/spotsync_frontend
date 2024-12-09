import { SpotService } from "@/services/spots";
import { SpotAttachment as SpotAttachmentModel } from "@/types/spots";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

interface SpotAttachmentProps {
    spotId: string;
    attachment: SpotAttachmentModel;
    className?: string;
}

export function SpotAttachment(props: SpotAttachmentProps) {
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

    useEffect(() => {
        const service = new SpotService();

        service.getAttachment(
            props.spotId, 
            props.attachment.id
        ).then((res) => {
            setAttachmentUrl(URL.createObjectURL(new Blob([res.data])));
        });
    }, []);

    return attachmentUrl ? (
        <>
            {
                props.attachment.file_type.includes("image") ? (
                    <img
                        src={attachmentUrl}
                        className={clsx(
                            "rounded-lg border border-foreground/10 shadow-sm object-cover",
                            props.className,
                        )}
                    />
                ) : (
                    <video/>
                )
            }
        </>
    ) : (
        <Spinner/>
    );
}
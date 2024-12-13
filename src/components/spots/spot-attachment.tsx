import { SpotAttachment as SpotAttachmentModel } from "@/types/spots";
import clsx from "clsx";

interface SpotAttachmentProps {
    spotId: string;
    attachment: SpotAttachmentModel;
    className?: string;
}

export function SpotAttachment(props: SpotAttachmentProps) {
    return (
        <>
            {
                props.attachment.file_type.includes("image") ? (
                    <img
                        src={props.attachment.url}
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
    );
}
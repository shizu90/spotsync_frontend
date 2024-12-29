import { readableTime } from "@/lib/time";
import { NotificationService } from "@/services/notifications";
import { Notification as NotificationModel } from "@/types/notifications";
import clsx from "clsx";

interface NotificationProps {
    notification: NotificationModel;
    className?: string;
    onRead?: () => void;
}

export function Notification(props: NotificationProps) {
    const read = () => {
        const notificationService = new NotificationService();

        notificationService.read(props.notification.id);

        if (props.onRead) {
            props.onRead();
        }
    };

    return (
        <div className={clsx(
            "flex flex-col gap-2 w-full rounded-lg",
            props.notification.read_at ? "text-foreground/60" : "text-foreground",
            props.className
            
        )}
            onClick={read}
        >
            <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">{props.notification.title}</h3>
                <span className="text-xs">{readableTime(props.notification.created_at)}</span>
            </div>

            <div className="text-xs">
                {props.notification.content}
            </div>
        </div>
    );
}
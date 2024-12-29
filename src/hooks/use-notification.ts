import { NotificationContext } from "@/components/notifications/notification-context";
import { useContext } from "react";

export const useNotification = () => {
    const socket = useContext(NotificationContext);

    return socket;
};
export enum NotificationType {
    INFO = 'info',
    UPCOMING_SPOT_EVENT = 'upcoming_spot_event',
    SPOT_EVENT_STARTED = 'spot-event-started',
    NEW_FOLLOW = 'new-follow',
    NEW_LIKE = 'new-like',
    NEW_POST = 'new-post',
}

export enum NotificationStatus {
    UNREAD = 'unread',
    READ = 'read',
}

export type Notification = {
    id: string;
    title: string;
    content: string;
    type: NotificationType;
    status: NotificationStatus;
    payload: Record<string, any>;
    read_at?: string;
    created_at: string;
}
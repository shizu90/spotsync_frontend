import { Notification, NotificationStatus, NotificationType } from "@/types/notifications";
import { ApiResponse, Pagination } from "./api";
import { ApiService } from "./api-service";

interface ListNotificationsQuery {
    status?: NotificationStatus;
    type?: NotificationType;
    sort?: string;
    sort_direction?: string;
    page?: number;
    limit?: number;
    paginate?: boolean;

}

export class NotificationService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    }

    public async paginate(query: ListNotificationsQuery): Promise<ApiResponse<Pagination<Notification>>> {
        const response = await this.client.get('/notifications', {
            params: {
                paginate: true,
                ...query
            }
        });

        return response;
    }

    public async read(id: string): Promise<void> {
        await this.client.patch(`/notifications/${id}/read`);
    }

    public async readAll(): Promise<void> {
        await this.client.patch('notifications/read-all');
    }

    public async getTotalUnread(): Promise<ApiResponse<number>> {
        const response = await this.client.get('/notifications/total-unread');

        return response;
    }
}
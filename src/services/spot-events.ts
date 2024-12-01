import { SpotEvent } from "@/types/spot-events";
import { ApiResponse, Pagination } from "./api";
import { ApiService } from "./api-service";

interface ListSpotEventsQuery {
    spot_id?: string;
    group_id?: string;
    start_date?: string;
    end_date?: string;
    status?: string;
    sort?: string;
    sort_direction?: string;
    page?: number;
    limit?: number;
    paginate?: boolean;
}

export class SpotEventService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    }

    public async paginateSpotEvents(query?: ListSpotEventsQuery): Promise<ApiResponse<Pagination<SpotEvent>>> {
        const response = await this.client.get('/spot-events', {
            params: {
                paginate: true,
                ...query
            }
        });

        return response;
    }
}
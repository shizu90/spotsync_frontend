import { SpotEvent } from "@/types/spot-events";
import { ApiResponse, client, Pagination } from "./api";

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

export class SpotEventService {
    private bearerToken: string;
    
    public constructor(bearerToken: string) {
        this.bearerToken = bearerToken;
    }

    public async paginateSpotEvents(query?: ListSpotEventsQuery): Promise<ApiResponse<Pagination<SpotEvent>>> {
        const response = await client.get('/spot-events', {
            headers: {
                Authorization: `Bearer ${this.bearerToken}`
            },
            params: {
                paginate: true,
                ...query
            }
        });

        return response;
    }
}
import { Spot } from "@/types/spots";
import { ApiResponse, client, Pagination } from "./api";

type ListSpotsQuery = {
    name?: string;
    type?: string;
    creator_id?: string;
    visited_by_id?: string;
    sort?: string;
    sort_direction?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    paginate?: boolean;
};

export class SpotService {
    public constructor(
        bearerToken: string
    ) {
        client.defaults.headers['Authorization'] = `Bearer ${bearerToken}`;
    } 

    public async listSpots(query?: ListSpotsQuery): Promise<ApiResponse<Spot[]>> {
        return await client.get('/spots', {
            params: {
                paginate: false,
                ...query
            }
        });
    }

    public async paginateSpots(query?: ListSpotsQuery): Promise<ApiResponse<Pagination<Spot>>> {
        return await client.get('/spots', {
            params: {
                paginate: true,
                ...query
            }
        });
    }
}
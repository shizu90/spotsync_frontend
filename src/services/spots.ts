import { Spot } from "@/types/spots";
import { ApiResponse, Pagination } from "./api";
import { ApiService } from "./api-service";

type ListSpotsQuery = {
    name?: string;
    min_rating?: number;
    max_rating?: number;
    min_distance?: number;
    max_distance?: number;
    country?: string;
    state?: string;
    city?: string;
    type?: string[];
    creator_id?: string;
    visited_by_id?: string;
    sort?: string;
    sort_direction?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    paginate?: boolean;
};

export class SpotService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    } 

    public async listSpots(query?: ListSpotsQuery): Promise<ApiResponse<Spot[]>> {
        return await this.client.get('/spots', {
            params: {
                paginate: false,
                ...query
            }
        });
    }

    public async paginateSpots(query?: ListSpotsQuery): Promise<ApiResponse<Pagination<Spot>>> {
        return await this.client.get('/spots', {
            params: {
                paginate: true,
                ...query,
                types: query?.type ? query.type.join(',') : undefined
            }
        });
    }

    public async getAttachment(spotId: string, attachmentId: string) {
        return await this.client.get(`/spots/${spotId}/attachments/${attachmentId}`, {
            responseType: 'blob'
        });
    }
}
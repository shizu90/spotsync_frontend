import { Group } from "@/types/groups";
import { ApiResponse, Pagination } from "./api";
import { ApiService } from "./api-service";

interface ListGroupsQuery {
    name?: string;
    group_visibility?: string;
    sort?: string;
    sort_direction?: string;
    page?: number;
    paginate?: boolean;
    limit?: number;
}

export class GroupService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    }

    public async paginateGroups(query?: ListGroupsQuery): Promise<ApiResponse<Pagination<Group>>> {
        return await this.client.get('/groups', {
            params: {
                paginate: true,
                ...query,
            },
        });
    }
}
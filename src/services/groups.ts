import { Group } from "@/types/groups";
import { ApiResponse, client, Pagination } from "./api";

interface ListGroupsQuery {
    name?: string;
    group_visibility?: string;
    sort?: string;
    sort_direction?: string;
    page?: number;
    paginate?: boolean;
    limit?: number;
}

export class GroupService {
    private bearerToken: string;

    public constructor(bearerToken: string) {
        this.bearerToken = bearerToken;
    }

    public async paginateGroups(query?: ListGroupsQuery): Promise<ApiResponse<Pagination<Group>>> {
        return await client.get('/groups', {
            headers: {
                Authorization: `Bearer ${this.bearerToken}`,
            },
            params: {
                paginate: true,
                ...query,
            },
        });
    }
}
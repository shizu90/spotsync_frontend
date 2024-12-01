import { Post, PostVisibility } from "@/types/posts";
import { ApiResponse, Pagination } from "./api";
import { ApiService } from "./api-service";

interface ListPostsQuery {
    group_id?: string;
    user_id?: string;
    sort?: string;
    sort_direction?: 'asc' | 'desc';
    paginate?: boolean;
    page?: number;
    limit?: number;
}

interface CreatePostBody {
    title: string;
    content: string;
    visibility?: PostVisibility;
    parent_id?: string;
    group_id?: string;
}

export class PostService extends ApiService {
    public constructor() {
        super();
        this._setBearerTokenToHeaders();
    }

    public async listPosts(query?: ListPostsQuery): Promise<ApiResponse<Post[] | Pagination<Post>>> {
        return await this.client.get('/threads', {
            params: query ?? {}
        });
    }

    public async paginatePosts(query?: ListPostsQuery): Promise<ApiResponse<Pagination<Post>>> {
        return await this.client.get('/threads', {
            params: {
                paginate: true,
                ...query
            }
        });
    }

    public async getPost(id: string): Promise<ApiResponse<Post>> {
        return await this.client.get(`/posts/${id}`);
    }

    public async createPost(body: CreatePostBody): Promise<ApiResponse<Post>> {
        return await this.client.post('/posts', body);
    }

    
}
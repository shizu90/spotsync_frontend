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
    attachments?: File[];
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
        const formData = new FormData();

        console.log(body);
        formData.append('title', body.title);
        formData.append('content', body.content);
        if (body.parent_id) {
            formData.append('parent_id', body.parent_id);
        }

        if (body.group_id) {
            formData.append('group_id', body.group_id);
        }

        for (const attachment of body.attachments ?? []) {
            formData.append('attachments', attachment);
        }

        this.client.defaults.headers['Content-Type'] = 'multipart/form-data';

        return await this.client.post('/posts', formData);
    }

    public async getAttachment(postId: string, attachmentId: string) {
        return await this.client.get(
            `${this.apiUrl}/posts/${postId}/attachments/${attachmentId}`,
            {
                responseType: 'blob',
            }
        ); 
    }
}
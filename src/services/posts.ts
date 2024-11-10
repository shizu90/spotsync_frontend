import { ApiResponse, client, Pagination } from "./api";
import { User } from "./users";

export type PostAttachment = {
    id: string;
    file_type: string;
    file_path: string;
}

export enum PostVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FOLLOWERS = 'followers',
}

export type Post = {
    id: string;
    title: string;
    content: string;
    attachments: PostAttachment[];
    creator: User;
    visibility: PostVisibility;
    depth_level: number;
    thread_id: string;
    created_at: string;
    updated_at: string;
    parent_id: string;
    group: any;
    children_posts: Post[];
    total_childrens: number;
    total_likes: number;
    liked: boolean;
}

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

export class PostService {
    public constructor(
        bearerToken: string
    ) {
        client.defaults.headers['Authorization'] = `Bearer ${bearerToken}`;
    }

    public async listPosts(query?: ListPostsQuery): Promise<ApiResponse<Post[] | Pagination<Post>>> {
        return await client.get('/threads', {
            params: query ?? {}
        });
    }

    public async paginatePosts(query?: ListPostsQuery): Promise<ApiResponse<Pagination<Post>>> {
        return await client.get('/threads', {
            params: {
                paginate: true,
                ...query
            }
        });
    }

    public async getPost(id: string): Promise<ApiResponse<Post>> {
        return await client.get(`/posts/${id}`);
    }

    public async createPost(body: CreatePostBody): Promise<ApiResponse<Post>> {
        return await client.post('/posts', body);
    }
}
import { Group } from "./groups";
import { User } from "./users";

export type PostAttachment = {
    id: string;
    file_type: string;
    file_path: string;
    url: string;
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
    group?: Group;
    children_posts: Post[];
    total_childrens: number;
    total_likes: number;
    liked: boolean;
}
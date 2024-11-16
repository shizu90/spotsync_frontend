import { User } from "./users";

export enum GroupVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

export type GroupPermission = {
    id: string;
    name: string;
};

export type GroupRole = {
    id: string;
    name: string;
    is_immutable: boolean;
    hex_color: string;
    permissions: GroupPermission[];
    created_at: string;
    updated_at: string;
};

export type GroupMember = {
    id: string;
    user: User;
    role: GroupRole;
    joined_at: string;
    requested_at: string;
    is_creator: boolean;
};

export type Group = {
    id: string;
    name: string;
    about: string;
    group_picture: string;
    banner_picture: string;
    visibility_settings: {
        group: GroupVisibility;
        posts: GroupVisibility;
        spot_events: GroupVisibility;
    };
    created_at: string;
    updated_at: string;
    is_member: boolean;
    total_members: number;
    group_member: number;
};
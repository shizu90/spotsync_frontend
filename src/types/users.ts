export enum UserStatus {
    ACTIVE = 'act',
    INACTIVE = 'ina',
}

export enum UserVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FOLLOWERS = 'followers',
}

export enum PasswordRecoveryStatus {
    NEW = 'new',
    USED = 'use',
    EXPIRED = 'exp'
};

export type PasswordRecovery = {
    id: string;
    token: string;
    status: PasswordRecoveryStatus;
    created_at: string;
    expires_at: string;
};

export type UserAddress = {
    id: string;
    area: string;
    sub_area: string;
    country_code: string;
    locality: string;
    latitude: number;
    longitude: number;
    main: boolean;
    created_at: string;
    updated_at: string;
}

export type User = {
    id: string;
    status: UserStatus;
    created_at: string;
    updated_at: string;
    credentials: {
        name: string;
    };
    profile: {
        display_name: string;
        biograph: string;
        profile_picture: string;
        banner_picture: string;
        birth_date: string;
        theme_color: string;
        visibility: UserVisibility;
    };
    visibility_settings: {
        profile: UserVisibility;
        addresses: UserVisibility;
        visited_spots: UserVisibility;
        posts: UserVisibility;
        favorite_spots: UserVisibility;
        favorite_spot_events: UserVisibility;
        favorite_spot_folders: UserVisibility;
        spot_folders: UserVisibility;
    };
    main_address?: UserAddress;
    total_followers: number;
    total_following: number;
    following: boolean;
    requested_to_follow: boolean;
};
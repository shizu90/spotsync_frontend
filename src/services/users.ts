import { ApiResponse, client } from "./api";
import { SignInResponse } from "./auth";

export enum UserStatus {
    ACTIVE = 'act',
    INACTIVE = 'ina',
}

export enum UserVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FOLLOWERS = 'followers',
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
};

export enum PasswordRecoveryStatus {
    NEW = 'new',
    USED = 'use',
    EXPIRED = 'exp'
}

export type PasswordRecovery = {
    id: string;
    token: string;
    status: PasswordRecoveryStatus;
    created_at: string;
    expires_at: string;
};

interface CreateUserBody {
    name: string;
    email: string;
    password: string;
    birth_date: string;
    address?: {
        area?: string;
        sub_area?: string;
        country_code?: string;
        locality?: string;
        latitude?: number;
        longitude?: number;
    }
}

interface ResetPasswordBody {
    token: string;
    password: string;
}

interface ActivateUserBody {
    code: string;
    auto_login: boolean;
}

interface NewPasswordRecoveryBody {
    email: string;
}

export class UserService {
    public async createUser(body: CreateUserBody): Promise<ApiResponse<User>> {
        return await client.post('/users', body);
    }

    public async newPasswordRecovery(body: NewPasswordRecoveryBody): Promise<ApiResponse<PasswordRecovery>> {
        return await client.post('/password-recovery', body);
    }

    public async resetPassword(body: ResetPasswordBody): Promise<ApiResponse<void>> {
        body.token = atob(body.token);

        return await client.put('/password-recovery/change-password', body);
    }

    public async activateUser(userId: string, body: ActivateUserBody): Promise<ApiResponse<SignInResponse>> {
        body.code = atob(body.code);

        return await client.post(`/users/${atob(userId)}/activate`, body);
    }
}
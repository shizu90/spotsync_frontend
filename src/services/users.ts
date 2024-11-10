import { PasswordRecovery, User } from "@/types/users";
import { ApiResponse, client } from "./api";
import { SignInResponse } from "./auth";


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
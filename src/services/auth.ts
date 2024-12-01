import { User } from "@/types/users";
import { ApiResponse } from "./api";
import { ApiService } from "./api-service";


interface SignInBody {
    name?: string;
    email?: string;
    password: string;
}

export interface SignInResponse {
    id: string;
    user: User;
    bearer_token: string;
}

export class AuthService extends ApiService {
    public constructor() {
        super();
    }

    public async signIn(body: SignInBody): Promise<ApiResponse<SignInResponse>> {
        return await this.client.post('/auth/login', body);
    }
}
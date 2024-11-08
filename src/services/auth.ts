import { ApiResponse, client } from "./api";


interface SignInBody {
    name?: string;
    email?: string;
    password: string;
}

export interface SignInResponse {
    id: string;
    name: string;
    email: string;
    bearer_token: string;
}

export class AuthService {
    public async signIn(body: SignInBody): Promise<ApiResponse<SignInResponse>> {
        return await client.post('/auth/login', body);
    }
}
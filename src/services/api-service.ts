import { AuthObject, useAuthStore } from "@/hooks/auth-store";
import { AxiosInstance } from "axios";
import { ClientBuilder } from "./api";

export abstract class ApiService {
    protected client: AxiosInstance;
    protected apiUrl: string = `${import.meta.env.VITE_API_URL}/api/v1`;

    constructor() {
        this.client = new ClientBuilder().interceptError(403, () => {
            useAuthStore.getState().signOut();
        }).build();
    }

    protected _bearerTokenFromLocalStorage(): string | null {
        const auth: string | null = sessionStorage.getItem('auth') || localStorage.getItem('auth');

        if (!auth) {
            return null;
        }

        return (JSON.parse(auth) as AuthObject).bearerToken;
    }

    protected _setBearerTokenToHeaders(): void {
        this.client.defaults.headers['Authorization'] = `Bearer ${this._bearerTokenFromLocalStorage()}`;
    }
}
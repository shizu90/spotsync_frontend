import axios, { AxiosResponse } from "axios";

interface DefaultApiResponse<D> {
    data: D;
}

export type ApiResponse<D> = AxiosResponse<DefaultApiResponse<D>>

export const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
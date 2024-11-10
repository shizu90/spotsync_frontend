import axios, { AxiosInstance, AxiosResponse } from "axios";

interface DefaultApiResponse<D> {
    data: D;
}

export type ApiResponse<D> = AxiosResponse<DefaultApiResponse<D>>

export interface Pagination<T> {
    items: T[];
    total: number;
    current_page: number;
    last_page: number;
    limit: number;
    has_next_page: boolean;
}

function _createInstance(): AxiosInstance {
    return axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const client = _createInstance();
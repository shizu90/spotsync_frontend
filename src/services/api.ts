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

export class ClientBuilder {
    private instance: AxiosInstance;

    constructor() {
        this.instance = this._createInstance();
    }

    public _createInstance(): AxiosInstance {
        return axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public interceptError(errorCode: number, callback: () => void): ClientBuilder {
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === errorCode) {
                    callback();
                }
            } 
        );

        return this;
    }

    public build(): AxiosInstance {
        return this.instance;
    }
}
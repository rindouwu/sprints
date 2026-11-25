import { API_URL} from "../config/config.ts";

type ApiOptions = {
    method?: string;
    body?: BodyInit | unknown;
    auth?: boolean;
};

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const apiFetch = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const { method = 'GET', body, auth = false } = options;
    const headers = new Headers();

    if(body && !(body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    if(auth) {
        const token = getAccessToken()
        if(token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    })
    if(!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.message;

        let text = 'Ошибка запроса'
        if(typeof message === 'string') {
            text = message;
        } else if (Array.isArray(message)) {
            text = message.join(', ')
        }

        throw new ApiError(response.status, text)
    }
    if(response.status === 204) {
        return undefined as T;
    }

    return response.json();
}
import { apiFetch } from "../../../shared/api";
import type { User } from "../../../entities/user";

export type AuthResponse = {
    accessToken: string;
    user: User;
}

export const login = (body: { email: string, password: string }) => {
    return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body });
}
export const register = (body: { email: string, password: string, name: string }) => {
    return apiFetch<AuthResponse>('/auth/register', { method: 'POST', body });
}
export const getMe = () => {
    return apiFetch<{ user: User }>('/auth/me', { auth: true });
}

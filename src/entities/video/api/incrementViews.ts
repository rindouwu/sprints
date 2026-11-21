import { apiFetch } from "../../../shared/api";

export const incrementViews = (id: string) => {
    return apiFetch<{id: string, views: number}>(`/videos/${id}/views`, { method: "POST" })
}
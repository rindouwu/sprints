import { apiFetch } from "../../../shared/api";

export const incrementViews = (id: string) => {
    apiFetch<{id: string, views: number}>(`/videos/${id}/views`, { method: "POST" })
}
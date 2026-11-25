import { apiFetch } from "../../../shared/api";
import type { Video } from "../../../entities/video";

export const uploadPreview = (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiFetch<{ preview: string }>('/videos/preview', {
        method: 'POST',
        body: form,
        auth: true
    });
}

export const uploadVideoFile = (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiFetch<{ video: string }>('/videos/video', {
        method: 'POST',
        body: form,
        auth: true
    });
}

export const createVideo = (body: {
    title: string;
    description?: string;
    preview: string;
    video: string;
}) => apiFetch<Video>('/videos', { method: 'POST', body, auth: true });
import { apiFetch } from "../../../shared/api";
import type { Video } from "../model/types.ts";

export const getVideos = () => apiFetch<Video[]>("/videos");
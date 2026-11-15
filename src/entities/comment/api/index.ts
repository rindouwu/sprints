import { client } from "@/shared/api/client";
import type { Comment } from "../model/types";

export const fetchBookComments = async (bookId: string | number): Promise<Comment[]> => {
    const response = await client.get<Comment[]>(`/api/books/${bookId}/comments`);
    return response.data;
}

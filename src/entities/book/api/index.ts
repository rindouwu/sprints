import { client } from "@/shared/api/client.ts"
import type { Book } from "../model/types.ts"

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await client.get<Book[]>("/api/books")
    return response.data
}
export const fetchBookById = async (id: string): Promise<Book | null> => {
    const response = await client.get(`/api/books/${id}`)
    return response.data
}
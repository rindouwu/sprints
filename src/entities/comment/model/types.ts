export type CommentCategory = 'alternative' | 'edit' | 'lore' | 'question'

export interface Comment {
    id: number
    book_id: number
    parent_id: number | null
    category: CommentCategory
    author: string
    text: string
    created_at: string
    children: Comment[]
}
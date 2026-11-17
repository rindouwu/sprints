import { defineStore } from "pinia";
import { ref } from "vue";
import type { Comment } from "./types";
import { fetchBookComments } from "../api/index";


export const useCommentsStore = defineStore('comments', () => {
    const comments = ref<Comment[]>([]);
    const loading = ref(true);
    const error = ref(false);
    const currentBookId = ref<string | null>(null)

    const loadComments = async (bookId: string) => {
        if(currentBookId.value === bookId) return
        loading.value = true
        error.value = false

        try {
            comments.value = await fetchBookComments(bookId)
            currentBookId.value = bookId
        } catch (e) {
            error.value = true
        } finally {
            loading.value = false
        }
    }

    return {
        comments,
        loading,
        error,
        loadComments,
    }
})
import {defineStore} from "pinia";
import { computed, ref } from "vue";
import type { Book } from "./types.ts"
import { fetchBooks } from "../api/index.ts"

export const useBookStore = defineStore('books', () => {
    const allBooks = ref<Book[]>([])
    const loading = ref(false)
    const error = ref(false)
    const displayCount = ref(8)

    const visibleBooks = computed(() => {
        return allBooks.value.slice(0, displayCount.value)
    })
    const hasMore = computed(() => {
        return displayCount.value < allBooks.value.length
    })
    const loadMore = () => {
        displayCount.value += 8
    }

    const loadBooks = async () => {
        loading.value = true
        error.value = false

        try {
            allBooks.value = await fetchBooks()
        } catch {
            error.value = true
        } finally {
            loading.value = false
        }
    }
    return {
        allBooks,
        loading,
        error,
        visibleBooks,
        hasMore,
        loadMore,
        loadBooks,
    }
})
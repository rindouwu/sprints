<script setup lang="ts">
import type { Book } from "@/entities/book/model/types.ts"
import { fetchBooks } from "@/entities/book/api/index.ts"
import BookCard from "@/entities/book/ui/BookCard.vue"

import {computed, onMounted, ref} from "vue";

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
  } catch (e) {
    console.log(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadBooks)
</script>

<template>
  <section class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Список книг</h1>
    <div v-if="loading" class="text-gray-400">Загрузка</div>
    <div v-if="error" class="text-red-400">Ошибка</div>
    <div class="grid gap-4">
      <BookCard
          v-for="book in visibleBooks"
          :key="book.id"
          :book="book"
      >
      </BookCard>
    </div>
    <div>
      <button
        v-if="hasMore"
        @click="loadMore"
      >
        Загрузить...
      </button>
      <p v-if="!hasMore && allBooks.length > 0" class="text-sm mt-4">Больше книг нет</p>
    </div>
  </section>
</template>

<style scoped>

</style>
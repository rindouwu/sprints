<script setup lang="ts">
import type { Book } from "@/entities/book/model/types.ts"
import { fetchBooks } from "@/entities/book/api/index.ts"
import {onMounted, ref} from "vue";

const allBooks = ref<Book[]>([])
const loading = ref(false)
const error = ref(false)
// const displayCount = ref(8)

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
  console.log(allBooks)
}

onMounted(loadBooks)
</script>

<template>
  <section class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Список книг</h1>
    <div v-if="loading" class="text-gray-400">Загрузка</div>
    <div v-if="error" class="text-red-400">Ошибка</div>
    <div class="grid gap-4">
      <article
          class="book"
          v-for="book in allBooks"
          :key="book.id"
      >
        <h2 class="text-2xl font-semibold">{{ book.title }}</h2>
        <p>{{ book.author }}</p>
        <p>{{ book.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>

</style>
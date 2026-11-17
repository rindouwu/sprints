<script setup lang="ts">
import BookCard from "@/entities/book/ui/BookCard.vue"
import { useBookStore } from "@/entities/book/model/store.ts";
import { onMounted } from "vue";

const booksStore = useBookStore()
onMounted(booksStore.loadBooks)
</script>

<template>
  <section class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Список книг</h1>
    <div v-if="booksStore.loading" class="text-gray-400">Загрузка</div>
    <div v-if="booksStore.error" class="text-red-400">Ошибка</div>
    <div class="grid gap-4">
      <BookCard
          v-for="book in booksStore.visibleBooks"
          :key="book.id"
          :book="book"
      >
      </BookCard>
    </div>
    <div>
      <button
        v-if="booksStore.hasMore"
        @click="booksStore.loadMore"
      >
        Загрузить...
      </button>
      <p v-if="!booksStore.hasMore && booksStore.allBooks.length > 0" class="text-sm mt-4">Больше книг нет</p>
    </div>
  </section>
</template>

<style scoped>

</style>
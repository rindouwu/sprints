<script setup lang="ts">
import BookCard from "@/entities/book/ui/BookCard.vue"
import { useBookStore } from "@/entities/book/model/store.ts";
import { onMounted } from "vue";

const booksStore = useBookStore()
onMounted(booksStore.loadBooks)
</script>

<template>
  <section class="max-w-4xl mx-auto">
    <header class="pb-8 flex items-center flex-row justify-between">
      <h2 class="text-lg text-amber-200 font-medium">Персональная библиотека</h2>
      <p class="text-md font-light">Всего {{ booksStore.allBooks.length }} книг</p>
    </header>
    <h1 class="text-2xl font-bold mb-4 font-horror">Список книг</h1>
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
        class="cursor-pointer mt-5 rounded-xl border border-zinc-700 bg-zinc-900 px-7 py-3 text-sm font-medium uppercase tracking-wider text-zinc-200 transition-all duration-200 hover:border-amber-200/60 hover:bg-zinc-800 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        :disabled="booksStore.loading"
        v-if="booksStore.hasMore"
        @click="booksStore.loadMore"
      >
        {{ booksStore.loading ? 'Загрузка...' : 'Показать еще'}}
      </button>
      <p v-if="!booksStore.hasMore && booksStore.allBooks.length > 0" class="bg-zinc-900 text-center px-7 py-3 text-md mt-4">Больше книг нет</p>
    </div>
  </section>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type { Book } from "../model/types"

defineProps<{book: Book}>()
</script>

<template>
  <router-link
      class="border cursor-pointer border-gray-200 rounded-lg p-5 hover:bg-gray-500 transition-colors"
      :to="`/books/${book.id}`"
  >
    <article>
      <h2 class="text-xl font-semibold mb-1">{{ book.title }}</h2>
      <p class="text-sm text-gray-400 mb-3">{{ book.author }}</p>
      <p class="text-sm text-zinc-300 mb-4">{{ book.description }}</p>

      <router-link
          class="px-5 py-2 radius-lg bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors duration-200"
          :to="`/books/${book.id}`
      ">Читать</router-link>
    </article>
  </router-link>
</template>

<style scoped>

</style>
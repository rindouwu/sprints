<script setup lang="ts">
import type { Book } from "../model/types"

defineProps<{book: Book}>()
</script>

<template>
  <article class="book">
    <h2 class="text-2xl font-semibold">{{ book.title }}</h2>
    <p>{{ book.author }}</p>
    <p>{{ book.description }}</p>

    <router-link :to="`/books/${book.id}`">Читать</router-link>
  </article>
</template>

<style scoped>

</style>
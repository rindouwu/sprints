<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import type { Book } from "@/entities/book/model/types";
import { useRoute } from "vue-router";
import { fetchBookById } from "@/entities/book/api";
import CommentNode from "@/entities/comment/ui/CommentNode.vue";
import { useCommentsStore } from "@/entities/comment/model/store";
import SkeletonBook from "./SkeletonBook.vue";

const route = useRoute();
const book = ref<Book | null>(null);
const loading = ref(true);
const error = ref(false);

const commentsStore = useCommentsStore()

const groupedComments = computed(() => {
  const cats = [
    { key: 'alternative', label: 'Альтернативы' },
    { key: 'edit', label: 'Правки' },
    { key: 'lore', label: 'Лор' },
    { key: 'question', label: 'Вопросы' },
  ]
  return cats.map(cat => ({
    ...cat,
    items: commentsStore.comments.filter(c => c.category === cat.key)
  })).filter(group => group.items.length > 0)
})

const loadData = async () => {
  loading.value = true;
  error.value = false;

  try {
    const id = route.params.id as string
    book.value = await fetchBookById(id);
    await commentsStore.loadComments(id)
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(loadData)
</script>

<template>
<section>
  <div v-if="loading" class="mx-auto max-w-3xl animate-pulse">
    <SkeletonBook />
  </div>
  <div
      v-else-if="error"
      class="border border-red-500/20 bg-red-500/5 p-6"
  >
    <p class="text-sm text-red-400">
      Не удалось загрузить книгу.
    </p>
  </div>

  <template v-else-if="book">
    <header class="mb-8">
      <h1 class="text-3xl font-semibold text-zinc-100 sm:text-5xl">{{ book.title }}</h1>
      <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-md text-zinc-300">
        <p class="">Автор: {{ book.author }}</p>
        <div class="text-md text-gray-400">
          Добавлена: {{ new Date(book.created_at).toLocaleDateString("ru-RU") }}
        </div>
      </div>
      <p class="mt-8 max-w-2xl text-md text-zinc-200">{{ book.description }}</p>
    </header>

    <article>
      <p>{{ book.full_text }}</p>
    </article>

    <section>
      <h2 class="text-2xl mt-10 pb-3">Обсуждения</h2>

      <div v-if="commentsStore.loading">Загрузка комментариев...</div>
      <div v-else-if="commentsStore.error">Ошибка загрузки комментариев</div>
      <div v-else-if="commentsStore.comments.length === 0">
        Нет комментариев
      </div>
      <div v-else class="space-y-8">
        <div v-for="group in groupedComments" :key="group.key">
          <h3 class="text-lg font-semibold">{{ group.label}}</h3>
          <CommentNode
              v-for="comment in group.items"
              :key="comment.id"
              :comment="comment"
          />
        </div>
      </div>
    </section>
  </template>
</section>
</template>

<style scoped>

</style>
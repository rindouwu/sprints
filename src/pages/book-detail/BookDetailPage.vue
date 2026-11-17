<script setup lang="ts">

import { onMounted, ref } from "vue";
import type { Book } from "@/entities/book/model/types";
import { useRoute } from "vue-router";
import { fetchBookById } from "@/entities/book/api";
import CommentNode from "@/entities/comment/ui/CommentNode.vue";
import { useCommentsStore } from "@/entities/comment/model/store";

const route = useRoute();
const book = ref<Book | null>(null);
const loading = ref(true);
const error = ref(false);

const commentsStore = useCommentsStore()

const loadData = async () => {
  loading.value = true;
  error.value = false;

  try {
    const id = route.params.id as string
    book.value = await fetchBookById(id);
    await commentsStore.loadComments(id)
  } catch (e) {
    console.log(e)
    error.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(loadData)
</script>

<template>
<section>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error" class="text-red-400 text-sm">Не удалось загрузить книгу</div>
  <div v-else-if="book">
    <header class="mb-8">
      <h1 class="text-3xl">{{ book.title }}</h1>
      <p class="">Автор: {{ book.author }}</p>
      <div class="text-sm text-gray-500">
        Добавлена: {{ new Date(book.created_at).toLocaleDateString("ru-RU") }}
      </div>
      <p>{{ book.description }}</p>
    </header>

    <article>
      <p>{{ book.full_text }}</p>
    </article>

    <section>
      <h2 class="text-2xl">Обсуждения</h2>

      <div v-if="commentsStore.loading">Загрузка комментариев...</div>
      <div v-else-if="commentsStore.error">Ошибка загрузки комментариев</div>
      <div v-else-if="commentsStore.comments.length === 0">
        Нет комментариев
      </div>
      <div v-else class="space-y-8">
        <CommentNode
            v-for="comment in commentsStore.comments"
            :key="comment.id"
            :comment="comment"
        />
      </div>
    </section>
  </div>
</section>
</template>

<style scoped>

</style>
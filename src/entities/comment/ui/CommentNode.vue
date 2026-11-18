<script setup lang="ts">
import CommentNode from "./CommentNode.vue"
import { ref } from "vue";
import type { Comment } from "../model/types";

const props = defineProps<{
  comment: Comment,
  depth?: number,
}>()

const isCollapsed = ref(false)
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const categoryLabels: Record<string, string> = {
  alternative: "Альтернатива",
  edit: "Правка",
  lore: "Лор",
  question: "Вопрос"
}
const categoryColors: Record<string, string> = {
  alternative: "bg-blue-100 text-blue-800",
  edit: "bg-yellow-100 text-yellow-800",
  lore: "bg-green-100 text-green-800",
  question: "bg-purple-100 text-purple-800"
}

const getCategoryLabel = (cat: string) => categoryLabels[cat]
const getCategoryColor = (cat: string) => categoryColors[cat]

</script>

<template>
  <div class="relative pl-6 mt-4">
    <div
        class="absolute left-0 top-0 bottom-0 w-4 cursor-pointer group"
        @click="toggleCollapse"
    >
      <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 group-hover:bg-gray-400 transition-colors"></div>
      <div class="absolute left-0 bottom-0 w-4 h-0.5 bg-gray-200 group-hover:bg-gray-400 transition-colors"></div>
    </div>
    <article class="bg-zinc-900 p-4 rounded-lg shadow-sm relative hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-2">
        <div class="flex flex-wrap gap-2 items-center">
          <p>{{ comment.author }}</p>
          <p
            class="px-2 py-0.5 text-xs font-medium rounded-full border"
            :class="getCategoryColor(comment.category)"
          >
            {{ getCategoryLabel(comment.category) }}
          </p>
        </div>
        <p class="text-xs md:text-base">{{ new Date(comment.created_at).toLocaleDateString("ru-RU") }}</p>
      </div>
      <p class="text-base md:text-lg text-zinc-200">{{ comment.text }}</p>
    </article>

    <div
        v-if="!isCollapsed"
        class="mt-2"
    >
      <CommentNode
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          :depth="(depth || 0) + 1"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
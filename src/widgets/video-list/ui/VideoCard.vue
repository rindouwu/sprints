<script setup lang="ts">
import { API_URL } from "../../../shared/config/config.ts";
import type { Video } from "../../../entities/video";

defineProps<{
  video: Video;
}>();

const emit = defineEmits<{
  click: [video: Video];
}>();
</script>

<template>
  <button @click="emit('click', video)">
    <img
      :src="`${API_URL}/uploads/${video.preview}`"
      :alt="video.title"
    />
  </button>
  <div class="p-2">
    <h3 class="font-medium">{{ video.title }}</h3>
    <p class="text-sm text-gray-500">{{ video.author }}</p>
    <p class="text-sm text-gray-500">{{ video.views }}</p>
  </div>
</template>

<style scoped>

</style>
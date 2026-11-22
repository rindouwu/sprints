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
  <button
      class="flex flex-col text-left rounded-lg overflow-hidden hover:opacity-90 transition h-full"
      @click="emit('click', video)
  ">
    <div class="w-full aspect-video bg-gray-100">
      <img
        :src="`${API_URL}/uploads/${video.preview}`"
        :alt="video.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-2 flex flex-col gap-1">
      <h3 class="font-medium">{{ video.title }}</h3>
      <p class="text-sm text-gray-500">{{ video.author }}</p>
      <p class="text-sm text-gray-500">{{ video.views }}</p>
    </div>
  </button>
</template>

<style scoped>

</style>
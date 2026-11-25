<script setup lang="ts">
import VideoCard from "./VideoCard.vue";
import type { Video } from "../../../entities/video";

defineProps<{
  videos: Video[]
}>();

const emit = defineEmits<{
  select: [video: Video];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <VideoCard
      v-for="video in videos"
      :key="video.id"
      :video="video"
      @click="emit('select', video)"
    />
  </div>
</template>
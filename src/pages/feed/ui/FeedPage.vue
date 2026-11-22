<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVideos, type Video } from "../../../entities/video";
import {VideoList, VideoListSkeleton} from "../../../widgets/video-list";
import { VideoModal } from "../../../widgets/video-modal";

const videos = ref<Video[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selected = ref<Video | null>(null)

onMounted(async () => {
  try {
    videos.value = await getVideos()
  } catch {
    error.value = "Не удалось загрузить видео"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <VideoListSkeleton
      v-if="loading"
    />
    <p v-else-if="error" class="text-red-500 text-lg">ошибка...</p>
    <VideoList
        v-else
        :videos="videos"
        @select="selected = $event"
    />

    <VideoModal
        v-if="selected"
        :video="selected"
        @close="selected = null"
    />
  </div>
</template>

<style scoped>

</style>
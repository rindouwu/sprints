<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVideos, type Video } from "../../../entities/video";
import { VideoList } from "../../../widgets/video-list";

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
    <p v-if="loading">загрузка...</p>
    <p v-else-if="error">ошибка...</p>
    <VideoList
        v-else
        :videos="videos"
        @select="selected = $event"
    />

    <p v-if="selected">
      Выбрано: {{ selected.title }}
    </p>
  </div>
</template>

<style scoped>

</style>
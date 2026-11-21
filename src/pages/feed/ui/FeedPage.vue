<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVideos, type Video } from "../../../entities/video";
import { VideoList } from "../../../widgets/video-list";
import { useRouter } from 'vue-router'

const videos = ref<Video[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const router = useRouter()

onMounted(async () => {
  try {
    videos.value = await getVideos()
  } catch {
    error.value = "Не удалось загрузить видео"
  } finally {
    loading.value = false
  }
})

const openVideo = (video: Video) => {
  router.push({ name: 'video', params: { id: video.id } })
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <p v-if="loading">загрузка...</p>
    <p v-else-if="error">ошибка...</p>
    <VideoList
        v-else
        :videos="videos"
        @select="openVideo"
    />
  </div>
</template>

<style scoped>

</style>
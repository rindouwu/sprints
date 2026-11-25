<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getVideos, type Video } from "../../../entities/video";
import {VideoList, VideoListSkeleton} from "../../../widgets/video-list";
import { VideoModal } from "../../../widgets/video-modal";
import {useRoute} from "vue-router";

const route = useRoute()
const videos = ref<Video[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selected = ref<Video | null>(null)

const loadVideos = async () => {
  loading.value = true
  try {
    videos.value = await getVideos()

    const videoId = route.query.video
    if(videoId) {
      const found = videos.value.find((v) => v.id === videoId)
      if(found) {
        selected.value = found
      }
    }
  } catch {
    error.value = "Не удалось загрузить видео"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadVideos()
  window.addEventListener('video-uploaded', loadVideos)
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-3xl pb-10 font-bold">Видео</h1>
    <VideoListSkeleton
      v-if="loading"
    />
    <p v-else-if="error" class="text-red-500 text-lg">Ошибка: {{ error }}</p>
    <p v-else-if="videos.length === 0" class="text-gray-200">Нету видео</p>
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
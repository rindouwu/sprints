<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getVideos, type Video} from "../entities/video";
import {VideoList} from "../widgets/video-list";

const videos = ref<Video[]>([]);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    videos.value = await getVideos();
    console.log(videos);
  } catch(e) {
    console.log(e);
    error.value = true;
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <div v-if="loading">загрузка...</div>
    <div v-else-if="error">ошибка</div>
    <VideoList v-else :videos="videos" />
  </div>
</template>

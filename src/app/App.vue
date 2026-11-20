<script setup lang="ts">
import { onMounted } from "vue";
import { getVideos } from "../entities/video";

onMounted(async () => {
  try {
    const videos = await getVideos();
    console.log(videos);
  } catch(error) {
    console.log(error);
  }
})
</script>

<template>

</template>

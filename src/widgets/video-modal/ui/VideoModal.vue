<script setup lang="ts">
import {incrementViews, type Video} from "../../../entities/video";
import {onMounted, ref} from "vue";
import {API_URL} from "../../../shared/config/config.ts";

const props = defineProps<{video: Video}>()
const emit = defineEmits<{close: []}>()

const loading = ref(true)
const views = ref(props.video.views)

onMounted(async () => {
  try {
    const data = await incrementViews(props.video.id)
    views.value = data.views
  } catch {

  }
})
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    @click="emit('close')"
  >
    <div
      class="relative bg-white rounded-lg max-w-6xl w-full overflow-hidden"
      @click.stop
    >
        <div class="bg-black aspect-video">
          <div v-if="loading">загрузка...</div>
          <video
            :src="`${API_URL}/uploads/${video.video}`"
            controls
            autoplay
            class="w-full h-full"
            @loadeddata="loading = false"
          />
        </div>

        <div class="p-4">
          <h2 class="text-lg font-medium">{{ video.title }}</h2>
          <p class="text-sm text-gray-500">
            {{ video.views }}
            {{ video.author}}
          </p>
          <p class="video.description">
            {{ video.description }}
          </p>
        </div>

        <button
          class="absolute top-3 right-3 text-xl py-2 px-4 bg-blue-400 rounded-lg text-white"
          @click="emit('close')"
        >
          Закрыть
        </button>
    </div>
  </div>
</template>

<style scoped>

</style>
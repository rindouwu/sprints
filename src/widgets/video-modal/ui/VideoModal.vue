<script setup lang="ts">
import {incrementViews, type Video} from "../../../entities/video";
import {onMounted, ref} from "vue";
import {API_URL} from "../../../shared/config/config.ts";

const props = defineProps<{video: Video}>()
const emit = defineEmits<{close: []}>()

const loading = ref(true)
const views = ref(props.video.views)

const isCopied = ref(false)
const copyLink = async () => {
  try {
    const url = `${window.location.origin}/?video=${props.video.id}`
    await navigator.clipboard.writeText(url)
    isCopied.value = true

    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (e) {
    console.error('Не удалось скопировать' ,e)
  }
}

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

        <div class="p-4 bg-zinc-900">
          <h2 class="text-lg font-semibold">{{ video.title }}</h2>
          <p class="text-sm text-amber-200">
            {{ video.author }}
            <span class="pl-4 text-gray-200">{{ video.views }} просмотров</span>
          </p>
          <p class="video.description pt-2">
            {{ video.description }}
          </p>

          <div class="pt-4 flex items-center gap-2">
            <button
              @click="copyLink"
              class="text-sm px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center gap-2"
            >
              <p v-if="isCopied" class="text-green-400">Скопировано!</p>
              <p v-else>Поделиться</p>
            </button>
          </div>
        </div>

        <button
          class="absolute top-3 right-3 text-xl py-2 px-4 bg-amber-200 rounded-lg text-zinc-950 cursor-pointer"
          @click="emit('close')"
        >
          Закрыть
        </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ApiError } from "../../../shared/api";
import {
  uploadPreview,
  uploadVideoFile,
  createVideo,
  uploadVideoSchema
} from "../../../features/upload-video";
import {computed, ref} from "vue";

const emit = defineEmits<{
  close: [];
  uploaded: [];
}>();

const title = ref('')
const description = ref('')
const previewFile = ref<File | null>(null)
const videoFile = ref<File | null>(null)

const errors = ref<Record<string, string>>({})
const loading = ref<boolean>(false)
const serverError = ref<string | null>(null)

const validate = () => {
  const result = uploadVideoSchema.safeParse({
    title: title.value,
    description: description.value,
    preview: previewFile.value,
    video: videoFile.value,
  })

  if (result.success) {
    errors.value = {}
    return true
  }

  const newErrors: Record<string, string> = {}
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as string
    if(!newErrors[field]) {
      newErrors[field] = issue.message
    }
  })

  errors.value = newErrors
  return false
}

const isFormValid = computed(() => {
  return (
      title.value.trim() !== '' &&
      previewFile.value !== null &&
      videoFile.value !== null &&
      Object.keys(errors.value).length === 0
  )
})

const handlePreviewChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  previewFile.value = target.files?.[0] || null
  validate()
}
const handleVideoChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  videoFile.value = target.files?.[0] || null
  validate()
}

const handleSubmit = async () => {
  if(!validate()) return

  loading.value = true
  serverError.value = null

  try {
    const previewRes = await uploadPreview(previewFile.value!)
    const videoRes = await uploadVideoFile(videoFile.value!)

    await createVideo({
      title: title.value,
      description: description.value,
      preview: previewRes.preview,
      video: videoRes.video,
    })

    emit('uploaded')
    emit('close')
  } catch (e) {
    if(e instanceof ApiError) {
      serverError.value = e.message
    } else {
      serverError.value = 'Не получилось загрузить видео'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" @click="emit('close')">
    <div class="bg-zinc-900 rounded-lg w-full p-6 shadow-2xl" @click.stop>
      <header class="flex justify-between items-center p-6">
        <h2 class="text-xl font-semibold text-zinc-100">
          Загрузка видео
        </h2>
        <button @click="emit('close')" class="text-zinc-400 hover:text-zinc-100 text-2xl">
          &times;
        </button>
      </header>

      <form class="p-6 space-y-4" @submit.prevent="handleSubmit()">
        <section>
          <label class="text-sm font-medium pb-1 text-zinc-300">Название</label>
          <input
            v-model="title"
            @input="validate"
            type="text"
            class="w-full bg-zinc-950 rounded px-3 py-2 text-zinc-100 transition-colors focus:outline-none focus:border-blue-500"
          >
          <p v-if="errors.title" class="text-red-400 text-xs pt-1">{{ errors.title }}</p>
        </section>
        <section>
          <label class="text-sm font-medium pb-1 text-zinc-300">Описание</label>
          <textarea
              v-model="description"
              rows="3"
              class="w-full resize-none bg-zinc-950 rounded px-3 py-2 text-zinc-100 transition-colors focus:outline-none focus:border-blue-500"
          />
        </section>
        <section>
          <label class="text-sm font-medium pb-1 text-zinc-300">Превью (до 2 мб)</label>
          <input
              @change="handlePreviewChange"
              type="file"
              accept="image/png, image/jpeg, image/jpeg"
              :class="errors.preview ? 'outline outline-red-500' : ''"
              class="w-full cursor-pointer bg-zinc-950 rounded px-3 py-2 text-zinc-100 transition-colors focus:outline-none focus:border-blue-500"
          >
          <p v-if="errors.preview" class="text-red-400 text-xs pt-1">{{ errors.title }}</p>
        </section>
        <section>
          <label class="text-sm font-medium pb-1 text-zinc-300">Видео (до 15 мб)</label>
          <input
              @change="handleVideoChange"
              type="file"
              accept="video/mp4"
              :class="errors.video ? 'outline outline-red-500' : ''"
              class="w-full cursor-pointer bg-zinc-950 rounded px-3 py-2 text-zinc-100 transition-colors focus:outline-none focus:border-blue-500"
          >
          <p v-if="errors.video" class="text-red-400 text-xs pt-1">{{ errors.title }}</p>
        </section>

        <p v-if="serverError" class="text-red-400 text-sm bg-red-900 p-2 rounded">
          {{ serverError }}
        </p>

        <button
            type="submit"
            :disabled="!isFormValid || loading"
            class="cursor-pointer w-full bg-blue-600 hover:bg-blue-600 transition-colors text-white rounded py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Загрузка...' : 'Опубликовать' }}
        </button>
      </form>
    </div>
  </div>
</template>
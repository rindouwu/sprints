<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Sidebar } from "../../widgets/sidebar";
import {useSessionStore} from "../../entities/session";
import {ref} from "vue";
import {UploadModal} from "../../widgets/upload-modal";

const session = useSessionStore();
const isUploadOpen = ref<boolean>(false);

const openUpload = () => {
  if(session.isAuthenticated) {
    isUploadOpen.value = true;
  }
}
const onUploaded = () => {
  window.dispatchEvent(new Event("video-uploaded"));
  isUploadOpen.value = false;
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-zinc-950 text-zinc-200">
    <Sidebar
      @open-upload="openUpload"
    />

    <main class="p-8">
      <RouterView />
    </main>
  </div>
  <UploadModal
    v-if="isUploadOpen"
    @close="isUploadOpen = false"
    @uploaded="onUploaded"
  />
</template>
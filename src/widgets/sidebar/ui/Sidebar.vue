<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router';
import { useSessionStore } from "../../../entities/session";
import { useAuth } from "../../../features/auth";

const router = useRouter();
const session = useSessionStore();
const { signOut } = useAuth();

const handleLogout = () => {
  signOut();
  router.push("/login");
}
const openUpload = () => {
  alert('заглущка');
}
</script>

<template>
  <aside class="border-r border-zinc-800 border-b p-4 flex items-center flex-row gap-5 md:flex md:flex-col md:border-r md:border-b-0">
    <div class="text-4xl font-semibold text-zinc-100">
      Rin<span class="text-blue-400">Studio.</span>
    </div>
    <nav class="px-4 py-2">
      <RouterLink
          to="/"
          class="rounded-sm px-4 py-2 text-md text-zinc-200 transition-colors hover:bg-gray-100 hover:text-zinc-800"
      >
        Видео
      </RouterLink>
    </nav>

    <div class="mt-auto flex flex-col gap-2 w-full pt-4">
      <template v-if="session.isAuthenticated">
        <button
          @click="openUpload"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-sm px-4 py-2 text-sm font-medium transition-colors"
        >
          Загрузить видео
        </button>
        <button
            @click="handleLogout"
            class="w-full bg-transparent border border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-sm px-4 py-2 text-sm transition-colors"
        >
          Выйти
        </button>
      </template>
      <template v-else>
        <RouterLink
            to="/login"
            class="w-full text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-sm px-4 py-2 text-sm font-medium transition-colors"
        >
          Войти
        </RouterLink>
      </template>
    </div>
  </aside>
</template>

<style scoped>

</style>
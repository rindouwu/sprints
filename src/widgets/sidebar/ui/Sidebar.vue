<script setup lang="ts">
import { RouterLink } from 'vue-router';
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
  </aside>
</template>

<style scoped>

</style>
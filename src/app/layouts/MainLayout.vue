<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Sidebar } from "../../widgets/sidebar";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-zinc-950 text-zinc-200">
    <Sidebar />
    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
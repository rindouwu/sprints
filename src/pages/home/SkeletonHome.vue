<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
        v-for="item in 6"
        :key="item"
        class="h-45 animate-pulse border border-zinc-800 bg-zinc-950 p-5 rounded-lg"
    >
      <div class="mb-3 h-6 w-48 rounded bg-zinc-800"></div>
      <div class="mb-6 h-4 w-24 rounded bg-zinc-800"></div>

      <div class="mb-2 h-3 w-full rounded bg-zinc-800"></div>
      <div class="mb-2 h-3 w-40 rounded bg-zinc-800"></div>

      <div class="h-8 w-28 rounded bg-zinc-800"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
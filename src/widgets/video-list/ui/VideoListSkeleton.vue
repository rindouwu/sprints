<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="n in 18"
      :key="n"
      class="rounded-lg overflow-hidden animate-pulse"
    >
      <div class="w-full aspect-video bg-gray-200" />
      <div class="p-2 space-y-2">
        <div class="h-4 bg-gray-200 rounded" />
        <div class="h-3 bg-gray-200 rounded" />
        <div class="h-3 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
</template>
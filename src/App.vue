<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-zinc-950 text-zinc-200">
    <aside class="border-r border-zinc-800 border-b p-4 flex items-center flex-row gap-5 md:flex md:flex-col md:border-r md:border-b-0">
      <div class=" text-4xl font-semibold text-zinc-100">Rin<span class="text-blue-400">book.</span></div>
      <nav class="px-4 py-2">
        <router-link
            to="/"
            class="group rounded-sm px-4 py-2 text-md text-zinc-200 transition-colors hover:bg-gray-100 hover:text-zinc-800"
        >
          Книги
        </router-link>
      </nav>
    </aside>

    <main class="p-8">
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">

import { onMounted, onUnmounted, ref } from "vue";

const x = ref(0);
const y = ref(0);
const mouseX = ref(0);
const mouseY = ref(0);

let animationId: number

const updateMouse = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const moveCat = () => {
  const dx = mouseX.value - (x.value + 16)
  const dy = mouseY.value - (y.value + 16)

  if(Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    x.value += dx * 0.05
    y.value += dy * 0.05
  }
  animationId = requestAnimationFrame(moveCat);
}

onMounted(() => {
  x.value = window.innerWidth / 2 - 16
  y.value = window.innerHeight / 2 - 16
  mouseX.value = window.innerWidth / 2
  mouseY.value = window.innerHeight / 2

  window.addEventListener("mousemove", updateMouse);
  animationId = requestAnimationFrame(moveCat);
})
onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
  cancelAnimationFrame(animationId);
})
</script>

<template>
  <div
      class="fixed z-50 top-0 left-0 w-8 h-8 pointer-events-none cat"
      :style="{
          transform: `translate(${x}px, ${y}px)`
      }"
  >
  </div>
</template>

<style scoped>
  .cat {

    background-image: url('../assets/oneko/oneko.gif');
    background-repeat: no-repeat;
    image-rendering: pixelated;
    background-position: -96px -96px;
  }
</style>
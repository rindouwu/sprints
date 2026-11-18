<script setup lang="ts">

import { onMounted, onUnmounted, ref } from "vue";

const x = ref(0);
const y = ref(0);
const mouseX = ref(0);
const mouseY = ref(0);

const currentDir = ref('IDLE')
const frame = ref(0)

const followSpeed = 0.005
const stopDistance = 40

let animationId: number
let frameTimer: number

const spriteMap: Record<string, [number, number][]> = {
  N: [[1, 2], [1, 3]],
  NE: [[0, 2], [0, 3]],
  E: [[3, 0], [3, 1]],
  SE: [[5, 1], [5, 2]],
  S: [[6, 3], [7, 2]],
  SW: [[5, 3], [6, 1]],
  W: [[4, 2], [4, 3]],
  NW: [[1, 0], [1, 1]],
  IDLE: [[3, 3], [3, 3]]
}

const getBackgroundPosition = () => {
  const frames = spriteMap[currentDir.value] || spriteMap.IDLE
  const [col, row] = frames[frame.value]

  return `${col * -32}px ${row * -32}px`
}

const updateMouse = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const moveCat = () => {
  const dx = mouseX.value - (x.value + 16)
  const dy = mouseY.value - (y.value + 16)

  const distance = Math.hypot(dx, dy)
  if(distance > stopDistance) {
    x.value += dx * followSpeed
    y.value += dy * followSpeed

    const angle = Math.atan2(dy, dx) * (180 / Math.PI)

    if(angle >= -22.5 && angle < 22.5) currentDir.value = 'E'
    else if (angle >= 22.5 && angle < 67.5) currentDir.value = 'SE';
    else if (angle >= 67.5 && angle < 112.5) currentDir.value = 'S';
    else if (angle >= 112.5 && angle < 157.5) currentDir.value = 'SW';
    else if (angle >= 157.5 || angle < -157.5) currentDir.value = 'W';
    else if (angle >= -157.5 && angle < -112.5) currentDir.value = 'NW';
    else if (angle >= -112.5 && angle < -67.5) currentDir.value = 'N';
    else if (angle >= -67.5 && angle < -22.5) currentDir.value = 'NE';
  } else {
    currentDir.value = 'IDLE';
  }

  animationId = requestAnimationFrame(moveCat);
}

const animateFrames = () => {
  frame.value = frame.value === 0 ? 1 : 0
  frameTimer = window.setTimeout(animateFrames, 150)
}

onMounted(() => {
  x.value = window.innerWidth / 2 - 16
  y.value = window.innerHeight / 2 - 16
  mouseX.value = window.innerWidth / 2
  mouseY.value = window.innerHeight / 2

  window.addEventListener("mousemove", updateMouse);
  animationId = requestAnimationFrame(moveCat);
  animateFrames()
})
onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
  cancelAnimationFrame(animationId);
  clearTimeout(frameTimer);
})
</script>

<template>
  <div
      class="fixed z-50 top-0 left-0 w-8 h-8 pointer-events-none cat"
      :style="{
          transform: `translate(${x}px, ${y}px)`,
          backgroundPosition: getBackgroundPosition()
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
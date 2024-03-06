<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.visible"
      class="w-full flex justify-center h-15vh items-center transition-opacity duration-300 ease-in"
    >
      <div
        class="fixed flex justify-center items-center w-auto h-auto bg-#000 px-1vw py-1vh rounded-15"
      >
        <div class="animation" :data-text="props.title">{{ props.title }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  title: string;
}>();
</script>

<style lang="scss" scoped>
.animation {
  color: #222;
  position: relative;
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to right,
      rgb(236, 72, 153),
      rgb(239, 68, 68),
      rgb(234, 179, 8)
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    clip-path: ellipse(2vw 2vw at 0% 50%);
    animation: move 8s ease-in-out infinite;
  }
}

@keyframes move {
  50% {
    clip-path: ellipse(2vw 2vw at 100% 50%);
  }

  100% {
    clip-path: ellipse(2vw 2vw at 0% 50%);
  }
}
</style>

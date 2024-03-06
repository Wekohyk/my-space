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
        <div class="text-#fff">{{ props.title }}</div>
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

<style lang="scss" scoped></style>

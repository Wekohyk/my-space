<template>
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed top-0 left-0 right-0 bottom-0 bg-[var(--background)] opacity-70 transition-opacity duration-300 ease-in -z-9999999999"
      v-if="mask"
    ></div>
  </transition>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const mask = ref(false);
onMounted(() => {
  mask.value = true;
});
</script>

<style scoped lang="scss"></style>

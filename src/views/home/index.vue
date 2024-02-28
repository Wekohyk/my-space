<template>
  <!-- The mask is a semi-transparent layer that covers the entire screen. -->
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mask"
      class="fixed top-0 left-0 right-0 bottom-0 bg-[var(--background)] opacity-70 transition-opacity duration-300 ease-in"
    ></div>
  </transition>

  <div class="fixed top-0 right-0 bottom-0 left-0">
    <div class="flex justify-center items-center h-100vh flex-col">
      <div class="font-PacificoRegular text-[var(--text)]">
        {{ $t('wekoHome') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const mask = ref(false);
onMounted(() => {
  mask.value = true;
});
</script>

<style lang="scss" scoped></style>

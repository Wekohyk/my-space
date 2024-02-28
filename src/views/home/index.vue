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
    <div class="flex justify-center items-center h-100vh">
      <div class="font-PacificoRegular text-[var(--text)]">
        {{ $t('wekoHome') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as jinrishici from 'jinrishici';

// The Poetry Today API returns a data type definition
type PoetryOfToday = Response;
type PoetryOfTodayError = ErrData;

const mask = ref(false);
onMounted(() => {
  mask.value = true;
});

/**
 * @file jinrishici.d.ts
 * @description The Poetry Today API returns a data type definition
 * @see https://www.jinrishici.com
 */
jinrishici.load(
  (result: PoetryOfToday) => {
    console.log(result);
  },
  (errData: PoetryOfTodayError) => {
    console.log(errData);
  },
);
</script>

<style lang="scss" scoped></style>

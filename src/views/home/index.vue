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
  <!-- <img
    src="https://tuapi.eees.cc/api.php?category=fengjing&type=302&px="
    alt=""
  /> -->
  <transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="mask">
      <img src="https://tuapi.eees.cc/api.php?category=fengjing&type=302&px=" />
    </div>
  </transition>
  <div class="fixed top-0 right-0 bottom-0 left-0">
    <div class="flex justify-center items-center h-100vh">
      <!-- left box -->
      <div class="flex flex-col justify-center items-center text-center">
        <div class="flex gap-10px items-center">
          <div>
            <img
              class="w-5vh h-5vh rounded-50%"
              src="../../assets/images/avatar.png"
            />
          </div>
          <div class="font-PacificoRegular text-[var(--text)] h-full">
            {{ $t('wekoHome') }}
          </div>
        </div>
        <div
          class="h-1 w-200 bg-gradient-to-b from-[var(--background)] to-[var(--text)] opacity-14 my-20px"
        ></div>
        <div class="text-[var(--text)]">
          {{ !isEn && isPoetry ? poetry : 'Hello World!' }}
        </div>
      </div>
      <!-- right box -->
      <div class="flex flex-col items-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isEn } from '../../lang/index';
import { getJinrishici } from '../../utils/getJinrishici';

const poetry = ref('');
const isPoetry = ref(false);
const mask = ref(false);
onMounted(() => {
  mask.value = true;
  getJinrishici()
    .then(result => {
      console.log(result);
      poetry.value = result.data.content;
      isPoetry.value = true;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>

<style lang="scss" scoped></style>

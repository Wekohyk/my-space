<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
  >
    <div class="flex justify-center items-center h-100vh gap-20 flex-col">
      <!-- top box -->
      <div class="flex justify-center items-center">
        <div class="flex flex-col justify-center items-center text-center">
          <div class="flex gap-10px items-center">
            <div>
              <img class="w-5vh h-5vh rounded-50%" src="/images/avatar.webp" />
            </div>
            <div class="animation" :data-text="$t('wekoHome')">
              {{ $t('wekoHome') }}
            </div>
          </div>
          <div
            class="h-1 w-20rem bg-gradient-to-l from-#3e3e3e via-#fff to-#3e3e3e opacity-60 my-20px"
          ></div>
          <div class="font-STXingkai text-#fff text-1.5rem">
            {{ !isEn && isPoetry ? poetry : 'Hello World!' }}
          </div>
        </div>
      </div>
      <!-- bottom box -->
      <div class="bootstrap flex items-center gap-30">
        <Weather></Weather>
        <Menu></Menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getJinrishici } from '../utils/getJinrishici';
import Weather from './Weather.vue';
import Menu from './Menu.vue';

import { isEn } from '../lang/index';
const poetry = ref('');
const isPoetry = ref(false);
const mask = ref(false);
onMounted(() => {
  mask.value = true;
  getJinrishici()
    .then(result => {
      poetry.value = result.data.content;
      isPoetry.value = true;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>

<style lang="scss" scoped>
.animation {
  font-family: PacificoRegular;
  font-size: 1.5rem;
  font-weight: 500;
  color: #222;
  position: relative;

  &::before {
    content: attr(data-text);
    position: absolute;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    border-right: 4px solid #fff;
    animation: move 8s linear infinite;
    // The filter attribute in Safari on IOS devices does not display as expected
    // Substitute effect reference: box-shadow: 0 0 20px #fff, 0 0 50px #fff;
    filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #fff);
    pointer-events: none;
  }

  @keyframes move {
    0%,
    10%,
    100% {
      width: 0;
    }

    70%,
    90% {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .bootstrap {
    flex-direction: column;
  }
}
</style>

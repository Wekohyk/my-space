<template>
  <div>
    <Loading></Loading>
    <BackgroundImg @loadComplete="loadComplete"></BackgroundImg>
    <Mousemove :toggleEvent="toggleEffect"></Mousemove>
    <MyMessage></MyMessage>
    <router-view></router-view>
    <div
      class="absolute top-10 right-10 w-4rem h-4rem flex justify-center items-center"
    >
      <div
        class="iconfont toggle text-2rem text-#fff opacity-40"
        @click="toggleEffectClick"
      >
        &#xe8a8;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import BackgroundImg from './components/BackgroundImg.vue';
import { helloInit } from './utils/getTIme';
import MyMessage from './components/MyMessage.vue';
import Loading from './components/Loading.vue';
import Mousemove from './components/Mousemove.vue';
import { ToggleEvent } from './types/home';

const toggleEffect = ref<ToggleEvent>('mouseMove');

// loading complete event
const loadComplete = () => {
  nextTick(() => {
    // welcome message
    helloInit();
  });
};

const toggleEffectClick = () => {
  if (toggleEffect.value === 'mouseMove') {
    toggleEffect.value = 'none';
  } else {
    toggleEffect.value = 'mouseMove';
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  transition: all 0.5s;
  &:hover {
    font-size: 4rem;
    transition: all 0.5s;
    opacity: 1;
    fill: unset;
  }
}
</style>

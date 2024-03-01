<template>
  <Loading></Loading>
  <BackgroundImg @loadComplete="loadComplete"></BackgroundImg>
  <MyMessage></MyMessage>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import BackgroundImg from './components/BackgroundImg.vue';
import { helloInit } from './utils/getTIme';
import MyMessage from './components/MyMessage.vue';
import Loading from './components/Loading.vue';
// loading complete event
const loadComplete = () => {
  nextTick(() => {
    // welcome message
    helloInit();
  });
};
</script>

<style lang="scss" scoped></style>

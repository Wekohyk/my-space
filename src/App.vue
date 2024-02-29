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
// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
  });
};
</script>

<style lang="scss" scoped></style>

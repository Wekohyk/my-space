<template>
  <Loading></Loading>
  <BackgroundImg @loadComplete="loadComplete"></BackgroundImg>
  <Mousemove v-if="toggleEffect"></Mousemove>
  <Total :title="local.message1" :visible="visible"></Total>
  <div>
    <!-- drawer -->
    <div class="boxDrawer" v-if="drawer">
      <LineCombination></LineCombination>
    </div>
    <!-- mid -->
    <MyMessage></MyMessage>
    <!-- button -->
    <div
      class="absolute top-10vh right-5vh w-4rem h-4rem flex justify-center items-center flex-col gap-10"
    >
      <div @mouseenter="mouseenter" @mouseleave="mouseleave">
        <Switch
          :width="76"
          :height="34"
          :openIcon="true"
          :closeIcon="true"
          style="margin: 0 60px"
          @update:own-open="handleSwitchChange"
        >
          <template #openIcon>
            <span :style="{ color: '#fff', marginRight: '2px' }">ON</span>
          </template>
          <template #closeIcon>
            <span :style="{ color: '#fff', marginLeft: '4px' }">OFF</span>
          </template>
        </Switch>
      </div>
      <div
        class="iconfont toggle text-2rem text-#fff opacity-40"
        @click="toggleEffectClick"
      >
        &#xe8a8;
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import BackgroundImg from './components/BackgroundImg.vue';
import { helloInit } from './utils/getTIme';
import MyMessage from './components/MyMessage.vue';
import Loading from './components/Loading.vue';
import Mousemove from './components/Mousemove.vue';
import LineCombination from './components/LineCombination.vue';
import Switch from './components/Switch.vue';
import Total from './components/Total.vue';
import isEn from './lang/index';

const local = isEn
  ? {
      message1: '是否显示',
    }
  : {
      message1: 'Whether to display',
    };

const drawer = ref<boolean>(false);
const visible = ref<boolean>(false);
const handleSwitchChange = (value: boolean) => {
  drawer.value = !value;
  console.log('drawer.value', drawer.value);
};
const mouseenter = () => {
  visible.value = true;
};
const mouseleave = () => {
  visible.value = false;
};

// toggle effect
const toggleEffect = ref<boolean>(true);
// loading complete event
const loadComplete = () => {
  nextTick(() => {
    // welcome message
    helloInit();
  });
};

const toggleEffectClick = () => {
  toggleEffect.value = !toggleEffect.value;
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

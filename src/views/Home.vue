<template>
  <Loading></Loading>
  <BackgroundImg @loadComplete="loadComplete"></BackgroundImg>
  <Mousemove v-if="toggleEffect"></Mousemove>
  <Total
    :title="messageNum === '1' ? $t('message1') : $t('message2')"
    :visible="visible"
  ></Total>
  <div>
    <!-- drawer -->
    <div v-if="drawer">
      <LineCombination></LineCombination>
    </div>

    <!-- mid -->
    <MyMessage></MyMessage>

    <!-- button -->
    <div class="fixed top-60 right-20 flex items-end flex-col gap-20">
      <div @mouseenter="mouseenter('1')" @mouseleave="mouseleave">
        <Switch
          class="toggle"
          :width="76"
          :height="34"
          :openIcon="true"
          :closeIcon="true"
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
        @mouseenter="mouseenter('2')"
        @mouseleave="mouseleave()"
      >
        &#xe6bd;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import BackgroundImg from '../components/BackgroundImg.vue';
import { helloInit } from '../utils/getTIme';
import MyMessage from '../components/MyMessage.vue';
import Loading from '../components/Loading.vue';
import Mousemove from '../components/Mousemove.vue';
import LineCombination from '../components/LineCombination.vue';
import Switch from '../components/Switch.vue';
import Total from '../components/Total.vue';

const drawer = ref<boolean>(false);
const visible = ref<boolean>(false);
const messageNum = ref<string>('1');
const handleSwitchChange = (value: boolean) => {
  drawer.value = !value;
  console.log('drawer.value', drawer.value);
};
const mouseenter = (id: string) => {
  if (id === '1') {
    messageNum.value = '1';
  }
  if (id === '2') {
    messageNum.value = '2';
  }
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
    transition: all 0.5s;
    opacity: 1;
    fill: unset;
  }
}
</style>

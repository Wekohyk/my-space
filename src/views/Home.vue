<template>
  <Loading></Loading>
  <BackgroundImg></BackgroundImg>
  <Mousemove v-if="toggleEffect"></Mousemove>
  <Total
    :title="messageNum === '1' ? $t('message2') : $t('message1')"
    :visible="visible"
  ></Total>
  <div>
    <!-- mid -->
    <MyMessage></MyMessage>

    <!-- button -->
    <div class="isShow fixed top-60 right-20 flex items-end flex-col gap-20">
      <div
        class="iconfont toggle text-2rem text-#fff opacity-40 cursor-pointer hover:scale-120 transition-all duration-300"
        @click="toggleEffectClick"
        @mouseenter="mouseenter('1')"
        @mouseleave="mouseleave()"
      >
        &#xe6bd;
      </div>
      <div
        class="iconfont toggle text-2rem text-#fff opacity-40 cursor-pointer hover:scale-120 transition-all duration-300"
        @click="jumpHomePage"
        @mouseenter="mouseenter('2')"
        @mouseleave="mouseleave()"
      >
        &#xe774;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BackgroundImg from '../components/BackgroundImg.vue';
import { helloInit } from '../utils/getTIme';
import MyMessage from '../components/MyMessage.vue';
import Loading from '../components/Loading.vue';
import Mousemove from '../components/Mousemove.vue';
import Total from '../components/Total.vue';

const visible = ref<boolean>(false);
const messageNum = ref<string>('1');
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

onMounted(() => {
  setTimeout(() => {
    // welcome message
    helloInit();
  }, 2000);
});

const toggleEffectClick = () => {
  toggleEffect.value = !toggleEffect.value;
};

// jump to homepage
const jumpHomePage = () => {
  window.open('https://page.wekooo.com', '_self');
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

// Responsive layout

/* ipad pro */
@media screen and (max-width: 1024px) {
}
/* ipad */
@media screen and (max-width: 768px) {
  .isShow {
    display: none;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
}
/* iphone5 */
@media screen and (max-width: 320px) {
}
</style>

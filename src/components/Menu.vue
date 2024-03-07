<template>
  <div
    class="flex justify-center items-center bg-#000/40 w-300 h-150 px-20 rounded-30"
  >
    <div class="flex justify-between items-center w-full h-full">
      <div
        class="flex gap-10 flex-col"
        v-for="(item, index) in urlList"
        :key="index"
        @click="open(item.url)"
      >
        <div class="flex justify-center items-center">
          <img class="w-30 h-30" :src="item.src" />
        </div>
        <div class="text-#fff">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $t } from '../lang';

const urlList = [
  {
    name: 'Github',
    url: 'https://github.com/',
    src: '/svg/github.svg',
  },
  {
    name: `${$t('googleEmail')}`,
    url: 'https://mail.google.com/',
    src: '/svg/email.svg',
  },
  {
    name: `${$t('weiboSearch')}`,
    url: 'https://s.weibo.com/top/summary',
    src: '/svg/hot.svg',
  },
];
// open url
const open = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="w-300 h-150 bg-#000/40 rounded-20 px-40">
    <Swiper
      init
      direction="horizontal"
      auto-height
      :space-between="40"
      :slides-per-view="1"
      :modules="[Mousewheel]"
      :mousewheel="true"
      @active-index-change="handleIndexChange"
      class="flex"
    >
      <SwiperSlide v-for="(itemsGroup, index) in urlList" :key="index">
        <div class="flex justify-between items-center h-130">
          <div
            class="flex gap-10 flex-col cursor-pointer hover:scale-120 transition-all duration-300"
            v-for="(item, index) in itemsGroup"
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
      </SwiperSlide>
    </Swiper>
    <div class="flex gap-5 w-full items-center justify-center">
      <div
        class="pagination w-10 h-3 bg-#fff opacity-30 hover:opacity-100 transition-all duration-300 rounded-4 cursor-pointer"
        :class="swiperIndex === index ? 'opacity-100' : 'opacity-30'"
        v-for="(item, index) in urlList.length"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { $t } from '../lang';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

const urlLists = [
  {
    name: 'Github',
    url: 'https://github.com/Wekohyk',
    src: '/svg/github.svg',
  },
  {
    name: `${$t('googleEmail')}`,
    url: 'https://mail.google.com/',
    src: '/svg/email.svg',
  },
  {
    name: `${$t('startingPage')}`,
    url: 'https://page.wekooo.com',
    src: '/svg/startingPage.svg',
  },
  // {
  //   name: `${$t('blog')}`,
  //   url: 'https://note.wekooo.com',
  //   src: '/svg/blog.svg',
  // },
  // {
  //   name: `${$t('note')}`,
  //   url: 'https://note.wekooo.com/index.php/category/study-notes/',
  //   src: '/svg/note.svg',
  // },
  // {
  //   name: `${$t('article')}`,
  //   url: 'https://note.wekooo.com/index.php/category/article/',
  //   src: '/svg/article.svg',
  // },
  // {
  //   name: `${$t('curriculum')}`,
  //   url: 'https://note.wekooo.com/index.php/category/curriculum-vitae/',
  //   src: '/svg/curriculum.svg',
  // },
  {
    name: `${$t('jsComponents')}`,
    url: 'https://jscomponents.wekooo.com',
    src: '/svg/jsComponents.svg',
  },
];

const urlList = computed(() => {
  const result = [];
  for (let i = 0; i < urlLists.length; i += 3) {
    const subArr = urlLists.slice(i, i + 3);
    result.push(subArr);
  }
  return result;
});

const swiperIndex = ref(0);
const handleIndexChange = (e: { activeIndex: number }) => {
  swiperIndex.value = e.activeIndex;
  console.log(swiperIndex.value);
};

// open url
const open = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped>
.pagination {
  position: static;
  margin-top: 4px;
  :deep(.swiper-pagination-bullet) {
    background-color: #fff;
    width: 18px;
    height: 4px;
    border-radius: 4px;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>

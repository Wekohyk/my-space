<template>
  <div class="fixed top-0 left-0 w-100% h-100% duration-250 -z-1">
    <img
      class="background fixed top-0 left-0 w-full h-full object-cover backface-hidden"
      :src="imgUrl"
      alt=""
      @load="imgLoadComplete"
      @error.once="imgLoadError"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { homeStore } from '../stores/index';
import { ElMessage } from 'element-plus';
import { isEn } from '../lang/index';

const local = isEn
  ? {
      wallpaperFailed: '壁纸加载失败，已临时切换回默认',
    }
  : {
      wallpaperFailed:
        'Wallpaper loading failed, temporarily switched back to default',
    };

const store = homeStore();
const imgUrl = ref('');

const random = Math.floor(Math.random() * 12);

const changeBg = (type: string) => {
  if (type === '0') {
    imgUrl.value = `/images/acquiesceBackground${random}.webp`;
  } else if (type === '1') {
    imgUrl.value = 'https://api.dujin.org/bing/1920.php';
  } else if (type === '2') {
    imgUrl.value = 'https://api.aixiaowai.cn/gqapi/gqapi.php';
  } else if (type === '3') {
    imgUrl.value = 'https://api.aixiaowai.cn/api/api.php';
  }
};

const imgTimeout = ref<number>();
// img load complete
const imgLoadComplete = () => {
  imgTimeout.value = setTimeout(
    () => {
      store.setImgLoadStatus(true);
    },
    Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  );
};

// img load error
const imgLoadError = () => {
  ElMessage({
    message: local.wallpaperFailed,
  });
  imgUrl.value = `/images/acquiesceBackground${random}.webp`;
};

onMounted(() => {
  // loading wallpaper
  changeBg(store.coverType);
});

onBeforeUnmount(() => {
  clearTimeout(imgTimeout.value);
});
</script>
<style lang="scss">
.background {
  filter: brightness(0.3);
  transition:
    filter 0.3s,
    transform 0.3s;
  animation: fade-blur-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.45s;
}
</style>

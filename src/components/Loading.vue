<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-999999 overflow-hidden"
    :class="{ loaded: store.imgLoadStatus }"
  >
    <div
      class="loader w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center"
    >
      <!-- <div
        class="loader-circle w-150 h-150 rounded-50% border-3 border-solid border-[var(--text)] z-2"
      ></div> -->
      <div
        class="loader-circle w-100% h-360px flex justify-center items-center z-2 -translate-y-60"
      >
        <div class="content w-200 h-100 -mt-100 relative cursor-pointer">
          <div class="item1"></div>
          <div class="item2"></div>
          <div class="item3"></div>
          <div class="item4"></div>
          <div class="item5"></div>
          <div class="item6"></div>
          <div class="item7"></div>
        </div>
      </div>
      <div
        class="loader-text flex flex-col items-center text-[var(--text)] z-2 text-24 -translate-y-100"
      >
        <span>{{ siteName }}</span>
        <span class="mt-6 text-18 opacity-60">{{ local.loading }}...</span>
      </div>
    </div>
    <div
      class="loader-section section-left fixed top-0 left-0 w-51% h-full bg-#333 z-1"
    ></div>
    <div
      class="loader-section section-right fixed top-0 right-0 w-51% h-full bg-#333 z-1"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { homeStore } from '../stores/index';
import { isEn } from '../lang/index';
const local = isEn
  ? {
      loading: 'Loading',
    }
  : {
      loading: '加载中',
    };

const store = homeStore();
const siteName = import.meta.env.VITE_SITE_NAME;
</script>
<style lang="scss" scoped>
.loaded {
  visibility: hidden;
  transform: translateY(-100%);
  transition:
    transform 0.3s 1s ease-out,
    visibility 0.3s 1s ease-out;
  .loader {
    .loader-circle,
    .loader-text {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
  }
  .loader-section {
    &.section-left {
      transform: translateX(-100%);
      transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &.section-right {
      transform: translateX(100%);
      transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}

.content {
  $width: 200px;
  $height: 100px;
  $gap: 15px;

  width: $width;
  height: $height;
  margin-top: -$height;
  position: relative;
  cursor: pointer;

  .item {
    border: 5px solid;
    border-radius: 50% 50% 0 0/100% 100% 0 0;
    border-bottom: none;
    position: absolute;
    bottom: 0;
    animation: spin 2s cubic-bezier(0.11, 0.85, 0.22, 1.3) infinite;
    transform-origin: 50% 100%;
    transition: all 0.5s;
  }

  .item1 {
    @extend .item;
    border-color: #e94545;
    $width1: $width;
    width: $width1;
    height: calc($width1 / 2);
    left: calc(50% - $width1 / 2);
  }

  .item2 {
    @extend .item;
    border-color: #eb8f34;
    $width2: calc($width - $gap * 2);
    width: $width2;
    height: calc($width2 / 2);
    left: calc(50% - $width2 / 2);
    animation-delay: -60ms;
  }

  .item3 {
    @extend .item;
    border-color: #eecf69;
    $width3: calc($width - $gap * 2 * 2);
    width: $width3;
    height: calc($width3 / 2);
    left: calc(50% - $width3 / 2);
    animation-delay: calc(-60ms * 2);
  }

  .item4 {
    @extend .item;
    border-color: #215221;
    $width4: calc($width - $gap * 2 * 3);
    width: $width4;
    height: calc($width4 / 2);
    left: calc(50% - $width4 / 2);
    animation-delay: calc(-60ms * 3);
  }

  .item5 {
    @extend .item;
    border-color: #87bb80;
    $width5: calc($width - $gap * 2 * 4);
    width: $width5;
    height: calc($width5 / 2);
    left: calc(50% - $width5 / 2);
    animation-delay: calc(-60ms * 4);
  }

  .item6 {
    @extend .item;
    border-color: #87ceeb;
    $width6: calc($width - $gap * 2 * 5);
    width: $width6;
    height: calc($width6 / 2);
    left: calc(50% - $width6 / 2);
    animation-delay: calc(-60ms * 5);
  }

  .item7 {
    @extend .item;
    border-color: #c393eb;
    $width7: calc($width - $gap * 2 * 6);
    width: $width7;
    height: calc($width7 / 2);
    left: calc(50% - $width7 / 2);
    animation-delay: calc(-60ms * 6);
  }

  &:hover {
    .item {
      filter: brightness(1.5);
      animation-play-state: paused;
    }
  }
}

@keyframes spin {
  0%,
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0%,
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>

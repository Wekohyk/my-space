<template>
  <div
    class="flex justify-center items-center bg-#000/40 w-300 h-150 rounded-30"
  >
    <div
      class="hover iconfont text-#fff opacity-60 text-1.5rem hover:opacity-100 transition-all duration-600"
      @click="open('https://github.com/')"
    >
      &#xe885;
    </div>
  </div>
</template>

<script setup lang="ts">
// open url
const open = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped></style>

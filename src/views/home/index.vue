<template>
  <div>{{ $t('home') }}</div>
  <div>{{ local.language }}</div>
  <div></div>
</template>

<script setup lang="ts">
import { isEn } from '../../lang/index';
import { showTime } from '../../utils/getShowTime';

const local = isEn
  ? {
      language: 'en',
    }
  : {
      language: 'zh',
    };

setInterval(() => {
  console.log(showTime());
}, 1000);
</script>

<style scoped lang="sass"></style>

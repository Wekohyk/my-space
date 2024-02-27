<template>
  <div class="text-#ffffff">{{ $t('home') }}</div>
  <div class="font-PacificoRegular execText">{{ local.language }}</div>
  <div></div>
</template>

<script setup lang="ts">
import { isEn } from '../../lang/index';

const local = isEn
  ? {
      language: 'en',
    }
  : {
      language: 'zh',
    };
</script>

<style lang="scss" scoped></style>

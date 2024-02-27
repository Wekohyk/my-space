<template>
  <div>{{ $t('home') }}</div>
  <div>{{ local.language }}</div>
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

<style scoped lang="sass"></style>

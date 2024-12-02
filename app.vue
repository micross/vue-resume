<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
useHead({
  title: 'Resume',
  htmlAttrs: {
  },
});
</script>

<template>
  <NuxtLayout>
    <!-- <VueQueryDevtools /> -->
    <NuxtPage />
  </NuxtLayout>
</template>
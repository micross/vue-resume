<script setup lang="ts">
import dart from '/logo-type-white.svg';
import light from '/logo-type.svg';

const imageProps = {
  width: 80,
  height: 36,
  alt: 'Logo',
};


</script>

<template>
  <img
    :src="light"
    class="mb-6 dark:hidden block"
    v-bind="imageProps"
  />
  <img
    :src="dart"
    class="mb-6 dark:block hidden"
    v-bind="imageProps"
  />
</template>

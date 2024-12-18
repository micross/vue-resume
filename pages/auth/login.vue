<script setup lang="ts">
definePageMeta({
  auth: false,
  middleware: 'guest',
  layout: 'auth',
});

useHead({
  title: 'Login'
});
</script>

<template>
  <AuthLogin />
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
  middleware: 'guest',
  layout: 'auth',
});

</script>

<template>
  <AuthForgotPassword />
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
})

useHead({
  title: 'Profile',
  meta: [
    {
      key: 'description',
      name: 'description',
      content: 'Profile page',
    },
  ],
});

</script>

<template>
    <div
      class="container mx-auto flex justify-between items-center px-2 md:px-0"
    >

      <Button @click="" text color="primary"> Sign out </Button>
    </div>

  <div class="container mx-auto p-6 md:px-0">
    <h3 class="font-semibold text-xl text-gray-900">
      Welcome back!
    </h3>
    <p class="mt-2 text-gray-700">
      This is a profle page. You can only see this page if you are signed in.
    </p>
  </div>
</template>

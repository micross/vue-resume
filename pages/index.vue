<script setup lang="ts">
definePageMeta({
  auth: true,
})
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-semibold">
      Welcome to <span class="font-semibol">Morpheme Auth</span>!
    </h1>
    <p class="text-gray-700 mt-3 text-sm">
      Check out the profile page here:
      <Button to="/profile" text flush color="primary" class="hover:underline">
        View Profile
      </Button>
    </p>
  </div>
</template>

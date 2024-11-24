<script setup lang="ts">
import {useForm} from 'vee-validate';
import * as v from 'valibot';

const loading = ref(false);
const error = ref();
const success = ref(false);

const {handleSubmit} = useForm({
  validationSchema: v.object({
    email: v.string(),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = '';
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: values,
    });
    success.value = true;
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6 grid items-center justify-center">
    <div class="md:w-[400px]">
      <slot name="logo">
        <AuthLogo />
      </slot>
      <div class="space-y-2 mb-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-neutral-200">
          forgot Password
        </h1>
        <p class="text-sm text-gray-700 dark:text-neutral-400">
          description
        </p>
      </div>
      <template v-if="success">
        <Alert color="success" solid class="mb-4">
          successMessage
        </Alert>
        <Button to="/auth/login" block>
          Login
        </Button>
      </template>
      <form v-else @submit="onSubmit">
        <Alert v-if="error" color="error" class="mb-4"> {{ error }} </Alert>
        <Input
          wrapper-class="mb-4"
          name="email"
        />
        <Button
          :loading="loading"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  </div>
</template>

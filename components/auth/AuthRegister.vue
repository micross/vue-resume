<script setup lang="ts">
import {useForm} from 'vee-validate';
import * as v from 'valibot';

const loading = ref(false);
const error = ref();
const success = ref(false);

const {handleSubmit} = useForm({
  validationSchema: v.object({

  }),
}); 

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  error.value = '';
  try {
    await $fetch('/api/auth/register', {
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

const inputComponent = (component: any) => {
  switch (component) {
    case 'checkbox':
      return resolveComponent('VCheckbox');
    default:
      return resolveComponent('Input');
  }
};
</script>

<template>
  <div class="p-6 grid items-center justify-center">
    <div class="md:w-[400px]">
      <slot name="logo">
        <AuthLogo />
      </slot>
      <div class="space-y-2 mb-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-neutral-200">
          Register
        </h1>
        <p class="text-sm text-gray-700 dark:text-neutral-400">
        </p>
      </div>
      <template v-if="success">
        <Alert color="success" solid class="mb-4">
          success
        </Alert>
        <Button to="/auth/login" block>
          login
        </Button>
      </template>
      <form v-else @submit="onSubmit">
        <Alert v-if="error" color="error" class="mb-4"> {{ error }} </Alert>
        <slot name="inputs">
        </slot>
        <Button
          :loading="loading"
          type="submit"
        >
          register
        </Button>
      </form>
    </div>
  </div>
</template>

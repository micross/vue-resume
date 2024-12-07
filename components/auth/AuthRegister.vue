<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as v from 'valibot';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema } from '~/lib/dto';
import { toTypedSchema } from '@vee-validate/valibot';

const loading = ref(false);
const error = ref();
const success = ref(false);

type FormValues = v.InferOutput<typeof registerSchema>;

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const onSubmit0 = handleSubmit(async (values) => {
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

const onSubmit = handleSubmit(async (data: FormValues) => {
  try {
    await register(data);

    navigateTo("/auth/verify-email");
  } catch {
    resetForm();
  }
});

const [password, passwordAttrs] = defineField('password');
const [email, emailAttrs] = defineField('email');
const [username, usernameAttrs] = defineField('username');
const [name, nameAttrs] = defineField('name');

</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">
        Sign Up
      </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="grid gap-4">
        <Alert v-if="error" color="error" class="mb-4"> {{ error }} </Alert>
        <div class="grid gap-2">
          <Label for="email">Name</Label>
          <Input id="name" type="text" placeholder="Chris" required v-model="name" v-bind="nameAttrs" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" type="text" placeholder="chris" required v-model="username" v-bind="usernameAttrs" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required v-model="email" v-bind="emailAttrs" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required v-model="password" v-bind="passwordAttrs" />
        </div>
        <Button type="submit" class="w-full" :loading="loading">
          Create an account
        </Button>
        <Button variant="outline" class="w-full">
          Sign up with GitHub
        </Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/auth/login" class="underline">
          Sign in
        </a>
      </div>
    </CardContent>
  </Card>
</template>

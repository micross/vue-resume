<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as v from 'valibot';
import { loginSchema } from '~/lib/dto';
import { toTypedSchema } from '@vee-validate/valibot';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const route = useRoute();
const { providers } = useAuthProviders();
const { login, loading } = useLogin();

const error = ref();

type FormValues = v.InferOutput<typeof loginSchema>;

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const onSubmit = handleSubmit(async (values: FormValues) => {
  error.value = null;

  try {
    await login(values);
  } catch (e) {
    error.value = 'Invalid credentials';
    return;
  }

  const nextUrl: any = route.query?.next || route.query?.callbackUrl;
  const callbackUrl = nextUrl || '/profile';

  console.log(callbackUrl)

  await navigateTo(callbackUrl, {
    replace: true,
    external: callbackUrl.startsWith('http')
  });
});

const [password, passwordAttrs] = defineField('password');
const [identifier, identifierAttrs] = defineField('identifier');

const hasSocialProviders = computed(() => {
  return (providers.value?.filter((name) => name !== 'email')?.length || 0) > 0;
});

</script>

<template>
  <form @submit="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <Alert v-if="error" color="error" class="mb-4"> {{ error }} </Alert>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input name="identifier" v-model="identifier" autocomplete="username" placeholder="m@example.com" v-bind="identifierAttrs" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="/auth/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input name="password" v-model="password" v-bind="passwordAttrs" type="password" autocomplete="current-password" required />
          </div>
          <Button type="submit" class="w-full">
            Login
          </Button>
          <Button variant="outline" class="w-full">
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="/auth/register" class="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  </form>
</template>

<!-- <template>
  <div class="p-6 grid items-center justify-center">
    <form class="md:w-[400px]" @submit="onSubmit">

      <slot name="logo">
        <AuthLogo />
      </slot>
      <div class="space-y-2 mb-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-neutral-200">
          Login
        </h1>
        <p class="text-sm text-gray-700 dark:text-neutral-400">
          description
        </p>
      </div>
      <Alert v-if="error" color="error" class="mb-4"> {{ error }} </Alert>
      <Input wrapper-class="mb-4" name="identifier" v-model="identifier" autocomplete="username"
        v-bind="identifierAttrs" />
      <div>{{ errors.identifier }}</div>
      <Input wrapper-class="mb-4" name="password" v-model="password" v-bind="passwordAttrs" type="password"
        autocomplete="current-password" />
      <div>{{ errors.password }}</div>
      <div class="mb-4 flex gap-4 justify-between">
        <Checkbox label="Remember Me" name="rememberMe" />
        <Button to="/auth/forgot-password" color="primary" text flush>
          Forgot Password
        </Button>
      </div>
      <button type="submit">
        Login
      </button>

      <p class="text-sm text-gray-700 dark:text-neutral-400 text-center mt-5">
        register
        <Button to="/auth/register" color="primary" text flush>
          register
        </Button>
      </p>

      <div v-if="hasSocialProviders" class="flex gap-4 items-center mt-5 mb-4">
        <div class="border-t dark:border-neutral-700 flex-1"></div>
        <span class="text-sm text-gray-600 dark:text-neutral-400">
          or
        </span>
        <div class="border-t dark:border-neutral-700 flex-1"></div>
      </div>

      <template v-for="provider in providers" :key="provider">
        <Button v-if="provider == 'github'" block color="dark">
          Login With {{ provider }}
        </Button>

        <Button v-if="provider == 'google'" block color="danger">
          Login With {{ provider }}
        </Button>
      </template>

    </form>
  </div>
</template> -->

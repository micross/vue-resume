import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query';

import {
  VueQueryPlugin,
  hydrate,
  dehydrate,
} from '@tanstack/vue-query';
// Nuxt 3 app aliases
import { defineNuxtPlugin, useState } from '#imports'
import { queryClient } from '~/utils/query-client'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})
export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie('token')
  
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase,
      onRequest({ request, options, error }) {
        if (token.value) {
          // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
          options.headers.set('Authorization', `Bearer ${token.value}`)
        }
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(() => navigateTo('/auth/login'))
        }
      }
    })
  
    // Expose to useNuxtApp().$api
    return {
      provide: {
        api
      }
    }
  })
  
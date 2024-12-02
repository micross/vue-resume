export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-i18n-micro',
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-tiptap-editor'
  ],
  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:5800'
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})

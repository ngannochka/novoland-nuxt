// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-directus',
  ],
  css: ['~/assets/css/main.css'],
  ui: { colorMode: false },
  nitro: {
    preset: 'bun'
  },
  runtimeConfig: {
    public: {
      directus: {
        url: process.env.NUXT_PUBLIC_DIRECTUS_URL
      },
      captchaClientKey: process.env.NUXT_PUBLIC_CAPTCHA_CLIENT_KEY,
    },
  },
})

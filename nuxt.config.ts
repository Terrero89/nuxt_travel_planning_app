// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
    css: ["@/assets/css/main.css", "bootstrap/dist/css/bootstrap.min.css"],
    app: {
      pageTransition: { name: 'page', mode: 'out-in' }
    },
    
 

    modules: ['@pinia/nuxt', '@nuxt/ui'],
  });
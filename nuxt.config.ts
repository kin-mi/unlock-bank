import { NuxtConfig } from '@nuxt/types'
const WebpackObfuscator = require('webpack-obfuscator')

const config: NuxtConfig = {
  srcDir: 'src',
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'ハッカー専用パズルゲーム | UNLOCK BANK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '貴方はこの銀行をHackできるか。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ハッカー専用パズルゲーム | UNLOCK BANK',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://unlock-bank.vercel.app/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ハッカー専用パズルゲーム | UNLOCK BANK',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '貴方はこの銀行をHackできるか。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://unlock-bank.vercel.app/unlock_ogp.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/css2?family=Candal&display=swap',
        rel: 'stylesheet',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/auth'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-178460555-1',
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-fontawesome'],
  /*
   ** FontAwesome
   */
  fontawesome: {
    component: 'fa',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, { isDev }) {
      if (!isDev) {
        config?.plugins?.push(
          new WebpackObfuscator({
            // JavaScript obfuscator のオプション
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.2,
          })
        )
      }
    },
  },
}

export default config

import { articles } from './app/data/manifest'
const documentRoutes = (['en', 'ru', 'es'] as const).flatMap((locale) =>
  (['v5', 'v4'] as const).flatMap((version) => [
    '/' + locale + '/' + version,
    ...articles.map((a) => '/' + locale + '/' + version + '/' + a.slug),
  ]),
)
export default defineNuxtConfig({
  compatibilityDate: '2026-09-13',
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/eslint'],
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: false },
  typescript: { strict: true },
  components: [{ path: '~/components', pathPrefix: false }],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'ru', language: 'ru-RU', name: 'Русский' },
      { code: 'es', language: 'es-ES', name: 'Español' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  content: {
    build: {
      markdown: {
        highlight: { theme: 'github-dark', langs: ['cpp', 'json', 'bash', 'cmake', 'markdown'] },
      },
    },
  },
  runtimeConfig: {
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || 'https://geode-fieldguide.zhulinskiidanil.chatgpt.site',
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/robots.txt', ...documentRoutes],
      crawlLinks: true,
      failOnError: true,
    },
  },
  app: {
    head: {
      title: 'Geode — Developer documentation',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#101211' }],
    },
  },
})

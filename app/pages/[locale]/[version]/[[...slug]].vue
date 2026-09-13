<script setup lang="ts">
import { articles, sections } from '~/data/manifest'
import { docPath } from '~/utils/docs'

definePageMeta({
  key: (route) => route.path,
  validate: (route) =>
    ['en', 'ru', 'es'].includes(String(route.params.locale)) &&
    ['v5', 'v4'].includes(String(route.params.version)),
})

const { lang, version, slug, link } = useDocs()
const { locale, t } = useI18n()
locale.value = lang.value
const route = useRoute()
const config = useRuntimeConfig()

const article = computed(() => articles.find((a) => a.slug === slug.value))
const section = computed(() => article.value?.section || 'get-started')
const searchOpen = useState('geode-search', () => false),
  mobileOpen = ref(false),
  tocOpen = ref(false)
const completed = ref<string[]>([]),
  contentRoot = ref<HTMLElement>()

const isHome = computed(() => !slug.value && version.value === 'v5')
const isAvailable = computed(() => !!article.value?.versions.includes(version.value))

const { data: loaded } = await useAsyncData('doc:' + route.path, async () => {
  if (!slug.value || !isAvailable.value) return { page: null, fallback: false }
  const page = await queryCollection('docs').path(link(slug.value)).first()
  if (page) return { page, fallback: false }
  return {
    page: await queryCollection('docs')
      .path(docPath('en', version.value, slug.value))
      .first(),
    fallback: lang.value !== 'en',
  }
})

const page = computed(() => loaded.value?.page)
const title = computed(() =>
  isHome.value ? t('overview') : article.value?.title[lang.value] || t('notFound'),
)
const toc = computed(() =>
  isHome.value
    ? [
        { id: 'overview', text: t('overview') },
        { id: 'your-path', text: t('learning') },
        { id: 'quick-access', text: t('quick') },
        { id: 'tutorials', text: t('popular') },
        { id: 'latest', text: t('release') },
      ]
    : page.value?.body.toc?.links.map((x) => ({ id: x.id, text: x.text })) || [],
)
const all = computed(() => articles.filter((a) => a.versions.includes(version.value)))
const index = computed(() => all.value.findIndex((a) => a.slug === slug.value))
const previous = computed(() => all.value[index.value - 1])
const next = computed(() => all.value[index.value + 1])
const description = computed(() => article.value?.description[lang.value] || t('overviewHint'))
const origin = config.public.siteUrl.replace(/\/$/, '')

useSeoMeta({
  title: () => title.value + ' · Geode Docs',
  description: () => description.value,
  ogTitle: () => title.value + ' · Geode Docs',
  ogDescription: () => description.value,
  ogType: 'website',
  ogUrl: () => origin + route.path,
})

useHead(() => ({
  htmlAttrs: { lang: lang.value },
  link: [
    { rel: 'canonical', href: origin + route.path },
    ...(['en', 'ru', 'es'] as const).map((l) => ({
      rel: 'alternate' as const,
      hreflang: l,
      href: origin + docPath(l, version.value, slug.value),
    })),
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: origin + docPath('en', version.value, slug.value),
    },
  ],
}))

function key(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    mobileOpen.value = false
    tocOpen.value = false
  }
}

function mark() {
  completed.value = completed.value.includes(slug.value)
    ? completed.value.filter((x) => x !== slug.value)
    : [...completed.value, slug.value]
  localStorage.setItem('progress:' + version.value, JSON.stringify(completed.value))
}

onMounted(async () => {
  document.addEventListener('keydown', key)
  try {
    completed.value = JSON.parse(localStorage.getItem('progress:' + version.value) || '[]')
  } catch {
    completed.value = []
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && contentRoot.value) {
    const { gsap } = await import('gsap')
    gsap.from(contentRoot.value, { opacity: 0, y: 5, duration: 0.2, clearProps: 'all' })
  }
})

onBeforeUnmount(() => document.removeEventListener('keydown', key))
</script>
<template>
  <a class="skip-link" href="#main">{{ t('docs') }} ↓</a>

  <DocsHeader :section="section" @search="searchOpen = true" @menu="mobileOpen = !mobileOpen" />
  <DocsSidebar :open="mobileOpen" @close="mobileOpen = false" />

  <div class="workspace">
    <main id="main" ref="contentRoot" tabindex="-1">
      <div class="mobile-article-tools">
        <button class="mobile-toc" :aria-label="t('onPage')" @click="tocOpen = !tocOpen">
          <Icon name="list" />{{ t('onPage') }}
        </button>
      </div>

      <DocsCallout v-if="version === 'v4'" type="warning"
        >{{ t('archive') }}
        <NuxtLink :to="link('guide/migration')">{{ t('migration') }} →</NuxtLink></DocsCallout
      >
      <DocsHome v-if="isHome" @search="searchOpen = true" />

      <article v-else-if="page && isAvailable" class="doc-article">
        <div class="article-heading">
          <div class="section-kicker">
            {{ sections.find((s) => s.id === section)?.title[lang] }}
          </div>
          <h1>{{ title }}</h1>
          <p class="article-lead">{{ description }}</p>
          <div class="article-meta">
            <VersionBadge :version="version === 'v5' ? 'v5.10.1' : 'v4 archive'" /><span
              ><Icon name="clock" :size="14" />{{ article?.minutes }} {{ t('minutes') }}</span
            >
          </div>
        </div>
        <DocsCallout v-if="loaded?.fallback">{{ t('fallback') }}</DocsCallout>
        <div class="prose"><ContentRenderer :value="page" /></div>

        <LazyApiBrowser v-if="slug === 'api/classes'" />
        <LazyExamplesBrowser v-if="slug === 'examples/library'" />
        <PublishChecklist v-if="slug === 'publishing/checklist'" />

        <div class="article-completion">
          <button class="button secondary" :aria-pressed="completed.includes(slug)" @click="mark">
            <Icon :name="completed.includes(slug) ? 'complete' : 'check'" />{{
              completed.includes(slug) ? t('done') : t('markDone')
            }}
          </button>
        </div>

        <ArticleFeedback />
        <div class="article-pagination">
          <NuxtLink v-if="previous" :to="link(previous.slug)">
            <span>← {{ t('previous') }}</span>
            <strong>{{ previous.title[lang] }}</strong>
          </NuxtLink>
          <NuxtLink v-if="next" :to="link(next.slug)">
            <span>{{ t('next') }} →</span>
            <strong>{{ next.title[lang] }}</strong>
          </NuxtLink>
        </div>
      </article>

      <div v-else class="not-found">
        <Icon name="compass" :size="40" />
        <h1>{{ version === 'v4' ? t('unavailable') : t('notFound') }}</h1>
        <p>{{ version === 'v4' ? t('archive') : t('overviewHint') }}</p>
        <NuxtLink class="button primary" :to="version === 'v4' ? link('guide/migration') : link()"
          >{{ version === 'v4' ? t('migration') : t('backHome') }}<Icon name="arrow" /></NuxtLink
        ><button class="button secondary" @click="searchOpen = true">
          <Icon name="search" />{{ t('searchDocs') }}
        </button>
      </div>
    </main>

    <aside class="right-sidebar" :class="{ 'is-open': tocOpen }">
      <button
        v-if="tocOpen"
        class="icon-button mobile-only"
        :aria-label="t('close')"
        @click="tocOpen = false"
      >
        <Icon name="close" /></button
      ><OnThisPage :items="toc" />
      <div class="right-community">
        <Icon name="blocks" :size="25" />
        <h3>{{ t('community') }}</h3>

        <a href="https://github.com/geode-sdk/docs" target="_blank" rel="noopener"
          >{{ t('github') }} <Icon name="external" :size="13"
        /></a>
      </div>
      <a class="source-link" href="https://github.com/geode-sdk/docs" target="_blank" rel="noopener"
        ><Icon name="file" :size="14" />{{ t('viewSource') }}<Icon name="external" :size="12"
      /></a>
    </aside>
  </div>

  <ClientOnly><LazySearchPalette v-if="searchOpen" @close="searchOpen = false" /></ClientOnly>
</template>

<script setup lang="ts">
import { sections, versions } from '~/data/manifest'
import { docPath } from '~/utils/docs'
import type { Locale, VersionId } from '~/types/docs'
defineProps<{ section: string }>()
const emit = defineEmits<{ search: []; menu: [] }>()
const { lang, version, slug, link } = useDocs()
const { t } = useI18n()
const ready = useReady()
const theme = useCookie<string>('geode-theme', { default: () => 'dark' })
const savedVersion = useCookie<string>('geode-version')
const savedLanguage = useCookie<string>('geode-language')
function changeLocale(e: Event) {
  const value = (e.target as HTMLSelectElement).value as Locale
  savedLanguage.value = value
  navigateTo(docPath(value, version.value, slug.value))
}
function changeVersion(e: Event) {
  const value = (e.target as HTMLSelectElement).value as VersionId
  savedVersion.value = value
  navigateTo(docPath(lang.value, value, slug.value))
}
</script>
<template>
  <header class="site-header">
    <div class="header-main">
      <button class="icon-button mobile-only" :aria-label="t('menu')" @click="emit('menu')">
        <Icon name="menu" />
      </button>
      <NuxtLink :to="link()" class="brand" aria-label="Geode documentation"
        ><img src="/favicon.svg" width="33" height="33" alt="" /><span
          >geode<span class="brand-dot">.</span></span
        ></NuxtLink
      >
      <span class="header-divider"></span><span class="docs-label">{{ t('docs') }}</span>
      <div class="version-select">
        <select
          :disabled="!ready"
          :value="version"
          :aria-label="t('version')"
          @change="changeVersion"
        >
          <option v-for="v in versions" :key="v.id" :value="v.id">
            {{ v.archived ? 'v4 · ' + t('archiveLabel') : v.label
            }}{{ v.latest ? ' · ' + t('latest') : '' }}
          </option></select
        ><Icon name="down" :size="13" />
      </div>
      <button class="header-search" @click="emit('search')">
        <Icon name="search" :size="16" /><span>{{ t('search') }}</span
        ><kbd>⌘ K</kbd>
      </button>
      <div class="header-actions">
        <div class="language-select">
          <Icon name="globe" :size="16" /><select
            :disabled="!ready"
            :value="lang"
            :aria-label="t('language')"
            @change="changeLocale"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="es">Español</option>
          </select>
        </div>
        <button
          :disabled="!ready"
          class="icon-button"
          :aria-label="t('theme')"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        >
          <Icon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <a
          class="icon-button github-link"
          href="https://github.com/geode-sdk/geode"
          aria-label="GitHub"
          target="_blank"
          rel="noopener"
          ><Icon name="github"
        /></a>
      </div>
    </div>
    <nav class="top-nav" :aria-label="t('docs')">
      <NuxtLink
        v-for="s in sections"
        :key="s.id"
        :to="link(s.slug)"
        :class="{ active: s.id === section }"
        :aria-current="s.id === section ? 'page' : undefined"
        >{{ s.title[lang] }}</NuxtLink
      ><a href="https://geode-sdk.org" target="_blank" rel="noopener" class="geode-web"
        >geode-sdk.org <Icon name="external" :size="13"
      /></a>
    </nav>
  </header>
</template>

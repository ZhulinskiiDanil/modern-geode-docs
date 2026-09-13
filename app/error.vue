<script setup lang="ts">
import { articles } from '~/data/manifest'
import { docPath } from '~/utils/docs'
defineProps<{ error: { statusCode?: number; message?: string } }>()
const { t } = useI18n()
const { lang, version } = useDocs()
const query = ref('')
const results = computed(() =>
  articles.filter(
    (a) =>
      a.versions.includes(version.value) &&
      a.title[lang.value].toLowerCase().includes(query.value.toLowerCase()),
  ),
)
</script>
<template>
  <main class="error-page">
    <img src="/favicon.svg" width="48" alt="Geode" />
    <p>{{ error.statusCode || 404 }}</p>
    <h1>{{ t('notFound') }}</h1>
    <a class="button primary" :href="docPath(lang, version)">{{ t('backHome') }} →</a>
    <div class="filter-bar">
      <label>{{ t('searchDocs') }}<input v-model="query" :placeholder="t('search')" /></label>
    </div>
    <ul>
      <li v-for="a in results" :key="a.slug">
        <a :href="docPath(lang, version, a.slug)">{{ a.title[lang] }}</a>
      </li>
    </ul>
    <p v-if="!results.length">{{ t('empty') }}</p>
  </main>
</template>

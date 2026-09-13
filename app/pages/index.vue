<script setup lang="ts">
const saved = useCookie<string>('geode-version')
const locale = useCookie<string>('geode-language')
onMounted(() =>
  navigateTo(
    '/' +
      (['en', 'ru', 'es'].includes(locale.value || '') ? locale.value : 'en') +
      '/' +
      (saved.value === 'v4' ? 'v4' : 'v5'),
    { replace: true },
  ),
)
</script>
<template>
  <main class="error-page">
    <img src="/favicon.svg" width="48" alt="Geode" />
    <h1>Geode documentation</h1>
    <a href="/en/v5" class="button primary">English →</a>
    <a href="/ru/v5" class="button secondary">Русский →</a>
    <a href="/es/v5" class="button secondary">Español →</a>
  </main>
</template>

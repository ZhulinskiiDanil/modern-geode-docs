<script setup lang="ts">
const theme = useCookie<string>('geode-theme', { default: () => 'dark' })
const searchOpen = useState('geode-search', () => false)
function keyboard(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchOpen.value = !searchOpen.value
  }
}
onMounted(() => document.addEventListener('keydown', keyboard))
onBeforeUnmount(() => document.removeEventListener('keydown', keyboard))
useHead(() => ({ htmlAttrs: { 'data-theme': theme.value } }))
</script>
<template><NuxtPage /><NuxtRouteAnnouncer /></template>

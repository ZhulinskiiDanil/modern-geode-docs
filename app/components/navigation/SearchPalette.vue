<script setup lang="ts">
import { articles } from '~/data/manifest'
import { apiAdapter } from '~/data/api'
import { searchDocs } from '~/utils/docs'
import type { SearchResult } from '~/types/docs'
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const { lang, version, link } = useDocs()
const query = ref(''),
  selected = ref(0),
  recent = ref<string[]>([]),
  input = ref<HTMLInputElement>(),
  dialog = ref<HTMLElement>()
const {
  data: pages,
  status,
  error,
} = useAsyncData('search:' + lang.value + ':' + version.value, () =>
  queryCollection('docs')
    .where('path', 'LIKE', '/' + lang.value + '/' + version.value + '/%')
    .all(),
)
function extract(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(extract).join(' ')
  if (value && typeof value === 'object') return Object.values(value).map(extract).join(' ')
  return ''
}
const index = computed<SearchResult[]>(() => [
  ...articles
    .filter((a) => a.versions.includes(version.value))
    .map((a) => ({
      title: a.title[lang.value],
      description:
        a.description[lang.value] +
        ' ' +
        (a.keywords?.[lang.value] || '') +
        ' ' +
        extract(pages.value?.find((p) => p.path.endsWith('/' + a.slug))?.body),
      slug: a.slug,
      section: a.section,
      locale: lang.value,
      version: version.value,
    })),
  ...apiAdapter.getSymbols(version.value).map((s) => ({
    title: s.name,
    description: s.description[lang.value],
    slug: 'api/classes#' + s.id,
    section: 'api' as const,
    locale: lang.value,
    version: version.value,
  })),
])
const results = computed(() =>
  searchDocs(index.value, query.value, lang.value, version.value).slice(0, 12),
)
watch(query, () => (selected.value = 0))
function choose(result: SearchResult) {
  if (query.value.trim()) {
    recent.value = [
      query.value.trim(),
      ...recent.value.filter((x) => x !== query.value.trim()),
    ].slice(0, 5)
    localStorage.setItem('search:' + lang.value + ':' + version.value, JSON.stringify(recent.value))
  }
  navigateTo(link(result.slug))
  emit('close')
}
function key(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selected.value = (selected.value + 1) % Math.max(results.value.length, 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    selected.value = (selected.value - 1 + results.value.length) % Math.max(results.value.length, 1)
  }
  if (e.key === 'Enter' && results.value[selected.value]) {
    e.preventDefault()
    choose(results.value[selected.value]!)
  }
  if (e.key === 'Tab') {
    const nodes = dialog.value?.querySelectorAll<HTMLElement>('button,input,[tabindex="0"]')
    if (nodes?.length) {
      const first = nodes[0],
        last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
  }
}
function parts(text: string) {
  const q = query.value.trim().toLowerCase()
  const i = q ? text.toLowerCase().indexOf(q) : -1
  return i < 0
    ? [text, '', '']
    : [text.slice(0, i), text.slice(i, i + q.length), text.slice(i + q.length)]
}
let focusBefore: Element | null = null
onMounted(async () => {
  focusBefore = document.activeElement
  try {
    recent.value = JSON.parse(
      localStorage.getItem('search:' + lang.value + ':' + version.value) || '[]',
    )
  } catch {
    recent.value = []
  }
  input.value?.focus()
  document.body.style.overflow = 'hidden'
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const { gsap } = await import('gsap')
    gsap.from(dialog.value!, { y: 10, opacity: 0, duration: 0.16 })
  }
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  ;(focusBefore as HTMLElement)?.focus?.()
})
</script>
<template>
  <div class="palette-overlay" @mousedown.self="emit('close')">
    <section
      ref="dialog"
      class="palette"
      role="dialog"
      aria-modal="true"
      :aria-label="t('searchDocs')"
      @keydown="key"
    >
      <div class="palette-input">
        <Icon name="search" :size="21" /><input
          ref="input"
          v-model="query"
          :placeholder="t('search')"
          :aria-label="t('searchDocs')"
          role="combobox"
          aria-controls="search-results"
          aria-expanded="true"
          :aria-activedescendant="results.length ? 'result-' + selected : undefined"
        /><button class="icon-button" :aria-label="t('close')" @click="emit('close')">
          <kbd>Esc</kbd>
        </button>
      </div>
      <div class="search-context">
        {{ lang.toUpperCase() }} <span>/</span>
        {{ version === 'v5' ? 'Geode v5.10.1' : 'Geode v4 archive' }}
      </div>
      <div v-if="!query && recent.length" class="recent-searches">
        <p>{{ t('recent') }}</p>
        <button v-for="r in recent" :key="r" @click="query = r">{{ r }}</button>
      </div>
      <p v-if="error" class="search-status" role="status">{{ t('searchError') }}</p>
      <p v-else-if="status === 'pending'" class="search-status" role="status">{{ t('loading') }}</p>
      <div id="search-results" class="search-results" role="listbox">
        <template v-for="(r, i) in results" :key="r.slug"
          ><div v-if="i === 0 || results[i - 1]?.section !== r.section" class="search-group-label">
            {{ r.section }}
          </div>
          <button
            :id="'result-' + i"
            role="option"
            :aria-selected="selected === i"
            :class="{ selected: selected === i }"
            @mousemove="selected = i"
            @click="choose(r)"
          >
            <Icon :name="r.section === 'api' ? 'braces' : 'file'" /><span
              >{{ parts(r.title)[0] }}<mark>{{ parts(r.title)[1] }}</mark
              >{{ parts(r.title)[2] }}</span
            ><Icon name="arrow" :size="15" /></button
        ></template>
        <p v-if="!results.length" class="empty-state">{{ t('empty') }}</p>
      </div>
      <footer>
        <span><kbd>↑</kbd><kbd>↓</kbd> {{ t('navigate') }}</span
        ><span><kbd>↵</kbd> {{ t('open') }}</span>
      </footer>
    </section>
  </div>
</template>

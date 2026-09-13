<script setup lang="ts">
import type { Locale } from '~/types/docs'
import { docPath } from '~/utils/docs'
const { lang, version, slug } = useDocs()
const { t } = useI18n()
const ready = useReady()
const savedLanguage = useCookie<string>('geode-language')
const languages = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Русский' },
  { id: 'es', name: 'Español' },
] as const
const open = ref(false)
const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const menuId = useId()
async function show() {
  open.value = true
  await nextTick()
  const buttons = menu.value?.querySelectorAll<HTMLButtonElement>('button')
  buttons?.[languages.findIndex((l) => l.id === lang.value)]?.focus()
}
function close(restore = false) {
  open.value = false
  if (restore) trigger.value?.focus()
}
function toggle() {
  if (open.value) close(true)
  else show()
}
function choose(value: Locale) {
  savedLanguage.value = value
  close(true)
  if (value !== lang.value) navigateTo(docPath(value, version.value, slug.value))
}
function key(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close(true)
    return
  }
  const buttons = Array.from(menu.value?.querySelectorAll<HTMLButtonElement>('button') || [])
  const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
  let target = -1
  if (event.key === 'ArrowDown') target = (current + 1) % buttons.length
  if (event.key === 'ArrowUp') target = (current - 1 + buttons.length) % buttons.length
  if (event.key === 'Home') target = 0
  if (event.key === 'End') target = buttons.length - 1
  if (target >= 0) {
    event.preventDefault()
    buttons[target]?.focus()
  }
}
function outside(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) close()
}
function focusout(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node)) close()
}
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside))
</script>
<template>
  <div ref="root" class="language-menu" @focusout="focusout">
    <button
      ref="trigger"
      class="language-trigger"
      :disabled="!ready"
      :aria-label="t('language')"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
      @click="toggle"
      @keydown.down.prevent="show"
      @keydown.up.prevent="show"
    >
      <Icon name="globe" :size="17" /><span>{{ languages.find((l) => l.id === lang)?.name }}</span
      ><Icon name="down" :size="13" />
    </button>
    <div
      v-if="open"
      :id="menuId"
      ref="menu"
      class="language-popover"
      role="menu"
      :aria-label="t('language')"
      @keydown="key"
    >
      <div class="language-menu-title">{{ t('language') }}</div>
      <button
        v-for="language in languages"
        :key="language.id"
        role="menuitemradio"
        :aria-checked="lang === language.id"
        :lang="language.id"
        @click="choose(language.id)"
      >
        <span class="language-code" aria-hidden="true">{{ language.id.toUpperCase() }}</span
        ><span>{{ language.name }}</span
        ><Icon v-if="lang === language.id" name="check" :size="16" />
      </button>
    </div>
  </div>
</template>

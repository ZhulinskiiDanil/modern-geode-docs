<script setup lang="ts">
const props = withDefaults(
  defineProps<{ code: string; language?: string; filename?: string; highlight?: number[] }>(),
  { language: 'cpp', filename: '', highlight: () => [] },
)
const { t } = useI18n()
const copied = ref(false),
  failed = ref(false)
const html = ref('')
const ready = useReady()
let revision = 0
async function highlightCode() {
  const current = ++revision
  try {
    const { highlight } = await import('~/utils/highlight')
    const result = await highlight(props.code, props.language, props.highlight)
    if (current === revision) html.value = result
  } catch {
    html.value = ''
  }
}
onMounted(highlightCode)
watch(() => props.code, highlightCode)
async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    failed.value = true
  }
}
</script>
<template>
  <div class="code-block">
    <div class="code-top">
      <span><Icon name="file" :size="14" />{{ filename || language }}</span
      ><button :disabled="!ready" @click="copy">
        <Icon :name="copied ? 'check' : 'copy'" :size="14" />{{ copied ? t('copied') : t('copy') }}
      </button>
    </div>
    <div v-if="html" class="highlighted-code" v-html="html"></div>
    <pre
      v-else
    ><code><span v-for="(line,i) in code.split('\n')" :key="i" class="line">{{line}}</span></code></pre>
    <p v-if="failed" role="status">{{ t('copyError') }}</p>
  </div>
</template>

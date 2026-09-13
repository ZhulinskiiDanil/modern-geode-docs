<script setup lang="ts">
const props = withDefaults(
  defineProps<{ code?: string; language?: string; filename?: string; highlights?: number[] }>(),
  { code: '', language: 'text', filename: '', highlights: () => [] },
)
const { t } = useI18n()
const copied = ref(false),
  failed = ref(false)
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
      ><button @click="copy">
        <Icon :name="copied ? 'check' : 'copy'" :size="14" />{{ copied ? t('copied') : t('copy') }}
      </button>
    </div>
    <pre :class="$attrs.class"><slot/></pre>
    <span v-if="failed" role="status">{{ t('copyError') }}</span>
  </div>
</template>

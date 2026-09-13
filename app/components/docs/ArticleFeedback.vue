<script setup lang="ts">
const { t } = useI18n()
const { version, slug } = useDocs()
const answer = ref('')
onMounted(
  () => (answer.value = localStorage.getItem('feedback:' + version.value + ':' + slug.value) || ''),
)
function vote(value: string) {
  answer.value = value
  localStorage.setItem('feedback:' + version.value + ':' + slug.value, value)
}
</script>
<template>
  <div class="feedback">
    <span>{{ answer ? t('thanks') : t('feedback') }}</span
    ><template v-if="!answer"
      ><button @click="vote('yes')">{{ t('yes') }}</button
      ><button @click="vote('no')">{{ t('no') }}</button></template
    >
  </div>
</template>

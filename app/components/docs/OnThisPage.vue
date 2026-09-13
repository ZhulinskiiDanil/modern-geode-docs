<script setup lang="ts">
const props = defineProps<{ items: { id: string; text: string }[] }>()
const { t } = useI18n()
const active = ref('')
let observer: IntersectionObserver | undefined
function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    { rootMargin: '-120px 0px -65% 0px' },
  )
  props.items.forEach((i) => {
    const el = document.getElementById(i.id)
    if (el) observer?.observe(el)
  })
}
onMounted(observe)
watch(
  () => props.items,
  async () => {
    await nextTick()
    observe()
  },
)
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <nav class="toc" :aria-label="t('onPage')">
    <h2>{{ t('onPage') }}</h2>
    <a
      v-for="item in items"
      :key="item.id"
      :href="'#' + item.id"
      :class="{ active: active === item.id }"
      >{{ item.text }}</a
    >
  </nav>
</template>

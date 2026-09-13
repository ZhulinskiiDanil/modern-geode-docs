<script setup lang="ts">
import { tr } from '~/data/manifest'
const { t } = useI18n()
const { lang, version } = useDocs()
const checked = ref<number[]>([])
const ready = useReady()
const items = [
  tr(
    'Metadata matches the built SDK, game and platforms',
    'Metadata соответствует SDK, игре и платформам',
    'Los metadatos coinciden con SDK, juego y plataformas',
  ),
  tr(
    'Version is incremented and dependencies are declared',
    'Версия повышена, зависимости указаны',
    'Versión incrementada y dependencias declaradas',
  ),
  tr(
    'Resources, icon, about.md and changelog are included',
    'Ресурсы, иконка, about.md и changelog включены',
    'Recursos, icono, about.md y changelog incluidos',
  ),
  tr(
    'Source and support links are accessible',
    'Ссылки на исходники и поддержку работают',
    'Enlaces de código y soporte accesibles',
  ),
  tr(
    'A clean install and each claimed platform have been tested',
    'Проверены чистая установка и все заявленные платформы',
    'Instalación limpia y plataformas declaradas probadas',
  ),
  tr(
    'Compatibility with related mods has been checked',
    'Проверена совместимость с похожими модами',
    'Compatibilidad con otros mods comprobada',
  ),
  tr(
    'Current index guidelines have been reviewed',
    'Актуальные правила каталога изучены',
    'Normas actuales del índice revisadas',
  ),
  tr(
    'An immutable release package is available',
    'Подготовлен неизменяемый пакет релиза',
    'Paquete de versión inmutable disponible',
  ),
]
onMounted(() => {
  try {
    checked.value = JSON.parse(localStorage.getItem('publish:' + version.value) || '[]')
  } catch {
    checked.value = []
  }
})
function save() {
  localStorage.setItem('publish:' + version.value, JSON.stringify(checked.value))
}
function reset() {
  checked.value = []
  save()
}
</script>
<template>
  <section class="publish-checklist">
    <div class="section-heading">
      <h2>{{ t('checklist') }}</h2>
      <span class="badge">{{ checked.length }} / {{ items.length }}</span>
    </div>
    <progress :value="checked.length" :max="items.length" :aria-label="t('progress')"></progress
    ><label v-for="(item, i) in items" :key="i" :class="{ checked: checked.includes(i) }"
      ><input
        v-model="checked"
        :disabled="!ready"
        type="checkbox"
        :value="i"
        @change="save"
      /><span>{{ item[lang] }}</span></label
    >
    <div class="checklist-footer">
      <span>{{ t('localSave') }}</span
      ><button @click="reset">
        {{ t('reset') }}
      </button>
    </div>
  </section>
</template>

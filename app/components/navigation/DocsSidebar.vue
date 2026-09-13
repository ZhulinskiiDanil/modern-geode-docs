<script setup lang="ts">
import { articles, sections, tr } from '~/data/manifest'
import { projectTree } from '~/utils/project-tree'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const panel = ref<HTMLElement>()
useFocusTrap(panel, toRef(props, 'open'))
const { lang, version, slug, link } = useDocs()
const section = computed(() =>
  sections.find((s) => s.id === (slug.value.split('/')[0] || 'get-started')),
)
const isProject = computed(() => section.value?.id === 'structure' && version.value === 'v5')
const projectNodes = computed(() => projectTree(articles, version.value))
const sectionArticles = computed(() =>
  articles.filter((a) => a.section === section.value?.id && a.versions.includes(version.value)),
)
</script>
<template>
  <button
    v-if="open"
    class="drawer-backdrop"
    :aria-label="t('close')"
    @click="emit('close')"
  ></button>
  <aside
    ref="panel"
    :role="open ? 'dialog' : undefined"
    :aria-modal="open || undefined"
    :aria-label="t('menu')"
    class="sidebar"
    :class="{ 'is-open': open }"
  >
    <button
      class="drawer-close icon-button mobile-only"
      :aria-label="t('close')"
      @click="emit('close')"
    >
      <Icon name="close" />
    </button>
    <nav
      v-if="isProject"
      class="project-navigation"
      :aria-label="tr('Project files', 'Файлы проекта', 'Archivos del proyecto')[lang]"
    >
      <ul class="project-nav-list">
        <ProjectNavItem
          v-for="node in projectNodes"
          :key="node.path"
          :node="node"
          @navigate="emit('close')"
        />
      </ul>
    </nav>
    <nav v-else class="section-navigation" :aria-label="section?.title[lang] || t('docs')">
      <NuxtLink
        v-for="a in sectionArticles"
        :key="a.slug"
        :to="link(a.slug)"
        :aria-current="slug === a.slug ? 'page' : undefined"
        @click="emit('close')"
      >
        <Icon :name="a.icon" :size="18" /><span>{{ a.title[lang] }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

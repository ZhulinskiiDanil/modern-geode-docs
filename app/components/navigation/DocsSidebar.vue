<script setup lang="ts">
import { articles, sections, tr } from '~/data/manifest'
import { projectTree } from '~/utils/project-tree'
import { navigationTree } from '~/utils/docs'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const panel = ref<HTMLElement>()
useFocusTrap(panel, toRef(props, 'open'))
const { lang, version, slug, link } = useDocs()
const section = computed(() => sections.find((s) => s.id === slug.value.split('/')[0]))
const isProject = computed(() => section.value?.id === 'structure' && version.value === 'v5')
const projectNodes = computed(() => projectTree(articles, version.value))
const collapsed = ref<string[]>([])
const groups = computed(() =>
  navigationTree(
    articles.filter((a) => !slug.value || a.section === slug.value.split('/')[0]),
    lang.value,
    version.value,
  ),
)
function toggle(label: string) {
  collapsed.value = collapsed.value.includes(label)
    ? collapsed.value.filter((x) => x !== label)
    : [...collapsed.value, label]
}
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
    <NuxtLink
      class="sidebar-overview"
      :class="{ active: !slug }"
      :to="link()"
      @click="emit('close')"
      ><Icon name="compass" />{{ t('overview') }}</NuxtLink
    >
    <div v-if="section" class="sidebar-section-label">{{ section.title[lang] }}</div>
    <nav
      v-if="isProject"
      class="project-navigation"
      :aria-label="tr('Project files', 'Файлы проекта', 'Archivos del proyecto')[lang]"
    >
      <NuxtLink
        :to="link('structure/project')"
        class="project-nav-root"
        :class="{ active: slug === 'structure/project' }"
        :aria-current="slug === 'structure/project' ? 'page' : undefined"
        @click="emit('close')"
        ><Icon name="box" :size="17" /><span>hello-geode/</span></NuxtLink
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
    <template v-else>
      <div v-for="group in groups" :key="group.label" class="nav-group">
        <button
          class="nav-group-title"
          :aria-expanded="!collapsed.includes(group.label)"
          @click="toggle(group.label)"
        >
          {{ group.label
          }}<Icon :name="collapsed.includes(group.label) ? 'right' : 'down'" :size="12" />
        </button>
        <div v-show="!collapsed.includes(group.label)" class="nav-group-items">
          <NuxtLink
            v-for="a in group.children"
            :key="a.slug"
            :to="link(a.slug)"
            :class="{ active: slug === a.slug }"
            @click="emit('close')"
            ><Icon :name="a.icon" :size="16" /><span>{{ a.title[lang] }}</span></NuxtLink
          >
        </div>
      </div>
    </template>
    <div class="sidebar-help">
      <Icon name="help" /><strong>{{ t('needHelp') }}</strong>
      <p>{{ t('helpText') }}</p>
      <a href="https://github.com/geode-sdk/geode/discussions" target="_blank" rel="noopener"
        >GitHub Discussions <Icon name="external" :size="13"
      /></a>
    </div>
    <div class="sidebar-bottom">
      <span class="status-dot"></span> Geode SDK v5.10.1
      <span class="subtle">{{ t('stable') }}</span>
    </div>
  </aside>
</template>

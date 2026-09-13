<script setup lang="ts">
import type { ProjectTreeNode } from '~/types/docs'
import { tr } from '~/data/manifest'
const props = defineProps<{ node: ProjectTreeNode }>()
const emit = defineEmits<{ navigate: [] }>()
const { slug, link, lang } = useDocs()
const expanded = useState<string[]>('project-folders', () => ['src/'])
const isOpen = computed(() => expanded.value.includes(props.node.path))
const active = computed(() => props.node.slug === slug.value)
const containsActive = computed(() => props.node.children.some((n) => n.slug === slug.value))
watch(
  containsActive,
  (value) => {
    if (value && !isOpen.value) expanded.value.push(props.node.path)
  },
  { immediate: true },
)
function toggle() {
  expanded.value = isOpen.value
    ? expanded.value.filter((p) => p !== props.node.path)
    : [...expanded.value, props.node.path]
}
const toggleLabel = computed(
  () =>
    (isOpen.value
      ? tr('Collapse', 'Свернуть', 'Contraer')
      : tr('Expand', 'Развернуть', 'Expandir'))[lang.value] +
    ' ' +
    props.node.name,
)
</script>
<template>
  <li class="project-nav-item">
    <div class="project-nav-row" :class="{ active, 'has-active-child': containsActive }">
      <button
        v-if="node.children.length"
        class="project-disclosure"
        :aria-label="toggleLabel"
        :aria-expanded="isOpen"
        @click="toggle"
      >
        <Icon :name="isOpen ? 'down' : 'right'" :size="12" />
      </button>
      <span v-else class="project-disclosure-space"></span>
      <NuxtLink
        v-if="node.slug"
        :to="link(node.slug)"
        :aria-current="active ? 'page' : undefined"
        @click="emit('navigate')"
      >
        <Icon :name="node.directory ? 'folder' : 'file'" :size="16" /><span>{{ node.name }}</span>
      </NuxtLink>
      <span v-else class="project-folder-label"
        ><Icon name="folder" :size="16" />{{ node.name }}</span
      >
    </div>
    <ul v-if="node.children.length" v-show="isOpen" class="project-nav-children">
      <ProjectNavItem
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        @navigate="emit('navigate')"
      />
    </ul>
  </li>
</template>

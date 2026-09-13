<script setup lang="ts">
const props = defineProps<{ tabs: string[] }>()
const selected = ref(0)
const groupId = useId()
const group = ref<HTMLElement>()
async function move(delta: number) {
  if (!props.tabs.length) return
  selected.value = (selected.value + delta + props.tabs.length) % props.tabs.length
  await nextTick()
  group.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[selected.value]?.focus()
}
</script>
<template>
  <div ref="group" class="code-group">
    <div
      class="tabs"
      role="tablist"
      @keydown.right.prevent="move(1)"
      @keydown.left.prevent="move(-1)"
    >
      <button
        v-for="(tab, i) in tabs"
        :id="groupId + '-tab-' + i"
        :key="tab"
        role="tab"
        :aria-controls="groupId + '-panel'"
        :aria-selected="selected === i"
        :tabindex="selected === i ? 0 : -1"
        @click="selected = i"
      >
        {{ tab }}
      </button>
    </div>
    <div :id="groupId + '-panel'" role="tabpanel" :aria-labelledby="groupId + '-tab-' + selected">
      <slot :name="'tab-' + selected" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title?: string; type?: string }>(), { type: 'info', title: '' })
</script>
<template>
  <aside class="callout" :class="type">
    <Icon :name="type === 'warning' ? 'help' : 'sparkles'" />
    <div>
      <strong v-if="title">{{ title }}</strong
      ><slot />
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ version?: string }>()
</script>
<template>
  <span class="badge">{{ version || 'v5.10.1' }}</span>
</template>

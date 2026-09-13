<script setup lang="ts">
defineProps<{ platform: string }>()
</script>
<template>
  <span class="badge neutral">{{ platform }}</span>
</template>

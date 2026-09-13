<script setup lang="ts">
defineProps<{ signature: string }>()
</script>

<!-- prettier-ignore -->
<template>
  <CodeBlock
    :code="signature"
    language="cpp"
    filename="signature"
  />
</template>

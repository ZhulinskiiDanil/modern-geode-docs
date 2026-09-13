<script setup lang="ts">
defineProps<{ signature: string }>()
</script>
<template><CodeBlock :code="signature" language="cpp" filename="signature" /></template>

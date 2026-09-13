/** Disable state-changing controls until Vue has attached their handlers. */
export function useReady() {
  const ready = ref(false)
  onMounted(() => {
    ready.value = true
  })
  return ready
}

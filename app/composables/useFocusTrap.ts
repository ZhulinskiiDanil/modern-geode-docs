import type { Ref } from 'vue'
export function useFocusTrap(element: Ref<HTMLElement | undefined>, opened: Ref<boolean>) {
  let previous: HTMLElement | null = null
  let oldOverflow = ''
  function key(e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    const elements = element.value?.querySelectorAll<HTMLElement>(
      'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]',
    )
    if (!elements?.length) return
    const first = elements[0],
      last = elements[elements.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last?.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
  }
  function cleanup() {
    document.removeEventListener('keydown', key)
    document.body.style.overflow = oldOverflow
    previous?.focus()
  }
  watch(opened, async (value) => {
    if (!import.meta.client) return
    if (value) {
      previous = document.activeElement as HTMLElement
      oldOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      await nextTick()
      element.value?.querySelector<HTMLElement>('button,a')?.focus()
      document.addEventListener('keydown', key)
    } else cleanup()
  })
  onBeforeUnmount(() => {
    if (opened.value) cleanup()
  })
}

import type { Locale, VersionId } from '~/types/docs'
import { docPath } from '~/utils/docs'
export function useDocs() {
  const route = useRoute()
  const lang = computed<Locale>(() =>
    ['en', 'ru', 'es'].includes(String(route.params.locale))
      ? (route.params.locale as Locale)
      : 'en',
  )
  const version = computed<VersionId>(() => (route.params.version === 'v4' ? 'v4' : 'v5'))
  const slug = computed(() =>
    Array.isArray(route.params.slug)
      ? route.params.slug.join('/')
      : String(route.params.slug || ''),
  )
  const link = (path = '') => docPath(lang.value, version.value, path)
  return { lang, version, slug, link }
}

import type {
  Article,
  Example,
  Locale,
  VersionId,
  ApiSymbol,
  SearchResult,
  NavigationNode,
} from '../types/docs'
export function docPath(locale: Locale, version: VersionId, slug = '') {
  return `/${locale}/${version}${slug ? '/' + slug : ''}`
}
export function resolveLocale(available: Locale[], requested: Locale): Locale {
  return available.includes(requested) ? requested : 'en'
}
export function navigationTree(
  items: Article[],
  locale: Locale,
  version: VersionId,
): NavigationNode[] {
  const groups = new Map<string, Article[]>()
  for (const item of items.filter((a) => a.versions.includes(version))) {
    const key = item.group[locale]
    groups.set(key, [...(groups.get(key) || []), item])
  }
  return Array.from(groups, ([label, children]) => ({ label, children }))
}
export function searchDocs(
  items: SearchResult[],
  query: string,
  locale: Locale,
  version: VersionId,
) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  return items.filter(
    (x) =>
      x.locale === locale &&
      x.version === version &&
      terms.every((t) => (x.title + ' ' + x.description).toLocaleLowerCase().includes(t)),
  )
}
export function filterExamples(
  items: Example[],
  filters: { difficulty?: string; topic?: string; platform?: string; version: VersionId },
) {
  return items.filter(
    (x) =>
      x.versions.includes(filters.version) &&
      (!filters.difficulty || x.difficulty === filters.difficulty) &&
      (!filters.topic || x.topic === filters.topic) &&
      (!filters.platform || x.platforms.includes(filters.platform)),
  )
}
export function isDeprecated(symbol: ApiSymbol, version: VersionId) {
  return (
    !!symbol.deprecatedSince && Number(version.slice(1)) >= Number(symbol.deprecatedSince.slice(1))
  )
}

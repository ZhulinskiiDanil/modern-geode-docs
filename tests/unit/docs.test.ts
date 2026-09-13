import { describe, it, expect } from 'vitest'
import {
  docPath,
  resolveLocale,
  navigationTree,
  searchDocs,
  filterExamples,
  isDeprecated,
} from '../../app/utils/docs'
import { articles, examples } from '../../app/data/manifest'
import { symbols } from '../../app/data/api'
import type { ApiSymbol, SearchResult } from '../../app/types/docs'
describe('version routing', () => {
  it('preserves article and language when changing versions', () => {
    expect(docPath('ru', 'v4', 'guide/migration')).toBe('/ru/v4/guide/migration')
    expect(docPath('ru', 'v5', 'guide/migration')).toBe('/ru/v5/guide/migration')
  })
  it('does not add a trailing slash to home', () => expect(docPath('es', 'v5')).toBe('/es/v5'))
})
describe('locale fallback', () => {
  it('uses requested translation when present', () =>
    expect(resolveLocale(['en', 'es'], 'es')).toBe('es'))
  it('falls back to English for missing translations', () =>
    expect(resolveLocale(['en'], 'ru')).toBe('en'))
})
describe('navigation tree', () => {
  it('includes every supported article exactly once', () => {
    const slugs = navigationTree(articles, 'en', 'v5').flatMap((g) => g.children.map((a) => a.slug))
    expect(new Set(slugs).size).toBe(articles.length)
  })
  it('keeps v5 content out of the v4 archive', () =>
    expect(
      navigationTree(articles, 'ru', 'v4').flatMap((g) => g.children.map((a) => a.slug)),
    ).toEqual(['guide/migration']))
})
describe('search isolation', () => {
  const rows: SearchResult[] = [
    {
      title: 'First mod',
      description: 'Menu button',
      slug: 'first',
      section: 'get-started',
      locale: 'en',
      version: 'v5',
    },
    {
      title: 'First mod',
      description: 'Menu button',
      slug: 'old',
      section: 'get-started',
      locale: 'en',
      version: 'v4',
    },
    {
      title: 'Первый мод',
      description: 'Кнопка',
      slug: 'ru',
      section: 'get-started',
      locale: 'ru',
      version: 'v5',
    },
  ]
  it('never returns another version or locale', () =>
    expect(searchDocs(rows, 'mod', 'en', 'v5').map((x) => x.slug)).toEqual(['first']))
  it('searches body text case insensitively', () =>
    expect(searchDocs(rows, 'MENU button', 'en', 'v5')).toHaveLength(1))
  it('returns empty results for unmatched terms', () =>
    expect(searchDocs(rows, 'network', 'en', 'v5')).toHaveLength(0))
})
describe('example filters', () => {
  it('combines difficulty, platform, topic and version', () =>
    expect(
      filterExamples(examples, {
        difficulty: 'intermediate',
        topic: 'Networking',
        platform: 'Android',
        version: 'v5',
      }).map((x) => x.id),
    ).toEqual(['async']))
  it('does not show v5 examples in v4', () =>
    expect(filterExamples(examples, { version: 'v4' })).toEqual([]))
})
describe('deprecated API', () => {
  it('does not label current symbols as deprecated', () =>
    expect(symbols.some((s) => isDeprecated(s, 'v5'))).toBe(false))
  it('applies the deprecation boundary, using a test-only fixture', () => {
    const fixture: ApiSymbol = {
      ...symbols[0]!,
      deprecatedSince: 'v5',
      replacement: 'test replacement',
    }
    expect(isDeprecated(fixture, 'v4')).toBe(false)
    expect(isDeprecated(fixture, 'v5')).toBe(true)
  })
})

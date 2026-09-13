export type Locale = 'en' | 'ru' | 'es'
export type VersionId = 'v5' | 'v4'
export type Section = 'get-started' | 'structure' | 'guide' | 'api' | 'publishing' | 'examples'
export type Localized = Record<Locale, string>
export interface SdkVersion {
  id: VersionId
  label: string
  latest: boolean
  archived: boolean
}
export interface PlatformAvailability {
  platforms: string[]
  versions: VersionId[]
}
export interface MigrationNotice {
  from: VersionId
  to: VersionId
  href: string
  message: Localized
}
export interface Article {
  slug: string
  section: Section
  title: Localized
  description: Localized
  minutes: number
  group: Localized
  icon: string
  versions: VersionId[]
}
export interface NavigationNode {
  label: string
  children: Article[]
}
export interface SearchResult {
  title: string
  description: string
  slug: string
  section: Section
  locale: Locale
  version: VersionId
}
export interface Example extends PlatformAvailability {
  id: string
  title: Localized
  description: Localized
  difficulty: 'beginner' | 'intermediate'
  topic: string
  slug: string
}
export interface ApiSymbol extends PlatformAvailability {
  id: string
  name: string
  namespace: string
  kind: 'class' | 'function' | 'macro'
  signature: string
  description: Localized
  source: string
  deprecatedSince?: VersionId
  replacement?: string
  parameters: string
  returns: string
  example: string
}
export interface ApiAdapter {
  getSymbols(version: VersionId): ApiSymbol[]
}

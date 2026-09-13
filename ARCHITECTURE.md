# Geode Fieldguide

## Sitemap

- /{en,ru,es}/v5 — documentation workspace and personalized learning path
- /{locale}/v5/get-started/{introduction,installation,cpp-primer,first-mod}
- /{locale}/v5/structure/project
- /{locale}/v5/guide/{hooks,ui,data,async,migration}
- /{locale}/v5/api/classes — curated source-backed API browser
- /{locale}/v5/publishing/checklist
- /{locale}/v5/examples/library
- /{locale}/v4 — archived branch, separate migration content
- /{locale}/v4/guide/migration

## Version policy

v5 is pinned to 5.10.1, verified against GitHub releases on 2026-09-13. v4 is explicitly archived, not claimed to be maintained upstream. URL is authoritative. Persisted preference is used at the root only. Unsupported archive pages show a version-specific unavailable state and migration link; never silently display v5 examples. English fallback happens within the selected version only.

## Architecture

Nuxt 4 SSR and static generation; Vue Composition API and strict TypeScript. Nuxt Content owns Markdown compilation and Shiki syntax highlighting. Nuxt i18n supplies UI messages with explicit locale/version route segments. A single typed manifest supplies sidebar, search metadata, related links, sitemap, and route generation. Search indexes rendered text from the selected Content branch; a curated API adapter supplies real symbols with pinned source URLs. No Pinia: cookies store theme/version and localStorage stores per-version checklist/progress.

## Design system

Graphite #101211, elevated #181b18, muted border #2b302a, primary lime #bbf562, readable text #edf0e8. Light theme uses ivory-white surfaces with dark green text. 8px spacing rhythm; restrained 8–14px radii; system sans and monospace code. 72px header, 224px navigation, flexible reading column, 190px contextual sidebar. Icons are Lucide, not a UI library. Short GSAP transitions honor reduced motion.

## Source policy

Original prose based on official geode-sdk/docs, geode-sdk/geode v5.10.1 and example-mod. Sources appear within content. API data is a deliberately limited curated reference, not fabricated generated coverage. Latest upstream changes need manual review before updating data/versions.

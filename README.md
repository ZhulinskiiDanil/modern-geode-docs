# Geode Fieldguide

A multilingual developer documentation site built with **Nuxt 4, Vue 3 Composition API, strict TypeScript, SCSS, Nuxt i18n, Nuxt Content, Shiki and GSAP**. There is no UI library and no Pinia.

## Run locally

Use Node 24 LTS (24.15 or newer recommended) and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000/en/v5. Russian and Spanish are at /ru/v5 and /es/v5.

```bash
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
npm run build
npm run preview
npm run generate
```

The Node SSR build is in .output/server. Static generation writes .output/public. Set NUXT_PUBLIC_SITE_URL before building for a different deployment origin. Do not run production builds and browser tests against the same development server concurrently.

## Included pages

Each of these 21 articles has independently written English, Russian and Spanish content:

| Section     | Routes after /{locale}/v5                                     |
| ----------- | ------------------------------------------------------------- |
| Get Started | get-started/introduction, installation, cpp-primer, first-mod |
| Architecture | structure/project, src, src/main-cpp, resources, mod-json, cmake, about, changelog, build |
| Guide       | guide/hooks, ui, data, async, migration                       |
| API         | api/classes                                                   |
| Publishing  | publishing/checklist                                          |
| Examples    | examples/library                                              |

There are also three localized workspace homepages and three v4 archive migration pages. The first-mod tutorial includes a complete menu button and alert, prerequisites, dependency requirements, source placement, build/install steps, expected behavior and troubleshooting.

## Architecture

- app/data/manifest.ts is the single source for navigation, article metadata, example discovery and generated routes.
- content/{en,ru,es}/{v5,v4} contains 66 Markdown files. Nuxt Content renders them with build-time Shiki highlighting.
- Architecture uses a persistent project tree in the left sidebar. Folder disclosures and file links are separate controls; each project item has a localized article URL and active state.
- URL locale and version are authoritative. Missing translations fall back to English **within the same version**.
- v5 targets SDK **5.10.1**. v4 is explicitly an archive, with migration content only; unavailable archive articles never silently show v5 code.
- app/data/api.ts implements the typed ApiAdapter with a curated set of real symbols linked to pinned headers. It is intentionally not represented as a complete generated API.
- Search combines translated manifest entries, article body text and API names, isolated by locale and version. Ctrl/Cmd+K, arrows, Enter and Escape are supported.
- Theme and preferred route settings use cookies; learning level, article progress, feedback, recent searches and publication checklist use device-local storage.
- The content shell supports desktop sidebars and mobile drawers. Short GSAP page/palette transitions respect reduced motion.
- Canonical, hreflang, Open Graph, sitemap.xml and robots.txt are generated from the chosen origin.

## Adding content

1. Add an Article entry to the manifest.
2. Add Markdown under each locale and supported version.
3. Use documented MDC components such as file-tree and interactive-demo where useful.
4. For new API data, implement ApiAdapter and attach exact version/platform information and an authoritative source.
5. Re-run the checks above and inspect desktop and mobile layouts.

## First-version boundaries

- The example library contains four finished learning examples, not every advanced topic listed in the long-term brief.
- The API browser is a focused curated reference. Full generated symbol ingestion is an extension point.
- The v4 archive contains a migration article, not a reconstructed complete v4 manual; it is not advertised as supported upstream.
- SDK examples have been checked against official sources but have not been compiled or run inside Geometry Dash in this environment. Build and test on each claimed platform before distributing a mod.
- Article feedback stays on the current device; there is no backend analytics or feedback submission.
- The pinned stable version and release summary are reviewed manually; there is no background release monitor.
- Automated accessibility tests complement, rather than replace, keyboard and visual review.

See ARCHITECTURE.md for design and routing decisions and SOURCES.md for the technical research record.


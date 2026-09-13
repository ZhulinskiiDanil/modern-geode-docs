import { articles } from '../../app/data/manifest'
export default defineEventHandler((event) => {
  const origin = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  const paths = (['en', 'ru', 'es'] as const).flatMap((locale) =>
    (['v5', 'v4'] as const).flatMap((version) => [
      '/' + locale + '/' + version,
      ...articles
        .filter((a) => a.versions.includes(version))
        .map((a) => '/' + locale + '/' + version + '/' + a.slug),
    ]),
  )
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return (
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map((path) => '<url><loc>' + origin + path + '</loc></url>').join('') +
    '</urlset>'
  )
})

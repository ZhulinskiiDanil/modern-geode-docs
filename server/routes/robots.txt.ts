export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain')
  return (
    'User-agent: *\nAllow: /\nSitemap: ' + useRuntimeConfig(event).public.siteUrl + '/sitemap.xml\n'
  )
})

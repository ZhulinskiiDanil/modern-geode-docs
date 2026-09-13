import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep, extname } from 'node:path'
const root = resolve('.output/public')
const port = Number(process.env.PORT || 3001)
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.png': 'image/png',
}
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname)
    let file = resolve(root, '.' + path)
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403).end()
      return
    }
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
    } catch {
      file = resolve(root, '404.html')
      res.statusCode = 404
    }
    const body = await readFile(file)
    res.setHeader('content-type', mime[extname(file)] || 'application/octet-stream')
    res.end(body)
  } catch {
    res.writeHead(404).end('Not found')
  }
}).listen(port, '127.0.0.1', () => console.log('Static preview: http://localhost:' + port))

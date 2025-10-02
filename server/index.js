// This file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
// Consequently:
//  - When changing this file, you needed to manually restart your server for your changes to take effect.
//  - To use your environment variables defined in your .env files, you need to install dotenv, see https://vite-plugin-ssr.com/env
//  - To use your path aliases defined in your vite.config.js, you need to tell Node.js about them, see https://vite-plugin-ssr.com/path-aliases

// If you want Vite to process your server code then use one of these:
//  - vavite (https://github.com/cyco130/vavite)
//     - See vavite + vite-pugin-ssr examples at https://github.com/cyco130/vavite/tree/main/examples
//  - vite-node (https://github.com/antfu/vite-node)
//  - HatTip (https://github.com/hattipjs/hattip)
//    - You can use Bati (https://batijs.github.io/) to scaffold a vite-plugin-ssr + HatTip app. Note that Bati generates apps that use the V1 design (https://vite-plugin-ssr.com/migration/v1-design) and Vike packages (https://vite-plugin-ssr.com/vike-packages)

import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr/server'
import { root } from './root.js'
import path from 'path'
import fs from 'fs'
const isProduction = process.env.NODE_ENV === 'production'

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  // Vite integration
  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our production server.)
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  // ...
  // Other middlewares (e.g. some RPC middleware such as Telefunc)
  // ...

  // Removido o middleware de redirecionamento automático para permitir
  // mudança de locale sem redirect na página inicial
  // O locale será detectado automaticamente pelo onBeforeRoute



  // Rota específica para ads.txt - deve vir ANTES do middleware catch-all
  app.get(/^.*\/?ads\.txt$/, (req, res) => {
    const adsPath = path.join(process.cwd(), 'ads.txt')
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400') // Cache por 24 horas

    try {
      const adsContent = fs.readFileSync(adsPath, 'utf8')
      res.send(adsContent)
    } catch (error) {
      console.error('Erro ao ler ads.txt:', error)
      res.status(404).send('ads.txt não encontrado')
    }
  })

  // Rota específica para robots.txt - deve vir ANTES do middleware catch-all
  app.get(/^.*\/?robots\.txt$/, (req, res) => {
    const robotsPath = path.join(process.cwd(), 'robots.txt')
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400') // Cache por 24 horas

    try {
      const robotsContent = fs.readFileSync(robotsPath, 'utf8')
      res.send(robotsContent)
    } catch (error) {
      console.error('Erro ao ler robots.txt:', error)
      res.status(404).send('Robots.txt não encontrado')
    }
  })

  // Rota única para qualquer caminho que termine com sitemap.xml (incluindo /, /pt/, /en/, /es/, etc)
  app.get(/^.*\/?sitemap\.xml$/, (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'dist/client/sitemap.xml')
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600') // Cache por 1 hora

    try {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
      res.send(sitemapContent)
    } catch (error) {
      console.error('Erro ao ler sitemap.xml:', error)
      res.status(404).send('Sitemap não encontrado')
    }
  })


  // Vite-plugin-ssr middleware. It should always be our last middleware (because it's a
  // catch-all middleware superseding any middleware placed after it).
  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      // Passar headers para detecção de idioma
      headers: req.headers
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    // Verificar se é um redirecionamento
    if (pageContext.redirect) {
      return res.redirect(301, pageContext.redirect)
    }

    if (!httpResponse) {
      return next()
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      // For HTTP streams use httpResponse.pipe() instead, see https://vite-plugin-ssr.com/stream
      res.send(body)
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

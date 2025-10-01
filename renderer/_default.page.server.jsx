export { render, onBeforePrerender }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'locale', 'urlOriginal', 'routeParams']

import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import logoUrl from './logo.svg'
import { generateSitemapXML } from './sitemap-generator.js'
import { getPageData, generatePageMetas, generateAllSchemas } from '../lib/metadata'

const locales = ['pt', 'en', 'es']
const localeDefault = 'pt'

function onBeforePrerender(prerenderContext) {
  const pageContexts = []
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicar pageContext para cada locale
    locales.forEach((locale) => {
      // Sempre adicionar o locale à URL original
      const urlOriginal = `/${locale}${pageContext.urlOriginal}`

      pageContexts.push({
        ...pageContext,
        urlOriginal,
        // Definir pageContext.locale
        locale
      })
    })
    
    // 🚀 CORREÇÃO 404: Adicionar página raiz (/) para produção
    // Se for a página inicial, também gerar versão sem locale
    if (pageContext.urlOriginal === '/') {
      pageContexts.push({
        ...pageContext,
        urlOriginal: '/',
        locale: localeDefault // Usar português como padrão
      })
    }
  })

  // Gerar sitemap XML automaticamente
  console.log('🗺️ Gerando sitemap.xml...')
  generateSitemapXML(pageContexts)

  return {
    prerenderContext: {
      pageContexts
    }
  }
}

async function render(pageContext) {
  const { Page, pageProps, locale, urlOriginal } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  // Buscar dados da página no pages.js
  const { pageData, basePath } = getPageData(urlOriginal, locale)

  // Gerar metatags baseadas nos dados da página
  const pageMetas = generatePageMetas(pageData, locale, basePath)

  // Gerar Schema Markup para SEO
  const schemas = generateAllSchemas(pageData, locale, urlOriginal)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports

  // Usar documentProps se existir, senão usar dados do pages.js
  const title = (documentProps && documentProps.title) || pageMetas.title
  const desc = (documentProps && documentProps.description) || pageMetas.description
  const keywords = (documentProps && documentProps.keywords) || pageMetas.keywords

  // Definir domínio baseado em variável de ambiente
  const siteUrl = process.env.SITE_URL || 'https://4generate.com'
  
  // Definir idioma do HTML baseado no locale
  const lang = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES'

  // Gerar tags hreflang para SEO internacional
  const hreflangTags = locales.map(loc => {
    const hreflangLang = loc === 'pt' ? 'pt-BR' : loc === 'en' ? 'en-US' : 'es-ES'
    return `<link rel="alternate" hreflang="${hreflangLang}" href="${siteUrl}/${loc}${pageContext.urlOriginal}" />`
  }).join('\n        ')

  // Adicionar tag hreflang x-default para idioma padrão
  const xDefaultTag = `<link rel="alternate" hreflang="x-default" href="${siteUrl}/${localeDefault}${pageContext.urlOriginal}" />`

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <meta name="keywords" content="${keywords}" />
        <meta name="language" content="${locale}" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="${siteUrl}/${locale}${pageContext.urlOriginal}" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${siteUrl}/${locale}${pageContext.urlOriginal}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${siteUrl}/og-image.jpg" />
        <meta property="og:site_name" content="4generate" />
        <meta property="og:locale" content="${lang}" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="${siteUrl}/${locale}${pageContext.urlOriginal}" />
        <meta property="twitter:title" content="${title}" />
        <meta property="twitter:description" content="${desc}" />
        <meta property="twitter:image" content="${siteUrl}/og-image.jpg" />
        <meta property="twitter:site" content="@4generate" />
        ${dangerouslySkipEscape(hreflangTags)}
        ${dangerouslySkipEscape(xDefaultTag)}
        <title>${title}</title>
        ${dangerouslySkipEscape(schemas.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n        '))}
        
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

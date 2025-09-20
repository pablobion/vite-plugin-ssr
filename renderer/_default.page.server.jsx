export { render, onBeforePrerender }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'locale']

import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import logoUrl from './logo.svg'

const locales = ['pt', 'en', 'es']
const localeDefault = 'pt'

function onBeforePrerender(prerenderContext) {
  const pageContexts = []
  prerenderContext.pageContexts.forEach((pageContext) => {
    // Duplicar pageContext para cada locale
    locales.forEach((locale) => {
      // Localizar URL - TODOS os idiomas terão prefixo
      const urlOriginal = `/${locale}${pageContext.urlOriginal}`
      pageContexts.push({
        ...pageContext,
        urlOriginal,
        // Definir pageContext.locale
        locale
      })
    })
  })
  return {
    prerenderContext: {
      pageContexts
    }
  }
}

async function render(pageContext) {
  const { Page, pageProps, locale } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  // Definir idioma do HTML baseado no locale
  const lang = locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <meta name="language" content="${locale}" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://seudominio.com/${locale}${pageContext.urlOriginal}" />
        <title>${title}</title>
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

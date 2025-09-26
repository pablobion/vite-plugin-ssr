export { onBeforeRoute }

const supportedLocales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

function onBeforeRoute(pageContext) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlOriginal)

  return {
    pageContext: {
      // Tornamos `locale` disponível como `pageContext.locale`
      locale,
      // Sobrescrevemos `pageContext.urlOriginal` para remover o locale
      urlOriginal: urlWithoutLocale
    }
  }
}

function extractLocale(url) {
  // Extraímos o locale da URL, por exemplo:
  //  extractLocale('/pt/exemplo').locale === 'pt'
  //  extractLocale('/en/exemplo').locale === 'en'
  //  extractLocale('/es/exemplo').locale === 'es'
  //  extractLocale('/pt').locale === 'pt' e urlWithoutLocale === '/'

  const pathSegments = url.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  if (firstSegment && supportedLocales.includes(firstSegment)) {
    const locale = firstSegment
    // Se é apenas o locale (ex: /pt), urlWithoutLocale deve ser '/'
    // Se tem mais segmentos (ex: /pt/exemplo), urlWithoutLocale deve ser '/exemplo'
    const urlWithoutLocale = pathSegments.length === 1 ? '/' : '/' + pathSegments.slice(1).join('/')
    return { locale, urlWithoutLocale }
  }

  // Se não há locale na URL, usamos o padrão
  return { locale: defaultLocale, urlWithoutLocale: url }
}

export { onBeforeRoute }

const supportedLocales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

function onBeforeRoute(pageContext) {
  const { urlWithoutLocale, locale, shouldRedirect } = extractLocale(
    pageContext.urlOriginal, 
    pageContext.headers
  )

  // Se deve redirecionar (usuário acessou sem idioma), fazer redirecionamento
  if (shouldRedirect) {
    const redirectUrl = `/${locale}${urlWithoutLocale}`
    return {
      pageContext: {
        redirect: redirectUrl
      }
    }
  }

  return {
    pageContext: {
      // Tornamos `locale` disponível como `pageContext.locale`
      locale,
      // Sobrescrevemos `pageContext.urlOriginal` para remover o locale
      urlOriginal: urlWithoutLocale
    }
  }
}

function extractLocale(url, headers = {}) {
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
    return { locale, urlWithoutLocale, shouldRedirect: false }
  }

  // Se não há locale na URL, detectar idioma do usuário e redirecionar
  const userLocale = detectUserLanguage(headers)
  return { 
    locale: userLocale, 
    urlWithoutLocale: url, 
    shouldRedirect: true 
  }
}

function detectUserLanguage(headers = {}) {
  // Detectar idioma do usuário usando headers HTTP Accept-Language
  const acceptLanguage = headers['accept-language'] || ''
  const preferredLanguage = parseAcceptLanguage(acceptLanguage)
  
  return preferredLanguage
}

function parseAcceptLanguage(acceptLanguage) {
  // Parse do header Accept-Language para detectar idioma preferido
  // Exemplo: "pt-BR,pt;q=0.9,en;q=0.8,es;q=0.7"
  
  if (!acceptLanguage) return defaultLocale
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q] = lang.trim().split(';q=')
      return {
        code: code.split('-')[0], // pt-BR -> pt
        quality: q ? parseFloat(q) : 1.0
      }
    })
    .sort((a, b) => b.quality - a.quality)
  
  // Encontrar o primeiro idioma suportado
  for (const lang of languages) {
    if (supportedLocales.includes(lang.code)) {
      return lang.code
    }
  }
  
  return defaultLocale
}

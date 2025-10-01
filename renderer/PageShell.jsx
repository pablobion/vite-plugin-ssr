import React, { useState, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import '../input.css'
import '../test-tailwind.css'
import { PageContextProvider } from './usePageContext'
import { childrenPropType } from './PropTypeValues'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ThemeProvider } from '../components/layout/ThemeContext'
import { BreadcrumbNav } from '../components/layout/BreadcrumbNav'

// Lazy loading para componentes pesados
const Footer = lazy(() => import('../components/layout/Footer'))

// Componente de loading para Suspense
function LoadingFallback({ message = 'Carregando...' }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  )
}

export { PageShell }


PageShell.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType
}
function PageShell({ pageContext, children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <React.StrictMode>
      {/* Script para prevenir flash de tema - deve ser executado antes do CSS */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const savedTheme = localStorage.getItem('4generate-theme');
              if (savedTheme) {
                const theme = JSON.parse(savedTheme);
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } else {
                // Padrão: modo dark quando não há tema selecionado
                document.documentElement.classList.add('dark');
              }
            } catch (e) {
              // Fallback: modo dark como padrão
              document.documentElement.classList.add('dark');
            }
          })();
        `
      }} />
      <style dangerouslySetInnerHTML={{
        __html: `
          /* CSS comum a todas as páginas */
          body {
            margin: 0;
            font-family: sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          a {
            text-decoration: none;
          }
        `
      }} />
      
      {/* Google Analytics - apenas no cliente */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ELC2QVC7VF"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ELC2QVC7VF');
          `,
        }}
      />
      
      {/* Google AdSense - apenas no cliente */}
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3072791363291151" 
        crossOrigin="anonymous"
      />
      
      {/* Detector de idioma - apenas no cliente */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              'use strict';
              
              function checkCurrentLanguage() {
                const currentPath = window.location.pathname;
                const pathSegments = currentPath.split('/').filter(Boolean);
                const firstSegment = pathSegments[0];
                
                // Se já tem idioma na URL, não fazer nada
                if (['pt', 'en', 'es'].includes(firstSegment)) {
                  return;
                }
                
                // Detectar idioma preferido do usuário
                const userLanguage = detectBrowserLanguage();
                
                // Redirecionar para o idioma correto
                if (userLanguage !== 'pt') {
                  window.location.href = \`/\${userLanguage}\${currentPath}\`;
                } else if (currentPath !== '/pt' && currentPath !== '/') {
                  // Se é português e não está na raiz, redirecionar para /pt
                  window.location.href = \`/pt\${currentPath}\`;
                }
              }
              
              function detectBrowserLanguage() {
                // Prioridade 1: Idioma salvo no localStorage
                const savedLanguage = localStorage.getItem('preferred-language');
                if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
                  return savedLanguage;
                }
                
                // Prioridade 2: Idioma do navegador
                const browserLanguage = navigator.language || navigator.userLanguage;
                const languageCode = browserLanguage.split('-')[0];
                
                if (['pt', 'en', 'es'].includes(languageCode)) {
                  // Salvar preferência
                  localStorage.setItem('preferred-language', languageCode);
                  return languageCode;
                }
                
                // Prioridade 3: Idioma padrão (pt-BR)
                return 'pt';
              }
              
              // Executar apenas se não estamos no servidor
              if (typeof window !== 'undefined') {
                // Aguardar um pouco para evitar conflitos com hidratação
                setTimeout(checkCurrentLanguage, 100);
              }
            })();
          `,
        }}
      />
      <ThemeProvider>
        <PageContextProvider pageContext={pageContext}>
          <Layout>
            <div className="flex flex-1">
              <Sidebar isCollapsed={isCollapsed} />
              <div className="flex flex-col flex-1">
                <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <Content>{children}</Content>
              </div>
            </div>
            <Suspense fallback={<LoadingFallback message="Carregando rodapé..." />}>
              <Footer locale={pageContext?.locale || 'pt'} />
            </Suspense>
          </Layout>
        </PageContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

Layout.propTypes = {
  children: childrenPropType
}
function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      {children}
    </div>
  )
}


Content.propTypes = {
  children: childrenPropType
}
function Content({ children }) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-blue-300/20 dark:bg-background flex flex-col flex-1">
        <BreadcrumbNav />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

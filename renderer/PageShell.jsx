import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../input.css'
import '../test-tailwind.css'
import { PageContextProvider } from './usePageContext'
import { childrenPropType } from './PropTypeValues'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ThemeProvider } from '../components/layout/ThemeContext'

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
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme) {
                document.documentElement.classList.toggle('dark', savedTheme === 'dark');
              } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.toggle('dark', prefersDark);
              }
            } catch (e) {
              // Fallback: usar preferência do sistema
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              document.documentElement.classList.toggle('dark', prefersDark);
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
      <ThemeProvider>
        <PageContextProvider pageContext={pageContext}>
          <Layout>
            <Sidebar isCollapsed={isCollapsed} />
            <div className="flex flex-col flex-1">
              <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
              <Content>{children}</Content>
            </div>
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
    <div className="flex min-h-screen">
      {children}
    </div>
  )
}


Content.propTypes = {
  children: childrenPropType
}
function Content({ children }) {
  return (
    <div className="flex-1 min-h-[calc(100vh-64px)]">
      <div className="bg-blue-300/10 dark:bg-background ">
        {children}
      </div>
    </div>
  )
}

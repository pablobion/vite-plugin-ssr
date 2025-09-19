import React from 'react'
import PropTypes from 'prop-types'
import logo from './logo.svg'
import '../input.css'
import '../test-tailwind.css'
import './PageShell.css'
import { PageContextProvider } from './usePageContext'
import { Link } from './Link'
import { childrenPropType } from './PropTypeValues'

export { PageShell }

PageShell.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType
}
function PageShell({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Sidebar>
            <Logo />
            <Link className="navitem" href="/">
              Home
            </Link>
            <Link className="navitem" href="/about">
              About
            </Link>
            <Link className="navitem" href="/tailwind-test">
              Teste Tailwind
            </Link>
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Exemplos i18n:</div>
              <Link className="navitem" href="/pt/exemplo">
                🇧🇷 PT
              </Link>
              <Link className="navitem" href="/en/exemplo">
                🇺🇸 EN
              </Link>
            </div>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  )
}

Layout.propTypes = {
  children: childrenPropType
}
function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

Sidebar.propTypes = {
  children: childrenPropType
}
function Sidebar({ children }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.8em'
      }}
    >
      {children}
    </div>
  )
}

Content.propTypes = {
  children: childrenPropType
}
function Content({ children }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: '2px solid #eee',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
import React from 'react'
import PropTypes from 'prop-types'
import '../input.css'
import '../test-tailwind.css'
import './PageShell.css'
import { PageContextProvider } from './usePageContext'
import { childrenPropType } from './PropTypeValues'
import Sidebar from '../components/layout/Sidebar'

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
          <Sidebar />
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
        minHeight: '100vh'
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
        flex: 1,
        padding: 20,
        paddingBottom: 50,
        backgroundColor: '#fff'
      }}
    >
      {children}
    </div>
  )
}

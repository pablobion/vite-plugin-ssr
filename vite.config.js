import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import path from 'path'   // <-- aqui está o que faltava

export default {
  plugins: [
    react(),
    ssr({
      prerender: true,
      passToClient: ['locale', 'isLocaleSupported', 'pagePath']
    })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  }
}
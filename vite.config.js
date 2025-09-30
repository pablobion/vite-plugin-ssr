import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import path from 'path'   // <-- aqui está o que faltava

export default {
  plugins: [
    react(),
    ssr({
      prerender: true,
      passToClient: ['locale', 'isLocaleSupported', 'pagePath'],
      prefetchStaticAssets: 'viewport'
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild' // Usar esbuild (padrão do Vite) em vez de terser
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  }
}
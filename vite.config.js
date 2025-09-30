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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', 'lucide-react'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
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
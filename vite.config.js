import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'src/pages/privacy.html'),
        terms: resolve(__dirname, 'src/pages/terms.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
}) 
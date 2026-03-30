import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        formulario: fileURLToPath(new URL('./formulario/index.html', import.meta.url)),
        projetos: fileURLToPath(new URL('./projetos/index.html', import.meta.url)),
      },
    },
  },
})

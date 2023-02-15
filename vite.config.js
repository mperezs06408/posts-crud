import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  server:{
    port: 8080,
  },
  resolve:{
    alias: {
      '@': resolve(__dirname, '/src'),
      '@components': resolve(__dirname, '/src/components'),
      '@styles': resolve(__dirname, '/src/styles')
    }
  },
  plugins: [react()],
})

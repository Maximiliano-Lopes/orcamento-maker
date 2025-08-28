import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/orcamento-maker/',
  build: {
    assetsDir: 'assets',
  },
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app',
      '.ngrok.io',
      'ccc76acd0422.ngrok-free.app'
    ],
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})

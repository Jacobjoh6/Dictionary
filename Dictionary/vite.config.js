import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: "./src/tests/setup.jsx",
    css: true,
    globals: true,
    test: {
      coverage: {
        provider: 'istanbul', // or 'v8'
        enabled: true,
        reporter: ['html'],
      },
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'redux-persist/integration/react' // Add this line to externalize the module
      ]
    }
  }
})

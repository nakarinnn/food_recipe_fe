import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    
  },
  server: {
    proxy: {
      '/api': {
        target: "https://food-recipe-be-wsb1.onrender.com",
        // target:  'http://localhost:2000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

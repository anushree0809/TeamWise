import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  server: {
    server: {
      proxy: {
        '/api': 'http://localhost:3000', // Proxy all /api requests to backend
      },
    },
  },
  plugins: [react(), tailwindcss()],
})

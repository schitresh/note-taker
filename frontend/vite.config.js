import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import process from 'process'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_PORT,
  },
  plugins: [react()],
})

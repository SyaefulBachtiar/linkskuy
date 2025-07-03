import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
  },
  esbuild: {
    legalComments: "none",
  },
  plugins: [react()],
});

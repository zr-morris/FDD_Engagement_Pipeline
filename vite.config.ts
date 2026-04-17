import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For GitHub Pages: set base to repo name in production
  // Override with VITE_BASE_PATH env var if needed
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    host: true,
    port: 5173,
    hmr: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  preview: {
    host: true,
    port: 4173,
  },
});

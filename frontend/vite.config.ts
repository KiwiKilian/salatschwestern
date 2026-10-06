import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import svgr from 'vite-plugin-svgr';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    ViteEjsPlugin((viteConfig) => ({ ...viteConfig.env })),
    svgr(),
    tanstackRouter({ semicolons: true }),
  ],
});

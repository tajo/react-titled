/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './examples/react-legacy',
  plugins: [
    react({
      jsxRuntime: 'classic'
    })
  ],
  cacheDir: 'node_modules/.cache/vite',
  build: {
    outDir: 'build'
  },
  test: {
    environment: 'jsdom'
  }
});

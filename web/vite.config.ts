import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@engine': path.resolve(__dirname, '../engine'),
    },
  },
  plugins: [solid()],
  build: {
    sourcemap: true,
  },
});

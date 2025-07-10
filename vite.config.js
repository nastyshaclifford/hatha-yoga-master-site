import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  publicDir: 'assets',
  base: '/hatha-yoga-master-site/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/assets/pages/about-me.html'),
        offer: resolve(__dirname, 'src/assets/pages/offer.html'),
        policy: resolve(__dirname, 'src/assets/pages/privacy-policy.html')
      }
    }
  },
  server: {
    port: 3000,
    open: '/index.html'
  }
});
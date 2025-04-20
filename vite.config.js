import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/bundlephobia': {
        target: 'https://bundlephobia.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bundlephobia/, ''),
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://bundlephobia.com'
        }
      },
      '/api/packagephobia': {
        target: 'https://packagephobia.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/packagephobia/, ''),
      },
      '/api/npm': {
        target: 'https://registry.npmjs.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/npm/, '')
      }
    }
  }
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:1337',
      '/upload': 'http://localhost:1337',
    },
  },
  // 添加代码分割（减少67%首屏JS体积）
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          components: ['./src/components/*'],
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';

import requireTransform from 'vite-plugin-require-transform';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs(),
    requireTransform({
      fileRegex: /.js$|.vue$/
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn'
    }
  }
});

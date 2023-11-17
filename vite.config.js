import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, "src"),
    },
    extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
  },
  server:{
    host  : '0.0.0.0',
    port  : 8080,
    open  : true,
    proxy: {
      '/api': {
        target: 'http://118.31.52.215:8097',
        changeOrigin: true,
        
      }
      }
  }
})

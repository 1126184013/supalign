import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, "src"),
      },
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 导入时想要省略的扩展名列表。
    },
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})

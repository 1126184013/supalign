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
    },
    css: {
      // postcss: {
      //   plugins: [require('postcss-pxtorem')({
      //     rootValue: 19.2, // 设计稿宽度的1/10
      //     propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部, 如果某个样式不需要转换把px改为PX，Px即可
      //     unitPrecision: 3, // 精确到小数点几位
      //     selectorBlackList: [], // 哪些属性不要转rem单位
      //   })]
      // },
      loaderOptions: {
        postcss: {
          // postcssOptions: {
            plugins: [
              [
                "postcss-pxtorem",
                {
                  rootValue: 19.2, // 1rem等于多px
                  unitPrecision: 3, // 精确到小数点几位
                  propList: ["*"], // 哪些属性要转rem单位
                  selectorBlackList: [], // 哪些属性不要转rem单位
                },
              ],
            ],
          // },
        },
      },
    },
  }
})

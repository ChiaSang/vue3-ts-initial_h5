import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import px2viewport from 'postcss-px-to-viewport'
import importcss from 'postcss-import'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
const autoprefixer = require('autoprefixer')
// https://vitejs.dev/config/
export default ({ mode }) => {
  const VITE_ENV = loadEnv(mode, './viteEnv')
  console.log('VITE_ENV :>> ', mode, VITE_ENV)
  return defineConfig({
    envDir: './viteEnv', // 这里使用相对路径，绝对路径其实也可以
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()]
      })
    ],
    resolve: {
      // extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    base: './', // 设置打包路径
    server: {
      port: 4500, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      host: '0.0.0.0',

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/dingTalk': {
          target: VITE_ENV.VITE_PROXY_URL,
          changeOrigin: true,
          secure: false
          // rewrite: (path) => path.replace('/api/', '/')
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          importcss(),
          autoprefixer({
            overrideBrowserslist: ['Android >= 4', 'ios >= 8']
          }),
          px2viewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/^(?!.*node_modules\/vant)/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          }),
          px2viewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules\/vant/i], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    }
  })
}

const path = require('path')
module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android >= 4', 'ios >= 8']
      },
      'postcss-px-to-viewport': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: designWidth, // UI设计稿的宽度
        unitPrecision: 3, // 转换后的精度，即小数点位数
        // propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        // selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
        minPixelValue: 0, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true // 是否在媒体查询的css代码中也进行转换，默认false
        // replace: true, // 是否转换后直接更换属性值
        // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        // landscape: false // 是否处理横屏情况
      }
    }
  }
}
// module.exports = {
//   parser: 'postcss-comment',
//   plugins: {
//     'postcss-import': {
//       resolve (id, basedir, importOptions) {
//         if (id.startsWith('~@/')) {
//           return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
//         } else if (id.startsWith('@/')) {
//           return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
//         } else if (id.startsWith('/') && !id.startsWith('//')) {
//           return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
//         }
//         return id
//       }
//     },
//     autoprefixer: {
//       overrideBrowserslist: ['Android >= 4', 'ios >= 8'],
//       remove: process.env.UNI_PLATFORM !== 'h5'
//     },
//     // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
//     // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
//     'postcss-px-to-viewport': {
//       unitToConvert: 'rpx',
//       viewportWidth: 200,
//       unitPrecision: 5,
//       propList: ['*'],
//       viewportUnit: 'px',
//       fontViewportUnit: 'px',
//       selectorBlackList: [],
//       minPixelValue: 1,
//       mediaQuery: false,
//       replace: true,
//       exclude: undefined,
//       include: undefined,
//       landscape: false
//     },
//     '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
//   }
// }

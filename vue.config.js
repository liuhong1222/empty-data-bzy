const internalIp = require('internal-ip')
const lIP = internalIp.v4.sync()
const time = new Date().getTime()

module.exports = {
  // chainWebpack: config => {
  //   config
  //     .plugin('html')
  //     .tap(args => {
  //       args[0].title = ''
  //       return args
  //     })
  // },
  transpileDependencies: [],
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // 修改打包后js文件名
  configureWebpack: {
    // webpack 配置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
      filename: `js/[name].${time}.js`,
      chunkFilename: `js/[name].${time}.js`
    }
  },
  devServer: {
    host: lIP, // can be overwritten by process.env.HOST
    port: 10000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    https: false,
    open: true,
    openPage: '/',
    proxy: {
      '/apis/*': {
        // target: 'http://172.18.109.136:8883', // xybb
        target: 'http://172.16.43.37:8883', // stable
        // target: 'http://172.18.109.136:8802', // 迅龙
        // target: 'http://khkjc.com/',
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        },
        headers: {
          Referer: 'http://127.0.0.1:8802',
          // Referer: 'http://khkjc.com/',
          Cookie: ''
        }
      },
      '/mock/*': {
        target: 'http://127.0.0.1:9000',
        // target: 'http://khkjc.com/',
        pathRewrite: {
          '^/mock': ''
        }
      },
      '/batch_download/*': {
        target: 'http://172.16.43.37:8088',
        secure: false,
        changeOrigin: true
      }
    }
  }
}

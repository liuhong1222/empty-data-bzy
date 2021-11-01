const internalIp = require('internal-ip')
const lIP = internalIp.v4.sync()
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
  devServer: {
    host: lIP, // can be overwritten by process.env.HOST
    port: 9999, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    https: false,
    open: true,
    openPage: '/',
    proxy: {
      '/apis/*': {
        target: 'http://127.0.0.1:8802',
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
      }
    }
  }
}

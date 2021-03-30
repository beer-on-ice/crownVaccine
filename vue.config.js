// const fs = require('fs')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
  // 输出文件目录
  publicPath: IS_PROD ? '/HAINANZHYYJMBWeb/' : '/',
  // 'dist', 生产环境构建文件的目录
  outputDir: process.env.outputDir || 'dist',
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // indexPath: './public/index.html',
  configureWebpack: config => {
    const plugins = []

    if (IS_PROD) {
      // 去除consle
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )
    }
    config.externals = {
      BMap: 'BMap'
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@pages', resolve('src/pages'))
      .set('@utils', resolve('src/utils'))
      .set('@config', resolve('src/config'))
      .set('@mixins', resolve('src/mixins'))
      .set('@plugins', resolve('src/plugins'))

    return config
  },
  // css相关配置
  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      css: {},
      stylus: {
        import: '~@/assets/stylus/base.styl',
        globalVars: {
          primary: '#fff'
        }
      }
    }
  },
  lintOnSave: true,
  // runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  devServer: {
    disableHostCheck: true,
    open: true, // 是否打开浏览器
    hotOnly: true // 热更新
    // proxy: {
    //   '/api': {
    //     // target: 'http://192.168.1.192:7070',
    //     target: 'http://localhost:7070',
    //     // 开启代理，在本地创建一个虚拟服务端
    //     changeOrigin: true,
    //     // 是否启用websockets
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}

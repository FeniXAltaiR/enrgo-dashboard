const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.plugin('html').tap((args) => {
  //     args[0].filename = 'monitoring.html'
  //     return args
  //   })
  // },
  assetsDir: 'monitoring',
  devServer: {
    client: {
      overlay: false,
    },
  },
})

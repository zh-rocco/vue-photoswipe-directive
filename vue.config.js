const isLibraryMode = process.env.BUILD_TARGET === 'library'

module.exports = {
  publicPath: './',

  productionSourceMap: !isLibraryMode,

  css: { extract: false },

  chainWebpack (config) {
    if (!isLibraryMode) {
      config.externals({ vue: 'Vue' })
    }
    config.devtool('source-map')
  }
}

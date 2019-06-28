const isLibraryMode = process.env.BUILD_TARGET === 'library'

module.exports = {
  publicPath: './',

  productionSourceMap: !isLibraryMode,

  css: { extract: false },

  chainWebpack (config) {
    config.devtool('source-map')
    if (isLibraryMode) {
      config.output.filename('index.js')
    }
  }
}

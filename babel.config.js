module.exports = {
  presets: [process.env.BUILD_TARGET === 'library' ? '@babel/env' : '@vue/app']
}

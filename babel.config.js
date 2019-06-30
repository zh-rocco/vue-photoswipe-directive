module.exports = {
  presets: [process.env.BUILD_TARGET === 'library' ? '@babel/preset-env' : '@vue/app'],
  plugins: [
    ['@babel/transform-runtime']
  ]
}

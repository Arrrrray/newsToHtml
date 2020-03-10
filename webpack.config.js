module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname,
    filename: './release/index.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
}
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: []
  }
}

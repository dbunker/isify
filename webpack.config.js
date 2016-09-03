const webpack = require('webpack')

module.exports = {
  name: 'isify',
  entry: {
    home: './source/index.js'
  },
  output: {
    path: './dist',
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
}

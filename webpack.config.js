const path = require('path');

module.exports = {
  context: path.resolve('application/assets/custom'),
  entry: './index.js',
  output: {
    path: path.resolve('application/assets/custom'),
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};

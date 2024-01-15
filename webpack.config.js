const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'index.min.js',
      path: path.join(__dirname, 'public'),
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }]
    },
    mode: 'development',
    devServer: {
      static: path.join(__dirname, 'public'),
      allowedHosts: ['all'],
    },
    plugins: [
      new Dotenv(),
    ]
};
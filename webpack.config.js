const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', '@babel/preset-react']

          }
        }
      },
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html'
    // }),
    new webpack.ProvidePlugin({
      'webglUtils': path.resolve(__dirname, './src/lib/webgl-utils')
  }),
  ],
  // devServer: {
  //   static: {
  //       directory: path.join(__dirname, 'dist')
  //     },
  //   // contentBase: path.join(__dirname, 'dist'),
  //   port: 3000,
  //   open: true
  // }
};

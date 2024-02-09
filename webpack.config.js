const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './src/index.js', // Adjust entry point if needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js', // Use .mjs for ES modules
    library: 'Chameleon',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Corrected regular expression
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.tsx?$/, // Corrected regular expression
        exclude: /node_modules/,
        use: 'ts-loader'
      },
    ]
  },
  devtool: 'source-map', // Enable source mapping
  // externals: [
  //   'react', // Assume React is available in the browser environment
  //   'react-dom' // Optional if your library doesn't directly depend on React DOM
  // ],
  // plugins: [
  //   // ... consider adding plugins for optimization (e.g., tree shaking, minification)
  // ]
};
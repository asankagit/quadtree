const path = require('path');
const webpack = require("webpack");

module.exports = [
  {
    mode: 'production', // Set mode to production for minification
    entry: './src/index.js', // Path to your TypeScript entry file
    output: {
      path: path.resolve(__dirname, 'dist'), // Output directory
      filename: 'main.cjs.js', // Output filename for CommonJS format
      libraryTarget: 'commonjs' // Output module format (CommonJS)
    },
    resolve: {
      extensions: ['.ts', '.js'] // Resolve TypeScript and JavaScript files
    },
    module: {
      rules: [
        {
          test: /\.ts$/, // Apply loader only to TypeScript files
          exclude: /node_modules/, // Exclude node_modules from being compiled
          use: 'ts-loader' // Use ts-loader for TypeScript compilation
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commonjs: {
            test: /[\\/]node_modules[\\/]/,
            name: 'commonjs',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    // Define any additional plugins as needed
    plugins: [
      // Add any necessary plugins for your project
    ]
  },
  {
    entry: './src/index.js', // Adjust entry point if needed
    // output: {
    //   path: path.resolve(__dirname, 'dist/mini'),
    //   filename: '[name].js', // Use .mjs for ES modules
    //   library: {
    //     // name: 'Chameleon',
    //     type: 'module'
    //   }
    //   // libraryTarget: 'umd',
    // },
    output: {

      path: path.resolve(__dirname, 'dist'), // Output directory
      filename: 'main.umd.js', // Output filename for UMD format
      library: '@asanka-npm/chameleon', // Name of the global variable in UMD format
      libraryTarget: 'umd', // Output module format (UMD)
      globalObject: 'this', // Global object for UMD bundle (window in browser, global in Node.js)
      umdNamedDefine: true // Use module name as UMD module ID
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
    // experiments: {
    //   outputModule: true, // Enable 'outputModule' experiment
    // },
    devtool: 'source-map', // Enable source mapping
    // externals: [
    //   'react', // Assume React is available in the browser environment
    //   'react-dom' // Optional if your library doesn't directly depend on React DOM
    // ],
    // plugins: [
    //   // ... consider adding plugins for optimization (e.g., tree shaking, minification)
    // ]
  }];
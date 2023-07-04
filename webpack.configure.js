const HtmlWebpackPlugin = require('html-webpack-plugin');   // Import the plugin to help webpack generate a new index.html file
const path = require('path');                               // Import the 'path' module from Node.js

module.exports = {                                          // Export a configuration object for Webpack
  entry: './src/main.js',                                   // Specify the entry point for our application
  output: {                                                 // Define where the bundled code should be output
    path: path.resolve(__dirname, 'dist'),                  // Resolve the absolute path to the 'dist' directory
    filename: 'bundle.js',                                  // Name the output bundle file,
  },
  devtool: 'source-map',                                    // Generates a map' from the original code and the generated code. This is helpful for debugging.
  module: {                                                 // Define the rules for processing modules    
    rules: [                                                // Define a rule for transpiling files using Babel
      {
        test: /\.(html)$/,                                  // Use HTML-loader to transpile all .js files
        use: ['html-loader']
      },
      {
        test: /\.js$/,                                      // Use babel-loader to transpile all .js files
        use: {
          loader: 'babel-loader',                           // Use babel-loader with @babel/preset-env preset to transpile .js files for default environments
          options: { 
            presets: ['@babel/preset-env']                  // Provides babel-loader with the ability to transpile for specific, or default, environments
          }
        }
      }
    ], 
  },
  plugins: [
    new HtmlWebpackPlugin({                                 // HTML Webpack Plugin helps webpack automatically generate and update an index.html file with references to the bundled javascript and css. 
      template: path.resolve(__dirname, './src/index.html'),// Specify the template HTML file
      minify: true                                          // Removes whitespace, redundant characters, and more to reduce the file size. 
    }),
  ]
};

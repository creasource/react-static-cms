const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  // devtool: 'source-map',
  entry: './src-admin/index.js',
  output: {
    filename: 'admin.js',
    path: __dirname + '/dist/admin'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/'
          }
        }]
      },
      {
        test: /\.(png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Administration',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src-admin/config.yml', to: './' },
    ])
  ]
};

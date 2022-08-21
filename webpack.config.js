const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  app: 'app/'
};

module.exports = env => ({
  mode: env.NODE_ENV,
  devtool: 'inline-source-map',
  devServer: {
    contentBase:  PATHS.dist,
    port: 3000,
    overlay: true
  },
  externals: {
    paths: PATHS
  },
  entry: ['@babel/polyfill', 'whatwg-fetch', PATHS.src],
  output: {
    filename: `${PATHS.app}js/[name].js`,
    path: PATHS.dist,
    publicPath: ''
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js`}}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js`}}
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.app}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/img`, to: `${PATHS.app}img`},
      {from: `${PATHS.src}/img/goods`, to: `${PATHS.app}img/goods`},
      {from: `${PATHS.src}/scss/font`, to: `${PATHS.app}/css/font`},
      {from: `${PATHS.src}/js/json`, to: `${PATHS.app}/js/json`},
    ])
  ],
});

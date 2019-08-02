const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BundleAnalyzerPluginDev = process.env.NODE_ENV === 'production' ? [] : [new BundleAnalyzerPlugin()];
const HotLoadPluginDev = process.env.NODE_ENV === 'production' ? [] : [new webpack.HotModuleReplacementPlugin()];

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  watch: process.env.BUILD_WATCH === 'yes',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs2'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    enforceExtension: false,
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src', 'components'),
      '@Constants': path.resolve(__dirname, 'src', 'constants')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|\.stories\.js|\.test\.js/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
              importLoaders: 1
            }
          },
          {
            loader: 'pxrem-loader',
            options: {
              root: 10,
              fixed: 6
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'pxrem-loader',
            options: {
              root: 10,
              fixed: 6
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css'
    }),
    ...BundleAnalyzerPluginDev,
    ...HotLoadPluginDev,
    new OptimizeCssAssetsPlugin()
  ]
};

const path = require('path')
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig,{
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: process.env.WBPACK_DEV_SERVER_HOST,
    port: process.env.WBPACK_DEV_SERVER_PORT,
    contentBase: path.resolve(__dirname,'../distDEV'),
    overlay: {
      errors:true,
      warnings:true
    },
    hot: true,
    stats: 'minimal',
  }
})
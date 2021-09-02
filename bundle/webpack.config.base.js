const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const getAlias = require('./alias');
const { PUBLICK_PATH } = process.env;
console.log("---", PUBLICK_PATH);

module.exports = {
  entry:path.resolve(__dirname,'../src/index.tsx'),
  output:{
    filename:'js/[name].[hash:5].js',
    path:path.resolve(__dirname,'../dist'),
    publicPath: PUBLICK_PATH || ""
    // publicPath: "fyxtest"
  },
  module:{
    rules:[
      ...new LoaderFactory().getLoaders()
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      ...getAlias(),
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins:[
    ...new PluginFactory().getPlugins()
  ]
}
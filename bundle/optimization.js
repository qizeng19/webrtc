const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    splitChunks: {
        chunks: "async",
        minSize: 30000, //表示在压缩前的最小模块大小,默认值是30kb
        minChunks: 1, // 表示被引用次数，默认为1；
        maxAsyncRequests: 5, //所有异步请求不得超过5个
        maxInitialRequests: 3, //初始话并行请求不得超过3个
        automaticNameDelimiter: '~', //名称分隔符，默认是~
        name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
        cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
            common: {
                name: 'common', //抽取的chunk的名字
                priority: 10, //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
                minChunks: 2, //最少被几个chunk引用
                reuseExistingChunk: true, //  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                enforce: true // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
            }
        }
    },
    minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: !isProd, // 如果在生产环境中使用 source-maps，必须设置为 true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
      ],
}
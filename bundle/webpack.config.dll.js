const webpack =require('webpack')
const path =require('path')
const { NODE_ENV } = process.env;

module.exports = {
	mode:'production',
	entry:{
		React:['react'],
		ReactDOM:['react-dom']
	},
	output:{
		 filename:'[name].dll.js',
		 path:path.resolve(__dirname,`../dll/${NODE_ENV}`),
		 library:'[name]'  // 通过全局变量暴露出去， vendors
	},
	plugins:[
    // 使用webpack.DllPlugin进行分析，生成出一个映射文件
    new webpack.DllPlugin({
      name:'[name]',
      path:path.resolve(__dirname, `../dll/${NODE_ENV}/[name].mainfest.json`)
    }),
    // 通过全局变量，采用相应的 react 包
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    })
	]
}

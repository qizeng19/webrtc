const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const px2rem = require("postcss-px2rem-exclude");

class LoaderFactory {
  constructor(){
    this.isProd = process.env.NODE_ENV === 'production';
    this.loaders = [];
  }
  // 读取主题配置
  getModifyVars(){
    const modifyVars = path.resolve(__dirname, '../src/solution/assets/style/var.modify.less');
    return modifyVars;
  }
   // 读取全局变量配置
   getGlobalVars() {
    const globalVars = require(path.resolve(__dirname, '../src/solution/assets/style/var.global.json'));
    return globalVars;
  }
  // 生成样式配置
  generageCommonStyleLoader (options = {
    isModule:true,
    style:'less'
  }){
    // Test
    const loaderTestLess = options.isModule ? /\.(module|component)\.less$/ : /\.less$/
    const loaderTestCss = options.isModule ? /\.(module|component)\.css$/ : /\.css$/
    // Exclude
    const loaderExcludeLess =  /\.(module|component)\.less$/;
    const loaderExcludeCss =  /\.(module|component)\.css$/;

     // 生产环境提取 CSS
     const styleLoaderPre = this.isProd ? {
      loader:MiniCSSExtractPlugin.loader,
      options:{
        publicPath:'../',
      }
    } : {
      loader: 'style-loader'
    }

    const loaderConfig =  {
      use: [
        styleLoaderPre,
        '@teamsupercell/typings-for-css-modules-loader',
        {
          loader: 'css-loader',
          options:{
            localsConvention: 'camelCase',
            importLoaders:2,
            modules:options.isModule ? {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            } : false
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
              }),
                px2rem({remUnit: 75,exclude: /node_modules/i})
            ]
          }
        },
      ]
    }

    const lessLoaderConfig = {
      loader: 'less-loader',
      options: {
        // 主题配置
        modifyVars:{
          'hack': `true; @import "${this.getModifyVars()}";`
        },
        // 全局变量
        globalVars:this.getGlobalVars(),
        javascriptEnabled: true,
      }
    }

    loaderConfig.test = ( options.style === 'less' ? loaderTestLess : loaderTestCss );
    options.style === 'less' && loaderConfig.use.push(lessLoaderConfig);
    // global 忽略 modules
    if(!options.isModule){
      loaderConfig.exclude = ( options.style === 'less' ? loaderExcludeLess : loaderExcludeCss );
    }
    return loaderConfig;
  }

  getStyleLoader(options) {
    return this.generageCommonStyleLoader(options)
  }

  getTsLoader(){
    // 打包TS
    const tsLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/,  
      use: {
        loader:'ts-loader',
        options:{
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ 
              // 默认为 antd 启用
              tsImportPluginFactory({
                libraryName: 'antd-mobile',
                libraryDirectory: 'lib',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
    };
    return tsLoader;
  }

  getTsLintLoader() {
    const tsLintLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/,  
      enforce: 'pre',
      use: [
        {
            loader: 'eslint-loader',
            options: {
              emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
              emitError: true, // 这个配置需要打开，才能在控制台输出error信息
              fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
            }
        }
      ]
    };
    return tsLintLoader;
  }

  getImgLoader() {
    // 打包图片
    const imgLoader =  {
      test: /\.(png|jpg|jpeg|gif)$/,
      use:{
        loader:'url-loader',
        options:{
          name:'[name].[contentHash:5].[ext]',
          limit: 2000,
          outputPath:'image'
        },
      }
    };
    return imgLoader;
  }

  getFontLoader(){
    // 打包字体
    const fontLoader = {
      test:/\.eot|svg|ttf|woff|woff2$/,
      use:{
        loader:'file-loader',
        options:{
          name:'[name].[ext]',
          outputPath:'font'
        }
      }
    }
    return fontLoader;
  }

  getSvgLoader() {
    // 打包 SVG
    const svgLoader = {
      test: /\.svg$/,
      loader:'@svgr/webpack'
    }
    return svgLoader;
  }

  getLoaders() {
    const TsLoader = this.getTsLoader();
    const ImgLoader = this.getImgLoader();
    const FontLoader = this.getFontLoader();
    const SvgLoader = this.getSvgLoader();
    const LessLoader = this.getStyleLoader({
      isModule:true,
      style:'less'
    });
    const CssLoader = this.getStyleLoader({
      isModule:true,
      style:'css'
    });
    const TsLintLoader = this.getTsLintLoader();
    const LessLoaderGlobal = this.getStyleLoader({
      isModule:false,
      style:'less'
    });
    const CssLoaderGlobal = this.getStyleLoader({
      isModule:false,
      style:'css'
    });
    process.env.NODE_ENV == "development" && this.loaders.push(TsLintLoader);
    this.loaders.push(
      TsLoader,
      ImgLoader,
      FontLoader,
      SvgLoader,
      LessLoader,
      LessLoaderGlobal,
      CssLoader,
      CssLoaderGlobal
    );

    return this.loaders;
  }
}

module.exports = LoaderFactory;
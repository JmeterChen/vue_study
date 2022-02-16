
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        // publicPath: "dist/"  // 这里的配置的作用是 打包的时候所有 以url方式引入的 静态文件再次生成后的路径被引入时会加上该路径
    },
    // https://webpack.js.org/loaders/css-loader/ 
    // 想要编译加载 css 文件，需要使用 引入对应的 loader
    module:{
        rules: [
            // 注意这里是为了引入 css-loader
            // 版本：css-loader@2.0.2
            {
              test: /\.css$/i,
            //  css-loader 只负责将 css 文件进行加载
            // style-loader 负责将 css 样式添加到 DOM 中生效
            // 使用多个 loader 时，顺序是从右往左加载
              use: ["style-loader", "css-loader"],
            },
            // 注意这里是为了引入  less-loader 和 less
            // 版本：less-loader@4.1.0 less@3.9.0
            {
              test: /\.less$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, {
                  loader: "less-loader" // compiles Less to CSS
              }]
            },
            // 注意这里是为了引入 url-loader
            // 版本：url-loader@1.1.2
            {
              test: /\.(png|jpg|gif|jpeg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    // 1.当图片大小比 limit 数值小，直接可以用 url-loader
                    // 2.当图片大小比 limit 数值大，需要安装 file-loader 并且不用来次文件配置引入
                    limit: 55000,
                    name: "img/[name].[hash:8].[ext]"
                  },
                }
              ]
            },
            // 引入 babel-loader
            // 作用是把最终生成 js 文件中 ES6 的语法编译成 ES5 的语法
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']   // 
                }
              }
            },
            {
              test: /\.vue$/, 
              use: ['vue-loader']
            }
          ],
    },
    resolve:{
      alias:{ // 别名
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins:[
      new webpack.BannerPlugin("最终版权归陈柏霖所有"),
      new HtmlWebpackPlugin({
        template: "index_template.html"
      }),
      // 这个插件的功能是把自动生成的js进行压缩，没必要的字符以及空格都会被删除
      new UglifyjsWebpackPlugin()
    ],
    // 这里是本地起一个服务，可以实现类似热加载，上线前是需要注释的 
    devServer:{
      contentBase: "./dist",
      inline: true
    }
}
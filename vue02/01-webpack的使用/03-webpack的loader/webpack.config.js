
const path = require('path')

module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    // https://webpack.js.org/loaders/css-loader/ 
    // 想要编译加载 css 文件，需要使用 引入对应的 loader
    module:{
      // 注意这里的 版本：css-loader@2.0.2
        rules: [
            {
              test: /\.css$/i,
            //  css-loader 只负责将 css 文件进行加载
            // style-loader 负责将 css 样式添加到 DOM 中生效
            // 使用多个 loader 时，顺序是从右往左加载
              use: ["style-loader", "css-loader"],
            },
            // 注意这里的 版本：less-loader@4.1.0 less@3.9.0
            {
              test: /\.less$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, {
                  loader: "less-loader" // compiles Less to CSS
              }]
          }
          ],
    }
}
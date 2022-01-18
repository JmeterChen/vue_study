
const path = require('path')

module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    // https://webpack.js.org/loaders/css-loader/ 
    module:{
        rules: [
            {
              test: /\.css$/i,
            //  css-loader 只负责将css文件进行加载
            // style-loader 负责将 css 样式添加到 DOM 中
            // 使用多个 loader 时，顺序是从右往左加载
              use: ["style-loader", "css-loader"],
            },
          ],
    }
}
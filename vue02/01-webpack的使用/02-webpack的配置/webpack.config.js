
const path = require('path')

module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
}
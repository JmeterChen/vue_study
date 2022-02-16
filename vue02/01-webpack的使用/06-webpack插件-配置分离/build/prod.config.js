const webpakcMerge = require('webpack-merge')
const baseConfig = require('./base.config')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpakcMerge(baseConfig, {
    plugins:[
        // 这个插件的功能是把自动生成的js进行压缩，没必要的字符以及空格都会被删除
        new UglifyjsWebpackPlugin()
      ],
})
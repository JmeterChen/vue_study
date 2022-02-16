const webpakcMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpakcMerge(baseConfig, {
    devServer:{
        contentBase: "./dist",
        inline: true
      }
})
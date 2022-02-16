

#### 2022-2-16 webpack学习 
##### 1.`webpack-dev-server`

使用步骤：
1. 安装与 `webpack` 版本对应的 `webpack-dev-server`；

```
// 这里 webpack 的版本是 "webpack": "^3.6.0"
npm install webpack-dev-server@2.9.3  --save-dev
```

2. 配置 `webpack-dev-server` 相关参数


```
// webpack.config.js

module.exports = {
    entry: "./src/main.js",
    output: {...},
    module: {...}, 
    resolve: {...},
    plugins: [...],
    devServer:{
        // 作用是本地起一个服务，上线前是需要注释的 
        contentBase: "./dist",  // 指定服务启动的时候根路径
        inline: true,           // 是否需要实时刷新
        port: 9988              // 服务启动的端口，不指定时默认为8000
    }
}
```

3. 设置快捷启动命令

```
// package.json
...
  "scripts": {
    ...
    "dev": "webpack-dev-server  --open" // 这里使用 --open参数可以在启动后立马在浏览器打开
  },
...
```



##### 2. `webpack.config.js` 文件的分离
背景：因为 `webpack.config.js` 未区分环境，包括本地环境或开发环境或生产环境，所以 未分离前可能就是各种配置的集合，一个文件中存在各种环境的配置不偏于维护，所以就可以考虑把公共部分提取放在一个基础文件中，其他环境的定制化配置单独用一个文件维护；

###### 1.文件拆分
`webpack.config.js` 内容被拆分为以下三个文件：
1. `base.config.js`     -- 存放配置文件中公共部分的内容
2. `dev.config.js`      -- 存放开发环境中定制化配置内容
3. `prod.config.js`     -- 存放生产环境中定制化配置内容

###### 2. 安装 `webpack-merge` 
```
npm install webpack-merge@4.1.5 --save-dev
```
###### 3. 定制化配制文件中 引入基础配置文件
- prod.config.js
```
// prod.config.js
const webpakcMerge = require('webpack-merge')
const baseConfig = require('./base.config')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpakcMerge(baseConfig, {
    plugins:[
        // 这个插件的功能是把自动生成的js进行压缩，没必要的字符以及空格都会被删除,一般用于生产环境
        new UglifyjsWebpackPlugin()
      ],
})
```
- dev.config.js

```
const webpakcMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpakcMerge(baseConfig, {
    devServer:{
        contentBase: "./dist",
        inline: true
      }
})
```

截止到此时，对于`webpack.config.js` 文件的分离任务已经完成的差不多了，可以删除原先的 `webpack.config.js` 文件；
删除完成后执行 `npm run buil` 命令发现会报错；

###### 4. 还需要修改打包命令
添加如下参数：

```
// package.json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server  --open --config ./build/dev.config.js"
  },
...
```

但是执行打包时，生成的 `dist` 文件夹会存放在`build`文件夹下，所以还需要更改一个配置
原因是 `base.config.js` 文件中之前有加参数指定 dist 的生成路径，所以还需要更改下原先的路径配置

改之前：
```
// base.config.js
...
module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        // publicPath: "dist/"  // 这里的配置的作用是 打包的时候所有 以url方式引入的 静态文件再次生成后的路径被引入时会加上该路径
    },
    ...
}
```
改之后：

```
// base.config.js
...
module.exports = {
    entry: "./src/main.js",
    output: {
        // 这里需要使用绝对路径，并且是希望动态的
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        // publicPath: "dist/"  // 这里的配置的作用是 打包的时候所有 以url方式引入的 静态文件再次生成后的路径被引入时会加上该路径
    },
    ...
}
```




#### 2022-1-20 webpack 学习
- `babel-loader` 的引入学习
  - 把最终编译生成的 js 文件中的语法统一为 ES5 的语法
- wabpack 中引入 vue
  - vue 的npm方式安装 `npm install vue --save`,这里安装 vue 并不是开发时依赖
  - vue 被引入后 直接使用 vue 实例，会发现报错，需要在 webpack.config.js 中定义申明 
  ```
    resolve:{
      alias:{ // 别名
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  ```
  - 创建 Vue是 template 和 el 的关系
    1. 一般 index.html 文件是不会更改的，只用 body 中的挂载元素指定 vue 实例就ok了
    2. 然后编译时 vue框架会把 vue 实例中纯手敲（后面明显需要抽离的）的 template 元素 替换调挂载vue实例整个元素
    
#### 2022-1-19 webpack 学习
- `css-loader` 的引入学习
- `less-loader` 的引入学习
  - 这里需要注意的是 安装的时候需要安装  `less-loader` 和 `less` 两个模块
- 为了支持编译 image，学了 引入 `url-loader` 和 `file-loader`
  - `url-loader` 使用中 limit 的意义
  1.当图片的大小比 limit 的数值小，则图片会被编译成一个`base64`的字符串被引用；
  2.当图片的大小比 limit 的数值大时，则需要使用 `file-loader` 来进行编译加载
  - `file-loader` 的使用
    1.它会将图片复制然后以hash64算法生成的字符串命名(为了避免重复)新图片保存到 dist 文件夹下
    2.但是发现图片无法正常被加载使用，此时需要在 `webpack.config.js`文件中 output 属性加上声明规则 `publicPath: 'dist'`
      - `publicPath: 'dist'` 的作用是 所有静态文件是以 url 形式引入的打包后生成的文件被引入时前面都会加上 dist；
    3.当项目中的图片很多时，为了方便管理，我们希望打包生成的图片存放在一个文件夹中
      - 为了避免重复且方便管理 我们定义个生成图片的规则 `img/name.hash.ext`
      写法：`"img/[name].[hash:8].[ext]"`

#### 2022-1-18  webpack 学习
- 了解 `commonJS` 和 `ES6` 的模块导出和导入
- 认识开发前端使用模块化思想
- 认识 webpack 编译js 文件机制
- 学习 npm run `xxxx` 命令的实质
  - 使用  `npm run build` 替代 `webpack` 命令编译
  - 直接`webpack`命令使用的是全局安装的，使用npm 替代命令使用的是局部安装的，了解不同点
- css 模块话 使用loader 加载器的引入

- 开发时依赖安装，不同版本的安装包
`npm install webpack@3.6.0 --save-dev`

#### 2022-1-15  组件化开发学习3
- 父子组件的通信复杂案例
  - 实现思路及要点：
  1. 子组件接受父组件传入的数据
  2. 不能再子组件中单纯修改接受父组件数据的变量，不然vue会提示报错，建议在子组件中用新定义的变量承接进行修改其值；
  3. 子组件 input 框中的数据改变时 希望子组件中的数据和父组件传入变量均发生变化；
  4. 子组件1 input 框中的数据希望是 子组件2 input 框的数据 百分之一，这里注意两个input 框变化时都要触发数据更新；

#### 2022-1-14  组件化开发学习
- 父子组件的通信
  - 目前只整理了 props 类型为数组的情况，其他类型已学习
  - 子传父的用法学习 通过$emit 广播进行
  - 计数器通过组件+父子通信的写法实现

#### 2022-1-12  组件化开发学习
- 组件的基础使用写法
- 全局组件和局部组件的写法
- 父组件和子组件的用法
- 组件的模板抽离写法
- 组件的数据存放问题
- 组件中的data 为什么是函数而不是对象
- 父子组件的通信... 
  - 目前只整理了 props 类型为数组的情况，其他类型还需要整理
  - 溜了 睡了先

"# vue_study" 

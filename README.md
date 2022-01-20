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

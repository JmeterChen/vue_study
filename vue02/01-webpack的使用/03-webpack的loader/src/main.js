
// 这里是用的 commonJS 的模块导入写法
const {add, mult} = require("./js/app")


// 这里是用的 ES6 的模块导入写法
import {name, age, height} from './js/info'


// 这里直接引入css模块， 使用webpack命令编译时会报错
// error: You may need an appropriate loader to handle this file type.
// 需要选择一个 支持 css加载的 loader: css-loader
// 3.依赖 css 文件
require('./css/normal.css')

// 4. 引入依赖的 less 文件
require('./css/special.less') 

console.log("这里是main.js文件")
console.log('add:', add(100, 300))
console.log('mult:', mult(20, 30))

console.log("name:", name)
console.log("age:", age)
console.log("height:", height)

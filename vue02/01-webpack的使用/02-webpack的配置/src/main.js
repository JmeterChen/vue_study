
// 这里是用的 commonJS 的模块导入写法
const {add, mult} = require("./app.js")


// 这里是用的 ES6 的模块导入写法
import {name, age, height} from './info.js'


console.log("这里是main.js文件")
console.log('add:', add(100, 300))
console.log('mult:', mult(20, 30))

console.log("name:", name)
console.log("age:", age)
console.log("height:", height)

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

// 5. 使用Vue 进行开发

import Vue from 'vue'

// // 版本0 初始写法
// const app = new Vue({
//     el: "#app",
//     data:{
//         message: "Hello Webpack!"
//     }
// })


// // 版本1：可以简化 省去 app变量
// new Vue({
//     el: "#app",
//     data:{
//         message: "Hello Webpack!",
//         name: "KOBE"
//     },
//     template: `
//     <div>
//         <h2>{{message}}</h2>
//         <button @click='btnClick'>按钮</button> 
//         <p>{{name}}</p>
//     </div>
//     `,
//     methods:{
//         btnClick(){
//             console.log("template元素中的按钮正在被点击！")
//         }
//     }
// })


// // 版本2： 把 vue 实例中的 手敲的元素 template 抽离成一个组件
// // 这种写法还是很蠢！
// const cpn = {
//     template: 
//     `
//     <div>
//         <h2>{{message}}</h2>
//         <button @click='btnClick'>按钮</button> 
//         <p>{{name}}</p>
//     </div>
//     `,
//     data() {
//         return {
//             message: "Hello Webpack!",
//             name: "KOBE"
//         }
//     },
//     methods: {
//         btnClick(){
//             console.log("版本2： 把 vue 实例中的 手敲的元素 template 抽离成一个组件")
//         }
//     },
// }

// // 版本3： 在 src 文件夹下创建 vue文件夹，然后把刚才写的组件 全部剪切到 vue创建 app.js文件中声明导出
// import cpn from '../src/vue/app'

// new Vue({
//     el:"#app",
//     template: '<cpn/>',
//     components:{
//         cpn
//     }
// })


// 版本4： 把抽离出去的组件从js 文件中改写到 vue文件中 并且保证了 元素与数据分离，便于维护

import App from './vue/App.vue'

new Vue({
    el: "#app",
    template: '<App/>',
    components: {
        App
    }
})

// document.writeln('<button>按钮</button>')
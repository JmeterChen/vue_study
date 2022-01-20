export default {
    template: 
    `
    <div>
        <h2>{{message}}</h2>
        <button @click='btnClick'>按钮</button> 
        <p>{{name}}</p>
    </div>
    `,
    data() {
        return {
            message: "Hello Webpack!",
            name: "KOBE"
        }
    },
    methods: {
        btnClick(){
            console.log("版本2： 把 vue 实例中的 手敲的元素 template 抽离成一个组件,并且放在单独的js文件中 导出引用！")
        }
    },
}
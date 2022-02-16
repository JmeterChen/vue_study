<template>
     <div>
        <h2 class="title">{{message}}</h2>
        <button @click='btnClick'>按钮</button> 
        <p>{{name}}</p>
        <info/>
    </div>
</template>

<script>

import info from './Info.vue' // 这里想用文件名称简写，需要去配置下

export default {
    name: "App",
    data() {
        return {
            message: "Hello Webpack!",
            name: "KOBE"
        }
    },
    components:{
        info
    },
    methods: {
        btnClick(){
            console.log("版本4: 总算把 vue引出来了!!! 把 vue 实例中的 手敲的元素 template 抽离成一个组件,并且放在单独的vue文件中 导出引用!")
        }
    },
}
</script>

<style scoped>
    .title{
        color: cornflowerblue;
        font-size: 100px;
    }
</style>
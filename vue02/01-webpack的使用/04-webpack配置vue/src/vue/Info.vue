<template>
    <div>
        <h2>{{title}}</h2>
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    name: "info",
    data() {
        return {
            message: "我是单独组件中的内容!",
            title: "我是单独组件中的标题!"
        }
    },
}
</script>
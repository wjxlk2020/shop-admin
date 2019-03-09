<template>
    <el-row type="flex" justify="space-between" align="middle" class="header">
        <!-- 头部控制菜单栏的收起展开的图标 -->
        <i class="el-icon-back" @click="handleToggle"></i>
        <div>{{username}} {{identity}}</div>
    </el-row>
</template>

<script>

import {mapState} from "vuex";

export default {

    computed: {
        // ... {}
        ...mapState("user",{
            // 下面两种写法都可以获取store的值
            username: "username",
            identity: state => state.identity
        })
    },

    methods: {
        handleToggle: function(){
            // 触发菜单展开事件
            this.$emit("onChange");
        }
    }
}
</script>

<style scoped>
    .header{
        height: 60px;
    }

    .el-icon-back{
        cursor: pointer;
    }
</style>

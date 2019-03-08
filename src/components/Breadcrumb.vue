<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
        <!-- 通过v-for循环渲染路由信息 -->
      <el-breadcrumb-item :to="{ path: item.src }" 
      v-for="(item, index) in routeInfo" 
      :key="index">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed: {
        // 监听路由的变化， 生成一个数组用于渲染面包屑信息
        routeInfo: function(){
            // 获取多个路由记录
            const matched = this.$route.matched;

            // 重新生成一个循环的数据格式
            const newArr = matched.map(v => {
                return {
                    src: v.path,
                    title: v.meta
                }
            })

            return newArr;
        }
    }
};
</script>

<style scoped>
.breadcrumb{
    padding-bottom:20px;
    border-bottom:1px #999 solid;
    margin-bottom:20px;
}
</style>

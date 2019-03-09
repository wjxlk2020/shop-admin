<template>
  <el-breadcrumb separator="/" class="breadcrumb">
  <!-- 通过v-for循环渲染路由信息 -->
  <el-breadcrumb-item :to="{ path:item.src}"
  v-for="(item,index) in routeInfo"
  :key="index">{{item.title}}</el-breadcrumb-item>
  
</el-breadcrumb>
</template>

<script>
export default {
  // mounted () {
  //   console.log(this.$route);
    
  // },
  //监听
  computed:{
    //监听路由的变化，生成一个数组用于渲染面包屑信息
    routeInfo:function(){
      //获取多个路由信息
      const matched=this.$route.matched;

      // console.log(matched);
      
      //重新生成一个循环的数据格式
      const newArr=matched.map(v=>{
        return {
          src:v.path,
          title:v.meta
        }
      })
      return newArr
      // console.log(newArr);
      
    }
  }



}
</script>

<style scoped>
/* scoped当前作用域 */

.breadcrumb{
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>

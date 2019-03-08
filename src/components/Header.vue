<template>
  <el-row type="flex" justify="space-between" class="header" align="middle">
    <!-- 头部控制菜单栏的收起展开图标 -->
    <i class="el-icon-back" @click="handleToggle"></i>
    <div>Admin</div>
  </el-row>
</template>

<script>
export default {
  methods:{
    handleToggle:function(){
      //触发菜单展开事件
      this.$emit("onChange")
    }
  }
}
</script>

<style scoped>
  .header{
    height: 60px;
  }
  .el-icon-back{
    cursor:pointer;
  }
</style>

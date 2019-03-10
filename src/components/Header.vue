<template>
  <el-row type="flex" justify="space-between" align="middle" class="header">
    <!-- 头部控制菜单栏的收起展开的图标 -->
    <i class="el-icon-back" @click="handleToggle"></i>
    <!-- <span class="el-icon-d-caret" @click="handleReturn"></span> -->
    <div>{{username}} {{identity}}</div>
    <a href="javascript:;" @click="handleLogout">退出</a>
  </el-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    // ... {}
    ...mapState("user", {
      // 下面两种写法都可以获取store的值
      username: "username",
      identity: state => state.identity
    })
  },

  methods: {
    handleToggle: function() {
      // 触发菜单展开事件
      this.$emit("onChange");
    },

    //点击退出登陆
    handleLogout() {
     this.$store.dispatch("user/logout",()=>{
          this.$message({
            message: "恭喜你，退出成功",
            type: "success"
            });
        // this.$router.push("/login")
      setTimeout(()=>{
          this.$router.push("/login");
      },1000)
     })
    },

    //返回上一页
    handleReturn(){
      this.$router.back();
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 60px;
  // i{
  //   flex:3%
  // }
  // span{
  //   flex:15%;
  //   font-size: 30px;
  //   color:chartreuse;
  //   cursor:pointer;
  // }
  // div{
  //   flex:35%;
  //   color:orange;
  //   font-weight: 600;
  //   font-size: 20px;
  // }
  // a{
  //   flex:35%
  // }
}

.el-icon-back {
  cursor: pointer;
}
</style>

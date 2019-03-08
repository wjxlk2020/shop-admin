<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


// //导入axios
// import axios from "axios"

export default {
  name: 'app',
  //生命周期：页面加载完，在执行
 mounted(){
    // 请求是否登录的接口
    this.$axios(
      {
        url: "/admin/account/islogin",
        withCredentials: true
      } ).then(res => {
      if(res.data.code === "nologin"){
        // this.$router.push("/login");
      }
    })
  },
  
 
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .mt20{
    margin-top: 20px;
  }
  .mb20{
    margin-bottom: 20px;
  }
</style>

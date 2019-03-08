<template>
  <div class="login-form">
    <h5>登录</h5>
  <el-form :model="formData" status-icon label-width="100px" >
    <!-- el-form-item是el-form的子组件，不能放到el-form的外部 -->
  <el-form-item label="账号">
    <el-input  v-model="formData.uname" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" >
    <el-input type="upwd" v-model="formData.upwd" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item class="btn">
    <el-button type="primary" @click="submitForm('formData')">提交</el-button>
    <el-button @click="resetForm('formData')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          uname: '',
          upwd: '',
        },
       
      };
    },
    methods: {
      submitForm(formName) {
        //获取数据
      // console.log(this.formData);    
        //提交到接口       
        this.$axios({
          url:"/admin/account/login",
          method:"POST",
          data:this.formData
        }).then(res=>{
          // console.log(res);
          const {status,message}=res.data;

          //如果登录错误
          if(res.data.status===1){
            this.$message.error(message)
          }else{
            //返回上一页
            this.$router.back();
          }        
        })

      },
      resetForm(formName) {
        //重置表单
        this. formData={
          uname: '',
          upwd: '',
        }
      }
    }
  }
</script>
<style lang="less">

  .login-form{
    h5{
      text-align: center;
      color:skyblue;
      font-size: 20px;
      //去掉加粗
      font-weight: normal;
      margin: 0 -320px 13px -250px;
    }
    // 让元素居中显示
    width: 500px;
    position:absolute;
    left: 50%;
    top:50%;
    margin: -120px 0 0 -250px;
    .btn{
    text-align: center
    }
  }
</style>

<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.user_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formLabelAlign.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      formLabelAlign: {
        user_name: "",
        mobile: "",
        email: ""
      }
    };
  }
};
</script>
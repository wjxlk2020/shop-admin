<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="置顶" name="type"></el-checkbox>
        <el-checkbox label="热门" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-col :span=10><el-input v-model="form.name"></el-input></el-col>
      
    </el-form-item>

    <el-form-item label="副标题">
      <el-col :span=10><el-input v-model="form.name"></el-input></el-col>
      
    </el-form-item>

    <!-- 单张图片上传 -->
    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-col :span=10> <el-input v-model="form.name"></el-input></el-col>
     
    </el-form-item>

    <el-form-item label="库存数量">
      <el-col :span=10><el-input v-model="form.name"></el-input></el-col>
      
    </el-form-item>

    <el-form-item label="市场价格">
      <el-col :span=10> <el-input v-model="form.name"></el-input></el-col>
     
    </el-form-item>

    <el-form-item label="销售价格">
      <el-col :span=10><el-input v-model="form.name"></el-input></el-col>
      
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-col :span=16><el-input type="textarea" v-model="form.desc"></el-input></el-col>
      
    </el-form-item>

    <el-form-item label="内容描述">
      <el-col :span=16>
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor
          v-model="form.content"
          
        ></quill-editor>
      </el-col>
      
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
         content: " ",
      },
      // 单照片
      imageUrl: "",
      // 多照片
      dialogImageUrl: "",
      dialogVisible: false,

     
      editorOption: {
        // some quill options
      }
    };
  },

//  注册富文本编辑器插件
  components: {
    quillEditor
  },


  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  },

  methods: {
    onSubmit() {
      console.log(this.form);
    },

    //单图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //判断图片是否大于2m，如果是的就不上传
    beforeAvatarUpload(file) {
      //头像预览，把图片解析成base64字符串
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //移出选中的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

  
  }
};
</script>
<style>
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

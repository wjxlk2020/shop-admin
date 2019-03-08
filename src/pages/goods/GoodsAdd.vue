<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">

      <el-select v-model="form.category_id" placeholder="请选择活动区域">

        <!-- label是分组的标题 -->
        <!-- <el-option-group v-for="(item, index) in categorys" :key="index" :label="item.title">
          <el-option
            v-for="(subItem, subIndex) in item.group"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
          ></el-option>
        </el-option-group> -->

        <!-- 这种写法很脆弱，不是任何情况下都适合，比如后台修改了数据的category_id的排序，这种循环就不能使用  -->
        <!-- 虽然可以手动排序，但是还是不会出第三级 -->
        <el-option-group v-for="(item, index) in categorys" 
        v-if="item.parent_id === 0"
        :key="index" 
        :label="item.title">
          <el-option
            v-for="(subItem, subIndex) in categorys"
            v-if="subItem.parent_id == item.category_id"
            :key="subIndex"
            :label="subItem.title"
            :value="subItem.category_id"
          ></el-option>
        </el-option-group>

      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="是否显示">
      <el-switch v-model="form.is_slide"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- 单张图片上传 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleFileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>

    <!-- 图片预览的弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述" class="editor">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入富文本编辑的css文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 引入编辑器组件
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        category_id: "", // 类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",

        // 封面图片
        imgList: [],
        // 多张图片
        fileList: [],
        is_slide: false
      },

      // 头像图片
      imageUrl: "",


      // 图片墙的预览图片链接
      dialogImageUrl: "",
      // 是否预览图片
      dialogVisible: false,
      // 类别数据
      categorys: [],
    };
  },

  // 祖册组件
  components: {
    quillEditor
  },

  mounted(){
      // 请求分类的数据
      this.$axios({
          method: "GET",
          url: `/admin/category/getlist/goods`,
      }).then(res =>{
            const {message} = res.data;

            this.categorys = message;

            // 2.*************************************
            // 思考： 为什么没有渲染出夏装 #17条

            // 最终保存的结果数组
            // let options = [];

            // message.forEach(v => {
            //     // 当前类别是顶级类别时候
            //     if(v.parent_id == 0){
            //         v.group = [];
            //         options.push(v)
            //     }else{
            //         // 子类别判断
            //         options.forEach(item => {
            //             // 如果成立的话当前类别就是options其中一个顶级类别子选项
            //             if(item.category_id == v.parent_id){
            //                 item.group.push(v);
            //             }
            //         })
            //     }
            // })
            
            // this.categorys = options;
      })

  },

  methods: {
    // 提交表单
    onSubmit() {
      
        this.$axios({
            method: "POST",
            url: "/admin/goods/add/goods",
            data: this.form,
            // 处理跨域
            withCredentials: true,
        }).then(res => {
            const {message, status} = res.data;

            if(status == 0){
                this.$message({
                    message: message,
                    type: 'success'
                });

                setTimeout(() => {
                    this.$router.replace("/admin/goods-list")
                }, 1000)
            }
        })

    },

    // 上传封面图片成功的回调函数
    handleAvatarSuccess(res, file) {
        // 头像预览，把图片解析成base64字符串
        this.imageUrl = window.URL.createObjectURL(file.raw);
    
        this.form.imgList = [res];
    },

    // 上传图片相册的成功回调函数
    handleFileList(res){
        this.form.fileList.push(res);
    },

    // 判断图片是否大于2m， 如果是的话不上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 移除选中的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style>
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

/*   清楚富文本编辑的line-height */
.editor .el-form-item__content {
  line-height: unset;
}
</style>

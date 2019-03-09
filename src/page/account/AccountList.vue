<template>
  <div>
    <!-- 顶部的工具栏 -->
    <el-row type="flex" justify="space-between" align="middle">
      <div></div>
      <!-- 搜索框 -->
      <div>
        <el-input placeholder="会员名称" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
<el-row type="flex" justify="space-between" align="middle">
    <!-- 表格 -->
    <!-- data用于接收表格数据，tableData是data中的数据，由后台返回的 -->
    <el-table :data="tableData" style="width: 100%;" class="mt20" @selection-change="handleSelectionChange">
      
      <!-- 表格的多选 -->
      <el-table-column type="selection" width="55"></el-table-column>
    
      <!-- 每一列的数据, prop定义数据结构对象要显示的属性 -->
      <el-table-column label="姓名" width="260">
        
      </el-table-column>

      <el-table-column label="手机号码" width="180" prop="categoryname"></el-table-column>

      <el-table-column label="邮箱" width="180">
        
      </el-table-column>

      <el-table-column label="时间" width="180" prop="categoryname"></el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button> 
        </template>
      </el-table-column>
     
     
    </el-table>
</el-row>
    <!-- 分页组件 -->
    <!-- size-change: 切换页面数据显示条数的时候触发 -->
    <!-- current-change： 切换页面时候触发 -->
    <!-- current-page 代表当前页 -->
    <!-- total: 数据的总条数 -->
    <div class="block mt20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 当前的页面
      pageIndex: 1,
      // 当前显示的条数
      pageSize: 5,
      // 搜索条件
      searchValue: "",
      // 数据总条数
      totalCount: 0,

      // 保存要删除的商品
      idsStr: ""
    };
  },

  mounted() {
    // 请求页面的数据
    this.getList();
  },

  methods: {
    getList(){
      // 请求商品类别数据
      this.$axios
        .get(
          `http://localhost:8899/admin/goods/getlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
        )
        .then(res => {
          // 获取返回的数据
          const { data } = res;
          // 表格的数据
          this.tableData = data.message;
          // 修改总条数
          this.totalCount = data.totalcount;
        });
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      //row.id就是当前编辑商品的id
      this.$router.push(`/admin/goods-edit/${row.id}`)
    },

    // 切换显示条数时候触发
    handleSizeChange(num) {
      // console.log(num);
      
      this.pageSize = num;
      this.getList();
    },

    // 切换页数触发
    handleCurrentChange(num) {
      // 把pageIndex修改为当前选择的页面
      // console.log(num);
      this.pageIndex = num;
      this.getList();
    },

    // 当表格选择时候触发
    handleSelectionChange(data){
      // data是一个数组，当前选中商品
      const ids = data.map(v => {
        return v.id
      })

      // 拼接选中商品的id
      const idsStr = ids.join(",");

      // 保存到data里面
      this.idsStr = idsStr;
    },

    // 删除商品时候触发
    handleDelete(ids){
      // 删除的操作
      this.$axios.get(`http://localhost:8899/admin/goods/del/${ids}`).then(res => {
        const {message, status} = res.data;

        // 删除成功
        if(status == 0){
          this.$message({
            message: message,
            type: 'success'
          });

          // 重新请求数据
          this.getList();
        }
      })
    },

    // 跳转到新增商品
    handleToGoodsAdd(){
      this.$router.push("/admin/goods-add");
    },

    // 点击搜索按钮时候触发
    handleSearch(){
      // 把当前页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getList();
    }
  },

  // 过滤器
  filters: {
    tofixed: function(data) {
      return Number(data).toFixed(2);
    }
  }
};
</script>

<style scoped>
.goods-img{
  width: 64px;
  height: 64px;
  display: block;
  margin-right: 10px;
  flex-shrink: 0;
}
</style>

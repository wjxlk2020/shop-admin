import Vue from 'vue'
import App from './App.vue'

//导入axios
import axios from "axios"

//element-ui; 1.引入
import ElementUI from "element-ui";

//element-ui; 2.引入样式
import 'element-ui/lib/theme-chalk/index.css'

//引入vue-router
import VueRouter from "vue-router";
//导入组件
import Login from "./page/Login"
import Admin from "./page/Admin"

import GoodsList from "./page/goods/GoodsList"
import GoodsAdd from "./page/goods/GoodsAdd"

import CategoryList from "./page/category/CategoryList"

//富文本编辑器(全局的)
// import VueQuillEditor from 'vue-quill-editor'
// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor, /* { default global options } */ )




//注册插件
Vue.use(VueRouter)

//element-ui; 3.注册插件
Vue.use(ElementUI)

Vue.config.productionTip = false;

//配置路由
const routes =[
  {path:"/",redirect:"/admin"},
  {path:"/login",component:Login,meta:"登录页"},
  {path:"/admin",component:Admin,
  meta:"管理后台",
  redirect:"/admin/goods-list",
  children:[
    { path: "goods-list", component: GoodsList, meta: "商品列表" },
    {path:"goods-add",component:GoodsAdd,meta:"添加商品"},

    { path: "cacategory-list", component: CategoryList,meta:"商品栏目"},
  ]}
]

//创建路由对象
const router = new VueRouter({routes})

//给axios给此请求自动加上域名
// axios.defaults.baseURL="http://localhost:8899";

// 给axios给次请求自动加上域名
axios.defaults.baseURL = 'http://localhost:8899';

//给vue构造函数的原型连添加￥axios
Vue.prototype.$axios=axios;

new Vue({
  router,
  render: h => h(App),
 
}).$mount('#app')

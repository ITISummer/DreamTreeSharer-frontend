/* 路由器模块 - 用于匹配请求 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginAndRegister from "../views/LoginAndRegister/LoginAndRegister";
import Home from "../views/Home/Home";
import Comments from "../views/Comments/Comments";
import CommentsTest from "../views/Comments/CommentsTest";
import Upload from "../views/Upload/Upload";
// 相当于 controller 层，起转发请求的作用
Vue.use(VueRouter)
// 定义 routes 对象数组
// const baseURL = '/api'
const baseURL = ''
const routes = [
    // 转发一个请求
    {
        name: '登录',
        // 路由路径，根路径，默认显示此路径下的内容
        path: `${baseURL}/`,
        // 绑定的路由会跳转的组件 LoginAndRegister.vue
        component: LoginAndRegister,
    },
    {
        name: '首页',
        path: `${baseURL}/home`,
        component: Home,
    },
    {
        name: '评论',
        path: `${baseURL}/comments`,
        component: Comments,
    },
    {
        name: '上传',
        path: `${baseURL}/upload`,
        component: Upload,
    },

]

const router = new VueRouter({routes})

export default router

/* 路由器模块 - 用于匹配请求 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginAndRegister from "../views/LoginAndRegister/LoginAndRegister";
import Home from "../views/Home/Home";
import Option2 from "../views/Option/Option2";
import Option1 from "../views/Option/Option1";
// 相当于 controller 层，起转发请求的作用
Vue.use(VueRouter)
// 定义 routes 对象数组
const routes = [
    // 转发一个请求
    {
        // 路由路径，根路径，默认显示此路径下的内容
        path: '/',
        // 绑定的路由会跳转的组件 LoginAndRegister.vue
        component: LoginAndRegister,
        show: true
    },
    {
        name: '导航栏',
        path: '/home',
        component: Home,
        children: [
            {
                name: '选项1',
                path: '/option1',
                component: Option1
            },
            {
                name: '选项2',
                path: '/option2',
                component: Option2
            },
        ]
    },

]

const router = new VueRouter({routes})

export default router

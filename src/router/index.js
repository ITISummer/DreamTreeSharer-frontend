/* 路由器模块 - 用于匹配请求 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginAndRegister from "../views/LoginAndRegister/LoginAndRegister";
import Home from "../views/Home/Home";
import Comments from "../components/Comments/Comments";
import Upload from "../components/Upload/Upload";
import PersonalCenter from "../views/PersonalCenter/PersonalCenter";
import PinBoards from "../views/PersonalCenter/PinBoards/Pinboards";
import AccountSetting from "../views/PersonalCenter/AccountSetting/AccountSetting";
import OnlineChat from "../views/PersonalCenter/Chat/OnlineChat";
import Parent from "../../vue-componet-communication/1-props& $emit/Parent";
import Child from "../../vue-componet-communication/1-props& $emit/Child";
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
    {
        name: '个人中心',
        path: `${baseURL}/personal-center`,
        component: PersonalCenter,
        children: [
            {
                name: '账户设置',
                path: `${baseURL}/account-setting`,
                component: AccountSetting,
            },
            {
                name: '梦卡管理',
                path: `${baseURL}/pin-boards`,
                component: PinBoards,
            },
            {
                name: '在线聊天',
                path: `${baseURL}/chat`,
                component: OnlineChat,
            },
        ]
    },
    {
        name: 'parent',
        path: '/parent',
        component: Parent,
    },
    {
        name: 'child',
        path: '/child',
        component: Child,
    },
]

const router = new VueRouter({routes})
export default router

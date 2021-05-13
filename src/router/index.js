/* 路由器模块 - 用于匹配请求 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginAndRegister from "../views/LoginAndRegister/LoginAndRegister";
import Home from "../views/Home/Home";
import PersonalCenter from "../views/PersonalCenter/PersonalCenter";
import PinBoards from "../views/PersonalCenter/PinBoards/Pinboards";
import AccountSetting from "../views/PersonalCenter/AccountSetting/AccountSetting";
import OnlineChat from "../views/PersonalCenter/Chat/OnlineChat";
import Parent from "../../vue-componet-communication/8- $attrs & $listeners/Parent";
import Favorites from "../views/Favorites/Favorites";
import Profile from "../views/Profile/Profile";
// 相当于 controller 层，起转发请求的作用
Vue.use(VueRouter)
// 定义 routes 对象数组
// const baseURL = '/api'
const baseURL = ''
const routes = [
    //----------vue-component-communication 测试使用----------
    {
        name: 'parent',
        path: '/parent',
        component: Parent,
    },
    //----------vue-component-communication 测试使用----------
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
        name: '个人首页',
        path: `${baseURL}/profile`,
        component: Profile,
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
            {
                name: '收藏夹',
                path: `${baseURL}/favorites`,
                component: Favorites,
            },
        ]
    },
]

const router = new VueRouter({routes})
export default router

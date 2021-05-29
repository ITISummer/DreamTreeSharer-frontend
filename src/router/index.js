/* 路由器模块 - 用于匹配请求 */
import Vue from 'vue'
import VueRouter from 'vue-router'
/* 懒加载：[Vue路由和组件的懒加载](https://www.jianshu.com/p/6fb92ea1790d)*/
const LoginAndRegister = () => import( "../views/LoginAndRegister/LoginAndRegister");
const Home = () => import("../views/Home/Home");
const PersonalCenter = () => import ("../views/PersonalCenter/PersonalCenter");
const PinBoards = () => import("../views/PersonalCenter/PinBoards/Pinboards")
const AccountSetting = () => import("../views/PersonalCenter/AccountSetting/AccountSetting")
const OnlineChat = () => import("../views/PersonalCenter/Chat/OnlineChat")
const Parent = () => import("../../vue-componet-communication/8- $attrs & $listeners/Parent")
const Favorites = () => import("../views/Favorites/Favorites")
const Profile = () => import("../views/Profile/Profile")
// 相当于 controller 层，起转发请求的作用
Vue.use(VueRouter)
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

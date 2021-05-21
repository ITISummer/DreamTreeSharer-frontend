import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {store} from './store'
import requests from './apis/constants'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {postRequest, deleteRequest, putRequest, getRequest} from "./apis/api";
import constants from "./apis/constants";

/*==============================vue 全局配置==================================*/
Vue.use(ElementUI)
// 使用中文时间
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.baseUrl = constants.qiniu.uploadQiniuAddr

/*==============================路由导航守卫==================================*/
/**
 * 路由导航守卫 - 防止用户手动刷新操作导致 vuex 数据为空
 * 配置路由导航守卫后，对每一次页面之间跳转都会进行初始化操作
 * 而判断是否需要初始化操作的条件是：用户是否登录，当用户是登录状态，则 localStorage 里存在 token
 * [#Action](https://vuex.vuejs.org/zh/guide/actions.html)
 */
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('token')) {
        // 判断用户信息是否存在
        // [js 判断一个 object 对象是否为空](https://blog.csdn.net/FungLeo/article/details/78113661)
        // if (!window.sessionStorage.getItem('userInfo')) {
        if (Object.keys(store.getters.getUserInfo).length === 0) {
            return getRequest(requests.GET_CURRENT_USER_INFO).then(resp => {
                if (resp) {
                    // 存入用户信息
                    // window.sessionStorage.setItem('userInfo', JSON.stringify(resp.object))
                    // // store.dispatch() 触发 store 的 action 方法
                    store.dispatch('initUserInfo', resp.object).then(r => true)
                    next()
                }
            })
        }
        if (to.path === requests.ROOT) {
            alert('main.js->router.beforeEach')
        } else {
            // next()：放行请求，必须加
            next()
        }
    } else {
        // 判断用户点击要去的页面是否是登录页请求
        if (to.path === requests.ROOT) {
            next()
        } else {
            next('/?redirect=' + to.path)
        }
    }
})
/*==============================程序主入口渲染 app 组件==========================*/
new Vue({
    // 路由组件 - 对应 src/router/index.js
    router,
    // 状态组件 - 对应 src/store/index.js - 全局
    /*
    为了在 Vue 组件中访问 this.$store property，
    你需要为 Vue 实例提供创建好的 store。
    Vuex 提供了一个从根组件向所有子组件， 以 store 选项的方式“注入”该 store 的机制
     */
    store,
    render: h => h(App) // 渲染到 App.vue 组件里的内容 (template 标签里的内容)
}).$mount('#app') // 手动挂载，相当于 el: '#app' index.html 中的 app

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
// 全局调用 - 插件形式使用请求
import {postRequest,deleteRequest,putRequest,getRequest} from "./utils/api";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;

//程序主入口渲染 app 组件
new Vue({
  // 路由组件 - 对应 src/router
  router,
  // 状态组件 - 对应 src/store
  store,
  render: h => h(App) // 渲染到 App.vue 组件里的内容 (template 标签里的内容)
}).$mount('#app') // 手动挂载，相当于 el: '#app' index.html 中的 app

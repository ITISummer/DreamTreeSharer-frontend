import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    /**
     * 存储并管理后端返回的数据
     */
    state: {
        routes: []
    },
    /**
     * 同步改变 state 中存储的对象
     */
    mutations: {
        initRoutes(state, data) {
            state.routes = data
        }
    },
    /**
     * 异步改变 state 中存储的对象
     */
    actions: {}
})
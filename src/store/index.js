import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    /**
     * 存储并管理后端返回的数据<br>
     * 保存和管理所有组件公共（通信）的数据
     */
    state: {
        /** 菜单 */
        routes: [],
        /** 当前登录用户 */
        userInfo: {},
    },
    /**
     * actions 中进行提交，触发 mutations 改变 state
     * 同步改变（唯一能够改变state内容的方法） state 中存储的对象
     */
    mutations: {
        /**
         * 初始化菜单
         * @param state
         * @param data
         */
        initRoutes(state, data) { state.routes = data },

    },
    /**
     * 异步改变 state 中存储的对象
     * vue 组件中通过 dispatch 触发 actions 里的函数
     * actions 里的函数通过 commit 提交 mutations 更改，
     * 然后 mutation 更新 state 里的数据
     */
    actions: {}
})
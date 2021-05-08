import {INIT_USERINFO} from './mutation-types'

/**
 * actions 中进行提交（注册）- commit()，触发 mutations 改变 state
 * 同步改变（唯一能够改变 state 内容的方法） state 中存储的对象
 * 接受 state 作为第一个参数
 * 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
 * Mutation 必须是同步函数
 */
export default {
    //----------vue-component-communication 测试使用----------
    receiveAMsg(state, payload) {
        // 将A组件的数据存放于state
        state.AMsg = payload.AMsg
    },
    receiveBMsg(state, payload) {
        // 将B组件的数据存放于state
        state.BMsg = payload.BMsg
    },
    //----------vue-component-communication 测试使用----------
    initDreamForm(state, data) {
        state.dreamForm = data
    },
    initDialog(state,data) {
        state.showDialog = data
    },
    /**
     * 初始化菜单
     * @param state state 作为第一个参数
     * @param data 传入的额外的参数：载荷（payload）
     * store.commit('initRoutes', {10})
     * 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
     */
    initRoutes(state, data) {
        state.routes = data
    },

    /** 在线聊天系统 */
    // initData(state) {
    // let data = localStorage.getItem('vue-chat-session');
    // //console.log(data)
    // if (data) {
    //     state.sessions = JSON.parse(data);
    // }
    // },
    /** 初始化用户聊天列表 */
    INIT_USERS(state, data) {
        state.users = data
    },
    /**存入用户信息*/
    [INIT_USERINFO](state, data) {
        state.userInfo = data
    },

    changeCurrentSessionId(state, id) {
        state.currentSessionId = id;
    },
    /**
     * UserText 中按下 ctrl+enter 添加一条信息
     */
    addMessage(state, msg) {
        // [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
        // [ES6 新增数据结构](https://www.bilibili.com/video/BV1Pz4y1S7Uv?p=33)
        if (state.sessions.has(state.currentSessionId)) {
            state.sessions.get(state.currentSessionId).push({content: msg, date: Date(), self: true})
        } else {
            let messages = []
            state.sessions.set(state.currentSessionId, messages.push({content: msg, date: Date(), self: true}))
        }
    },
}

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
}

import Vue from "vue";
import Vuex from 'vuex'
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

const now = new Date();


/**
 * [Vuex 是什么？](https://vuex.vuejs.org/zh/)
 * 因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？
 * 在这种模式下，我们的组件树构成了一个巨大的“视图”，
 * 不管在树的哪个位置，任何组件都能获取状态或者触发行为！
 */
export const store = new Vuex.Store({
    state,
    mutations,
    actions,
})
/** store */
store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})
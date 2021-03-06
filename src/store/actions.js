
/**
 * 可异步提交到 mutations 然后 mutations 同步改变 state 中存储的数据
 * vue 组件中通过 dispatch 触发 actions 里的函数
 * [#Action](https://vuex.vuejs.org/zh/guide/actions.html)
 *
 * Action 类似于 mutation，不同在于：
 *  Action 提交的是 mutation，而不是直接变更状态。
 *  Action 可以包含任意异步操作。
 *
 *  可通过 store.dispatch() 触发。例如：store.dispatch('initData')
 *
 *  Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
 */
export default {
}

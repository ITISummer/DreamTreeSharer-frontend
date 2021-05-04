import Vue from "vue";
import Vuex from 'vuex'
import {INIT_USERINFO} from './mutation-types'

Vue.use(Vuex)

const now = new Date();


/**
 * [Vuex 是什么？](https://vuex.vuejs.org/zh/)
 * 因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？
 * 在这种模式下，我们的组件树构成了一个巨大的“视图”，
 * 不管在树的哪个位置，任何组件都能获取状态或者触发行为！
 */
export const store = new Vuex.Store({
    /**
     * 管理后端返回的数据状态<br>
     * 保存和管理所有组件公共（通信）的数据
     */
    state: {
        // 初始化A和B组件的数据，等待获取
        //----------vue-component-communication 测试使用----------
        AMsg: '',
        BMsg: '',
        //----------vue-component-communication 测试使用----------
        /** 菜单 */
        routes: [],
        /** 当前登录用户 */
        userInfo: {},
        /** 用户添加卡片功能所需表单 */
        dreamForm: {},
        /** 在线聊天系统 */
        sessions: [
            {
                id: 1,
                user: {
                    name: '示例介绍',
                    img: 'https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/nv1.jpg'

                },
                messages: [{
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now
                }, {
                    content: '项目地址(原作者): https://github.com/coffcer/vue-chat',
                    date: now
                }, {
                    content: '本项目地址(重构): https://github.com/is-liyiwei',
                    date: now
                }]
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/%E5%A5%B3%E4%BA%8C%E5%8F%B7.jpg'
                },
                messages: [{
                    content: 'Hi，我是webpack哦',
                    date: now
                }]
            }],
        currentSessionId: 1,
        filterKey: ''
    },
    /**
     * actions 中进行提交（注册）- commit()，触发 mutations 改变 state
     * 同步改变（唯一能够改变 state 内容的方法） state 中存储的对象
     * 接受 state 作为第一个参数
     * 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
     * Mutation 必须是同步函数
     */
    mutations: {
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
        initDreamForm(state,data) {
          state.dreamForm = data
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
        initData(state) {
            let data = localStorage.getItem('vue-chat-session');
            //console.log(data)
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        /**存入用户信息*/
        [INIT_USERINFO](state, data) {
            state.userInfo = data
        },

        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions[state.currentSessionId - 1].messages.push({
                content: msg,
                date: new Date(),
                self: true
            })
        },
    },
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
    actions: {
        /**在线聊天系统*/
        initData(context) {
            context.commit('initData')
        },
        /**存入用户信息*/
        initUserInfo(context,data) {
            context.commit('INIT_USERINFO',data)
        },
        // /**存入用户信息 - 运用 ES6 的解构赋值，传入的 context 对象包含 commit,state 等*/
        // initUserInfo({commit},data) {
        //     commit('INIT_USERINFO',data)
        // },
       initDreamForm(context,data) {
            context.commit('initDreamForm',data)
       }
    },
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
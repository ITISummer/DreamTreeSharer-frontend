import {getRequest} from "../apis/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

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
    /**在线聊天系统*/
    chatConnect(context) {
        //[Uncaught TypeError: WebSocketClient is not a constructor](https://github.com/jmesnil/stomp-websocket/issues/129)
        // context.state.stomp = Stomp.client(new SockJS('/ws/ep'))
        context.state.stomp = Stomp.over(new SockJS('/ws/ep'))
        let token = window.sessionStorage.getItem('token')
        context.state.stomp.connect({'Auth-Token': token}, success => {
            console.log('actions.js->stomp.connect()')
            context.state.stomp.subscribe('/user/queue/chat', msg => {
                console.log('actions.js->chatConnect->msg.body',msg.body)
            })
        }, error => {
            console.log('actions.js->chatConnect->error', error)
        })
    },
    /** 初始化用户聊天列表 */
    initUsers(context) {
        getRequest('/get-user-list').then(resp => {
            if (resp) {
                context.commit('INIT_USERS', resp.object)
            }
        })
    },
    /** 初始化 pinboardInfo */
    initPinboardInfo(context,data) {
      context.commit('initPinboardInfo',data)
    },
    /**存入用户信息*/
    initUserInfo(context, data) {
        context.commit('INIT_USERINFO', data)
    },
    initDreamForm(context, data) {
        context.commit('initDreamForm', data)
    },
    initDialog(context, data) {
        context.commit('initDialog',data)
    }
}

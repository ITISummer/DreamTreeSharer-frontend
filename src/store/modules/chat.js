import {getRequest} from "../../apis/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const state = {
    /** 在线聊天系统 */
    sessions: Map,
    users: [], // 用户聊天朋友列表
    currentSessionId: '',
    filterKey: '',
    stomp: null,
}

const mutations = {
    /** 初始化用户聊天列表 */
    INIT_USER_LIST(state, data) {
        state.users = data
    },

    CHANGE_CURRENT_SESSION_ID(state, id) {
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

const actions = {
    /**
     * 在线聊天系统
     * [websocket 流程讲解](https://segmentfault.com/a/1190000016309473)
     * */
    chatConnect(context) {
        //[Uncaught TypeError: WebSocketClient is not a constructor](https://github.com/jmesnil/stomp-websocket/issues/129)
        // context.state.stomp = Stomp.client(new SockJS('/ws/ep'))
        context.state.stomp = Stomp.over(new SockJS('/ws/ep'))
        console.log('action.js->after stomp.over()================================')
        let token = window.sessionStorage.getItem('token')
        context.state.stomp.connect({'Auth-Token': token}, success => {
            console.log('actions.js->stomp.connect()', success)
            context.state.stomp.subscribe('/user/queue/chat', msg => {
                console.log('actions.js->chatConnect->msg.body', msg.body)
            })
        }, error => {
            console.log('actions.js->chatConnect->error', error)
        })
    },
    /** 初始化用户聊天列表 */
    initUsers(context) {
        getRequest('/get-user-list').then(resp => {
            if (resp) {
                context.commit('INIT_USER_LIST', resp.object)
            }
        })
    },
    changeCurrentSessionId(context,id) {
        context.commit('CHANGE_CURRENT_SESSION_ID',id)
    }
}

export default {
    state,
    mutations,
    actions,
};

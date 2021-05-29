import {getRequest} from "../../apis/api";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import Vue from "vue";
import {INIT_USERINFO} from "../mutation-types";
import {Notification} from "element-ui";

const state = {
    // 在线聊天系统会话存储 - localStorage
    sessions: {},
    // 用户聊天朋友列表
    users: [],
    // 当前登录用户
    currentUser: {},
    // 当前聊天对象
    currentSession: null,
    // 新消息红色小点提示
    isDot: {},
    filterKey: '',
    stomp: null,
}

/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
const mutations = {
    /** 初始化用户聊天列表 */
    INIT_CHAT_LIST(state, data) {
        state.users = data
    },

    CHANGE_CURRENT_SESSION(state, currentSession) {
        state.currentSession = currentSession;
        Vue.set(state.isDot, state.currentUser.userUsername + '#' + state.currentSession.userUsername, false);
    },
    /**
     * UserText 中按下 ctrl+enter 添加一条信息
     * [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
     * [ES6 新增数据结构](https://www.bilibili.com/video/BV1Pz4y1S7Uv?p=33)
     */
    ADD_MESSAGE(state, msg) {
        let session = state.sessions[state.currentUser.userUsername + '#' + msg.to];
        if (!session) {
            // 使 vue 能够监听 sessions
            Vue.set(state.sessions, state.currentUser.userUsername + '#' + msg.to, []);
        }
        state.sessions[state.currentUser.userUsername + '#' + msg.to].push({
            content: msg.content,
            date: new Date(),
            self: !msg.notSelf
        })
    },
    /** 在线聊天系统 */
    INIT_DATA(state) {
        let data = localStorage.getItem('vue-chat-session');
        if (data) {
            state.sessions = JSON.parse(data);
        }
    },
    /**存入用户信息*/
    [INIT_USERINFO](state, data) {
        state.currentUser = data
    },
}
/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
const actions = {
    /**
     * 在线聊天系统
     * [websocket 流程讲解](https://segmentfault.com/a/1190000016309473)
     * [Uncaught TypeError: WebSocketClient is not a constructor]
     * (https://github.com/jmesnil/stomp-websocket/issues/129)
     * */
    chatConnect(context) {
        context.state.stomp = Stomp.over(new SockJS('/ws'))
        let token = window.sessionStorage.getItem('token')
        context.state.stomp.connect({'Auth-Token': token}, success => {
            context.state.stomp.subscribe('/user/queue/chat', msg => {
                let receiveMsg = JSON.parse(msg.body);
                // 消息提示
                if (!context.state.currentSession || receiveMsg.from !== context.state.currentSession.userUsername) {
                    Notification.info({
                        title: '【' + receiveMsg.fromNickName + '】发来一条消息',
                        message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                        position: 'bottom-right'
                    });
                    Vue.set(context.state.isDot, context.state.currentUser.userUsername + '#' + receiveMsg.from, true);
                }
                receiveMsg.notSelf = true;
                receiveMsg.to = receiveMsg.from;
                context.commit('ADD_MESSAGE', receiveMsg);
            })
        }, error => {
            console.log('actions.js->chatConnect->error', error)
        })
    },
    /** 初始化用户聊天列表 */
    initChatList(context, chatList) {
        context.commit('INIT_CHAT_LIST', chatList)
    },
    changeCurrentSession(context, currentSession) {
        context.commit('CHANGE_CURRENT_SESSION', currentSession)
    },
    /**浏览器本地聊天记录*/
    initData(context) {
        context.commit('INIT_DATA');
    },

    /**初始化用户信息*/
    initUserInfo(context, data) {
        context.commit('INIT_USERINFO', data)
    },

}

export default {
    state,
    mutations,
    actions,
};

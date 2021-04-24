import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();

const store = new Vuex.Store({
    /**
     * 存储并管理后端返回的数据<br>
     * 保存和管理所有组件公共（通信）的数据
     */
    state: {
        /** 菜单 */
        routes: [],
        /** 当前登录用户 */
        userInfo: {},
        /** 在线聊天系统 */
        sessions:[{
      	id:1,
      	user:{
      		name:'示例介绍',
      		img:'https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/nv1.jpg'

      	},
      	messages:[{
      		content:'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
      		date:now
      	},{
      		content:'项目地址(原作者): https://github.com/coffcer/vue-chat',
      		date:now
      	},{
      		content:'本项目地址(重构): https://github.com/is-liyiwei',
      		date:now
      	}]
      },{
      	id:2,
      	user:{
      		name:'webpack',
      		img:'https://raw.githubusercontent.com/ITISummer/FigureBed/master/img/%E5%A5%B3%E4%BA%8C%E5%8F%B7.jpg'
      	},
      	messages:[{
      		content:'Hi，我是webpack哦',
      		date:now
      	}]
      }],
      currentSessionId:1,
      filterKey:''
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

		/**在线聊天系统*/
		changeCurrentSessionId (state,id) {
			state.currentSessionId = id;
		},
		addMessage (state,msg) {
			state.sessions[state.currentSessionId-1].messages.push({
				content:msg,
				date: new Date(),
				self:true
			})
		},
    INIT_DATA (state) {
      let data = localStorage.getItem('vue-chat-session');
      //console.log(data)
      if (data) {
        state.sessions = JSON.parse(data);
      }
    }

    },
    /**
     * 异步改变 state 中存储的对象
     * vue 组件中通过 dispatch 触发 actions 里的函数
     * actions 里的函数通过 commit 提交 mutations 更改，
     * 然后 mutation 更新 state 里的数据
     */
    actions: {
		/**在线聊天系统*/
    	initData (context) {
      context.commit('INIT_DATA')
    }
	},
})

store.watch(function (state) {
  return state.sessions
},function (val) {
  console.log('CHANGE: ', val);
  localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
  deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store
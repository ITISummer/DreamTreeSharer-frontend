<template>
  <div id="user-text">
    <textarea placeholder="按 Ctrl + Enter 发送"
              v-model="content"
              @keyup="addMessage">
    </textarea>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import constants from "../../apis/constants";

export default {
  data () {
    return {content: ''}
  },
  computed: {
    ...mapState({
      currentSession: (state) => state.chat.currentSession,
    })
  },
  methods: {
    /**默认传入 event(事件对象)*/
  	addMessage (e) {
  		if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let msg = {}
        msg.to = this.currentSession.userUsername
        msg.content = this.content
        // 发送消息
        this.$store.state.chat.stomp.send(constants.WS_CHAT,{},JSON.stringify(msg))
        // 显示消息
  			this.$store.commit('ADD_MESSAGE',msg);
        // 清空当前 content
  			this.content='';
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
#user-text {
	position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;
  > textarea {
  	padding: 10px;
  	width: 100%;
  	height: 100%;
  	border: none;
  	outline: none;
  }
}
</style>

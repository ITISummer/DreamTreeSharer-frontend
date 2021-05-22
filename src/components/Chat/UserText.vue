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

export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState({
      currentSession: (state) => state.chat.currentSession,
    })
  },
  methods: {
    // 默认传入 event(事件对象)
  	addMessage (e) {
  		if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let msgObj = {}
        msgObj.to = this.currentSession.userUsername
        msgObj.content = this.content
        this.$store.state.chat.stomp.send('/ws/chat',{},JSON.stringify(msgObj))
  			this.$store.commit('ADD_MESSAGE',msgObj);
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

<template>
  <div id="user-text">
    <textarea placeholder="按 Ctrl + Enter 发送"
              v-model="content"
              @keyup="addMessage">
    </textarea>
  </div>
</template>

<script>

export default {
  data () {
    return {
      content:''
    }
  },
  methods: {
    // 默认传入 event(事件对象)
  	addMessage (e) {
  		if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
  			this.$store.commit('addMessage',this.content);
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

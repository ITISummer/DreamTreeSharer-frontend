<!--好友列表-->
<template>
  <div id="list">
  	<ul style="padding-left: 0">
      <!--   :class="[item.id === currentSessionId ? 'active':'']" -->
  		<li v-for="item in users"
          :class="{ active: item.userId === currentSessionId }"
          v-on:click="changeCurrentSessionId(item.userId)">
  			<img class="avatar" :src="item.userAvatarUrl" :alt="item.userUsername">
  			<p class="name">{{item.userUsername}}</p>
  		</li>
  	</ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState(['users', 'currentSessionId']),
  methods:{
    // 改变当前会话 id
  	changeCurrentSessionId(id) {
  		this.$store.commit('changeCurrentSessionId',id)
  	}
  }
}
</script>

<style lang="scss" scoped>
#list {
	li {
		padding: 5px 5px;
		border-bottom: 1px solid #292C33;
		cursor: pointer;
    list-style: none;
		&:hover {
			background-color: rgba(255, 255, 255, 0.03);
		}
	}
  li.active {/*注意这个是.不是冒号:*/
			background-color: rgba(255, 255, 255, 0.1);
	}
	.avatar {
		border-radius: 2px;
		width: 30px;
		height: 30px;
    margin-left: -60px;
		vertical-align: middle;
	}
	.name {
		display: inline-block;
		margin-left: 15px;
	}
}
</style>

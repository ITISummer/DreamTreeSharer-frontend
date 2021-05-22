<!--好友列表-->
<template>
  <div id="list">
    <ul style="padding-left: 0">
      <li v-for="item in users"
          :class="{ active: currentSession? item.userUsername === currentSession.userUsername : false}"
          v-on:click="changeCurrentSession(item)">
        <img class="avatar" :src="getUserAvatarUrl+item.userAvatarUrl" :alt="item.userUsername">
        <el-badge :is-dot="isDot[currentUser.userUsername+'#'+item.userUsername]"><p class="name">{{item.userUsername}}</p></el-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

/**
 * [vuex 多modules 下mapState的映射写法！](https://blog.csdn.net/qq_15009739/article/details/108770288)
 */
export default {
  computed: {
    ...mapState({
      isDot: (state) => state.chat.isDot,
      users: (state) => state.chat.users,
      currentSession: (state) => state.chat.currentSession,
      currentUser: (state) => state.chat.currentUser,
    }),
    getUserAvatarUrl() {
      return this.baseUrl
    }
  },
  methods: {
    /**
     * 改变当前会话 id
      * @param currentSession
     */
    changeCurrentSession(currentSession) {
      this.$store.dispatch('changeCurrentSession', currentSession)
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

  li.active { /*注意这个是.不是冒号:*/
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

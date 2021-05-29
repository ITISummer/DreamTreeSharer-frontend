<template>
  <div id="list">
    <ul style="padding-left: 0">
      <li v-for="item in users"
          :class="{ active: currentSession? item.userUsername === currentSession.userUsername : false}"
          v-on:click="changeCurrentSession(item)">
        <img class="avatar" :src="getBaseUrl+item.userAvatarUrl">
        <el-badge :is-dot="isDot[currentUser.userUsername+'#'+item.userUsername]"><p class="name">{{item.userUsername}}</p></el-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getBaseUrl} from "../../apis/commonMethods";

/**
 * [vuex多modules下mapState的映射写法！](https://blog.csdn.net/qq_15009739/article/details/108770288)
 */
export default {
  computed: {
    ...mapState({
      isDot: (state) => state.chat.isDot,
      users: (state) => state.chat.users,
      currentSession: (state) => state.chat.currentSession,
      currentUser: (state) => state.chat.currentUser,
    }),
    getBaseUrl() {
      return getBaseUrl()
    }
  },
  methods: {
    /**
     * 改变当前会话 id
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
    position: relative;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
  /*注意这个是.不是冒号:*/
  li.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .avatar {
    border-radius: 2px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    position: absolute;
    left: 10px;
    margin-right: 15px;
  }
}
</style>

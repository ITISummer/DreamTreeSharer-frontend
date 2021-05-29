<template>
  <div id="message" v-scroll-bottom="sessions">
    <ul v-if="currentSession">
      <li v-for="msg in sessions[currentUser.userUsername + '#' + currentSession.userUsername]">
        <p class="time">
          <span>{{ msg.date | time }}</span>
        </p>
        <div class="main" :class="{self: msg.self}">
          <img class="avatar"
               :src="msg.self ? (getBaseUrl)+currentUser.userAvatarUrl : (getBaseUrl)+currentSession.userAvatarUrl" alt="头像缺失">
          <p class="text">{{ msg.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from "moment";
import {getBaseUrl} from "../../apis/commonMethods";

export default {
  computed: {
    ...mapState({
      currentUser: (state) => state.chat.currentUser,
      sessions: (state) => state.chat.sessions,
      currentSession: (state) => state.chat.currentSession,
    }),
    getBaseUrl() {
      return getBaseUrl()
    }
  },
  filters: {
    time(date) {
      if (date) {
        date = new Date(date);
      }
      return moment(date).format('HH:mm:ss')
    }
  },
  /**这个是vue的自定义指令,官方文档有详细说明*/
  directives: {
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    'scroll-bottom'(el) {
      //console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop += 9999;
      }, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
#message {
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      margin-bottom: 15px;
    }
  }

  .time {
    text-align: center;
    margin: 7px 0;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #FFF;
      background-color: #dcdcdc;
      border-radius: 2px;
    }
  }

  .main {
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      width: 30px;
      height: 30px;
      text-align: left;

    }

    .text {
      //float: left;
      //margin-left: -400px;
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }

    .text {
      //float: right;
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #b2e281;
      border-radius: 4px;
      line-height: 30px;
    }
  }
}
</style>

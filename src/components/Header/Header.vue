<template>
  <!--    头部-->
  <el-header>
    <el-row align="middle" justify="center">
      <el-col :span="2">
        <el-image style="width: 36px; height: 36px" :src="require('@/assets/logo.png')"></el-image>
      </el-col>
      <el-col :span="2">
        <div>
          <router-link to="/home"><el-button round>Home</el-button></router-link>
        </div>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-input type="text" placeholder="Type something" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <span class="user-name">{{userInfo.userUsername}}</span>
        <i class="el-icon-chat-dot-round" @click="goChat"></i>
      </el-col>
      <el-col :span="1" :offset="1">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <el-avatar size="large" :src="userInfo.userAvatarUrl"></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <!-- 个人中心：此处需要 PersonalCenter.vue 里暴露 getUserInfo(id) -->
              <el-dropdown-item command="personal-center"><router-link to="/personal-center">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item command="logout">登出</el-dropdown-item>
              <!--            <el-dropdown-item command="logout"><router-link to="/logout">登出</router-link></el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>

import constants from "../../apis/constants";

export default {
  props: {
    search: String,
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
    }
  },
  // https://dev.to/jakzaizzat/avoid-mutating-a-prop-directly-ab9
  // https://stackoverflow.com/questions/40574661/avoid-mutating-a-prop-directly-since-the-value-will-be-overwritten
  computed: {
    searchInput: {
      get: function(){
        return this.search;
      },
      set: function(newSearch){
        // 方式一：[update:] 为特定写法和父组件中 [.sync] 搭配
        this.$emit('update:search', newSearch)
        // 方式二：update-search 为自定义事件名
        // this.$emit('update-search', newSearch)
      }
    }
  },
  methods: {
    /**
     * 跳转到在线聊天页面
     */
    goChat() {
      this.$router.push(constants.CHAT)
    },
    /**
     * 处理 logout 功能
     * @param command
     */
    handleCommand(command) {
        this.$confirm('此操作将注销登录！是否继续？', 'Warning', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (command === 'logout') {
            // 注销登录
            this.postRequest(requests.LOGOUT)
            // 清空用户信息
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('userInfo')
            // // 清空 vuex 中一些信息！
            // this.$store.commit('mutation-type',[])
            // 跳转到登录页
            this.$router.replace(requests.ROOT)
          }
          this.$message({
            type: 'success',
            message: '注销成功！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '注销取消！'
          });
        });

      }
  }
}
</script>

<style scoped lang="scss">
.el-header {
  background: #66677c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  border-radius: 20px;
  padding-top: 10px;
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-image {
    cursor: pointer;
    border-radius: 13px;
  }
  .router-link-active {
    text-decoration: none;
  }
  .el-icon-chat-dot-round {
    cursor: pointer;
    color: black;
    margin-left: 5px;
  }
}
a {// 去除 router-link 下划线
  text-decoration: none;
}
</style>
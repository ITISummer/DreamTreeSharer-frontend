<!--
  https://dev.to/jakzaizzat/avoid-mutating-a-prop-directly-ab9
  https://stackoverflow.com/questions/40574661/avoid-mutating-a-prop-directly-since-the-value-will-be-overwritten
  [Vuex异步请求数据后,在组件中获取状态的方法](https://blog.csdn.net/panyang01/article/details/71750897)
  ---------------------

-->
<template>
  <!--    头部-->
  <el-header>
    <el-row align="middle" justify="center">
      <el-col :span="2">
        <el-image style="width: 36px; height: 36px" :src="require('@/assets/logo.png')"></el-image>
      </el-col>
      <el-col :span="2">
        <router-link to="/home">
          <el-button round>Home</el-button>
        </router-link>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-input type="text"
                  placeholder="Type something..."
                  class="input-with-select"
                  v-model="search"
        >
          <el-select v-model="flag" slot="prepend" placeholder="Select">
            <el-option label="用户名" value="1"></el-option>
            <el-option label="梦卡类型" value="2"></el-option>
            <el-option label="梦卡标题" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="validate"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <span class="user-name">{{ userInfo.userUsername }}</span>
        <i class="el-icon-chat-dot-round" @click="goChat"></i>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link">
            <el-avatar size="large"
                       :src="'http://qrne6et6u.hn-bkt.clouddn.com/'+this.userInfo.userAvatarUrl"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal-center">
              <router-link to="/account-setting">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
<!--    分页模糊查询(用户名，梦卡类型，梦卡标题)-->
    <Pagination
      ref="pagination"
      :search="search"
      :flag="flag"
    />
  </el-header>
</template>

<script>
import constants from "../../apis/constants"
import requests from "../../apis/constants"
import Pagination from "../Pagination/Pagination";
export default {
  components: {Pagination},
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      search: '',
      flag: '',
    }
  },
  methods: {
    /*
    [vue.js，如何在父组件调用子组件的方法？](https://segmentfault.com/q/1010000005345202)
     */
    validate() {
      this.$refs.pagination.validate()
    },
    // * 跳转到在线聊天页面
    goChat() {
      this.$router.push(constants.CHAT).catch(() => {
        console.log('catch redundant path ' + constants.CHAT + ' in Header.vue->goChat')
      })
    },
    // * 处理 logout 功能
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('此操作将注销登录！是否继续？', 'Warning', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest(requests.LOGOUT)
          // 清空用户信息
          window.sessionStorage.removeItem('token')
          window.sessionStorage.removeItem('userInfo')
          // // 清空 vuex 中一些信息！
          // this.$store.commit('mutation-type',[])
          // 跳转到登录页
          this.$router.replace(requests.ROOT)
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

a { // 去除 router-link 下划线
  text-decoration: none;
}

//.el-table-column{
//  cursor: pointer;
//}
</style>
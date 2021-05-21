<!--
  https://dev.to/jakzaizzat/avoid-mutating-a-prop-directly-ab9
  https://stackoverflow.com/questions/40574661/avoid-mutating-a-prop-directly-since-the-value-will-be-overwritten
  [Vuex异步请求数据后,在组件中获取状态的方法](https://blog.csdn.net/panyang01/article/details/71750897)
-->
<template>
  <!--    头部-->
  <el-header>
    <el-row align="middle" justify="center">
      <el-col :span="2">
        <el-image class="image-el" :src="require('@/assets/images/logo3.png')"></el-image>
      </el-col>
      <el-col :span="2">
        <router-link to="/home">
          <el-button round>Home</el-button>
        </router-link>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-input type="text"
                  @keyup.enter.native="validate"
                  placeholder="Type something..."
                  class="input-with-select"
                  v-model="search"
        >
          <el-select v-model="flag" slot="prepend" placeholder="Select" style="width: 120px">
            <el-option label="用户名" value="1"/>
            <el-option label="梦卡类型" value="2"/>
            <el-option label="梦卡标题" value="3"/>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="validate"/>
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
                       :src="getUserAvatarUrl"></el-avatar>
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
import {mapGetters} from 'vuex'

export default {
  components: {Pagination},
  data() {
    return {
      userInfo: this.$store.state.user.userInfo,
      search: '',
      flag: '',
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getUserInfo',
    ]),
    getUserAvatarUrl() {
      return this.baseUrl + this.userInfo.userAvatarUrl
    }
  },
  methods: {
    /**
     * [vue.js，如何在父组件调用子组件的方法？](https://segmentfault.com/q/1010000005345202)
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
          this.$store.dispatch('initUserInfo', {})
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

  .card {
    pointer-events: none;
    transform: translateZ(0);
    padding: 30px;
    background: white;
    border-radius: 5px;
    width: 400px;
    height: 200px;
    margin: auto;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    display: flex;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    position: relative;

    &:after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 10px;
      border-radius: 50%;
      left: 0;
      bottom: -50px;
      box-shadow: 0 30px 20px rgba(0, 0, 0, .3);

    }

    .card-content {
      margin: auto;
      text-align: center;
      transform-style: preserve-3d;
    }
  }

  .el-image {
    cursor: pointer;
    border-radius: 13px;
    width: 42px;
    height: 42px;
    &:hover{
      width: 200px;
      height: 200px;
    }
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
// 去除 router-link 下划线
a {
  text-decoration: none;
}
</style>

<!--
[【vue-router①】router-link跳转页面传递参数](https://segmentfault.com/a/1190000011707883)
[vue.js通过路由跳转页面的三种方式](https://blog.csdn.net/qi_dabin/article/details/82454588)
-->
<template>
  <el-container>
    <Header/>
    <el-main>
      <!--主体区域-->
      <div class="profile">
        <div class="content">
          <img alt="背景缺失" class="bg" src="./images/1.jpg">
          <img alt="头像缺失" class="avatar" :src="getUserAvatarUrl">
          <div class="text">
            <h1>{{this.username}}</h1>
            <p>What is your dream?</p>
            <h4>391 followers·15 following</h4>
            <p>1M views</p>
            <button class="btn" style="background-color: #eeeeee;">
              Message
            </button>
            <button class="btn" style="background-color: red;">
              Follow
            </button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";

export default {
  components: {Header},
  data() {
    return {
      username: '',
      userInfo: {}
    }
  },
  computed: {
    getUserAvatarUrl() {
      return this.baseUrl+this.userInfo.userAvatarUrl
    }
  },
  mounted() {
    this.username = this.$route.query.username
    // 向后台发送根据用户名查询用户信息
    this.getRequest(`get-user-info/${this.username}`).then(res=>{
      if (res) {
        this.userInfo = res.object
      } else {
        this.$message.warning('未查询到该用户，可能账户已注销！┭┮﹏┭┮')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
.profile {
  position: relative;
  left: 11%;
  width: 80%;
  height: 10%;
  box-sizing: border-box;
  margin: 60px;
  .content {
    width: 70%;
    position: relative;
    left: 12%;
    text-align: center;
    .bg{
      width: 700px;
      height: 400px;
      border-radius: 40px;
      //position: relative;
    }
    .avatar{
      position: absolute;
      top: 310px;
      left: 360px;
      width:120px;
      border-radius: 70px;
      box-shadow: 0 0 10px #ffffff;
    }
    .text {
      margin-top: 30px;
      width: 100%;
      height: 50%;
      word-wrap: break-word;
      .btn{
        margin-right: 2px;
        width:111px;
        height:59px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }
}


</style>

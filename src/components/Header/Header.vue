<template>
  <!--    头部-->
  <el-header>
    <el-row align="middle" justify="center">
      <el-col :span="2">
          <img  width="36" height="36" src="../../assets/logo.png">
        <!--          <el-avatar size="large" src=""></el-avatar>-->
      </el-col>
      <el-col :span="2">
        <div>
          <router-link to="/home"><el-button round>Home</el-button></router-link>
        </div>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-input type="text" placeholder="Type something" prefix-icon="el-icon-search" v-model="search"></el-input>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-dropdown>
          <div class="el-dropdown-link">
            <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- 个人中心
            包括：
            账户设置：
              用户头像更改
              用户姓名更改(first name, last name)
              用户名更改
              用户邮箱更改
              用户密码更改
              用户性别更改
            管理卡片：
              卡片增删改查
            此处需要 PersonalCenter.vue 里暴露 getUserInfo(id)
            -->
            <el-dropdown-item><router-link to="/personal-center">个人中心</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/logout">登出</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  props: {
    search: String
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
  img {
    cursor: pointer;
    border-radius: 13px;
  }
  .router-link-active {
    text-decoration: none;
  }
}
a {// 去除 router-link 下划线
  text-decoration: none;
}
</style>
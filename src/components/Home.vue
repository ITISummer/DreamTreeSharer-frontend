<template>

<el-container>
  <el-header>DreamTreeSharer</el-header>
  <el-container>
<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
<!-- select 菜单激活回调 -->
<!--    <el-menu @select="menuClick">-->
<!--  启用 router 模式，这样就可自动渲染路由 利用 index 作为 path 进行自动跳转
循环获取到的是整个路由 -->
      <el-menu router unique-opened>
      <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.show">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="children.path" v-for="(children,index) in item.children">{{children.name}}</el-menu-item>
      </el-submenu>
      </el-menu>
  </el-aside>
<!--    main -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
name: "Home",
}
</script>

<style scoped>

</style>


<!--<template>-->

<!--  <el-container>-->
<!--    <el-header class="home-header">-->
<!--      <i>logo</i>-->
<!--      <el-container>-->
<!--        <el-input placeholder="请输入..." icon="search" class="search-input"></el-input>-->
<!--        <el-avatar :size="50" :src="circleUrl"></el-avatar>-->
<!--        <el-menu class="el-menu-demo" mode="horizontal">-->
<!--          <el-menu-item index="1">首页</el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <el-menu-item index="2-1">个人中心</el-menu-item>-->
<!--            <el-menu-item index="2-2">设置</el-menu-item>-->
<!--            <el-menu-item index="2-3">退出登录</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-container>-->
<!--    </el-header>-->



<!--    &lt;!&ndash;    main &ndash;&gt;-->
<!--    <el-main>-->
<!--      <router-view></router-view>-->
<!--    </el-main>-->


<!--  </el-container>-->

<!--</template>-->

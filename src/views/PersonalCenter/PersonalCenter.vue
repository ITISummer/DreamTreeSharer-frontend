<template>
  <el-container>
    <Header :search="search"></Header>
    <el-aside width="200px">
      <el-menu @select="toggleView">
          <el-menu-item index="/account-setting">账户设置</el-menu-item>
          <el-menu-item index="/pin-boards">梦卡管理</el-menu-item>
      </el-menu>
    </el-aside>
    <!--    main -->
    <el-main style="padding-top: 62px; background-color: #6e8efb">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";
export default {
  components: {Header},
  data() {
    return {
      search: '',
    }
  },
  methods: {
    /**
     * 当点击 menu-item 后，调用此方法会自动传入被点击的 menu-item 的 index
     * @param index
     */
    toggleView(index) {
      this.$router.push(index)
    }
  }
}
</script>

<style scoped lang="scss">
.el-aside{
  height: 754px;
  background-color: #2c3e50;
  padding-top: 62px;
  position: sticky;
  top: 0;
  left: 0;
}
</style>


<!--  <template>-->
<!--  <el-container>-->
<!--    <el-header>DreamTreeSharer</el-header>-->
<!--    <el-container>-->
<!--      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
<!--        &lt;!&ndash; select 菜单激活回调 &ndash;&gt;-->
<!--        &lt;!&ndash;    <el-menu @select="menuClick">&ndash;&gt;-->
<!--        &lt;!&ndash;  启用 router 模式，这样就可自动渲染路由 利用 index 作为 path 进行自动跳转-->
<!--        循环获取到的是整个路由 &ndash;&gt;-->
<!--        <el-menu router unique-opened>-->
<!--          <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.show">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>{{item.name}}</span>-->
<!--            </template>-->
<!--            <el-menu-item :index="children.path" v-for="(children,index) in item.children">{{children.name}}</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-aside>-->
<!--      &lt;!&ndash;    main &ndash;&gt;-->
<!--      <el-main>-->
<!--        <router-view></router-view>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->

<!--</template>-->

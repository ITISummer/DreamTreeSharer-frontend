<template>
  <el-aside width="200px" id="aside-el">
    <el-menu @select="toggleView" @open="defaultOpen">
      <el-menu-item index="/account-setting">账户设置</el-menu-item>
      <el-menu-item index="/pin-boards">梦卡管理</el-menu-item>
      <el-menu-item index="/chat">在线聊天</el-menu-item>
      <el-menu-item index="/favorites">个人收藏</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  methods: {
    /**
     * 当点击 menu-item 后，调用此方法会自动传入被点击的 menu-item 的 index
     */
    toggleView(index) {
      // this.tipOn = false
      this.$router.push(index).catch(err => {
        console.log('catch redundant path '+index+' in Aside.vue->toggleView')})
    },
    /**
     * 默认显示：账户设置页面
     */
    defaultOpen(){
      this.$router.push('/account-setting')
    }
  }
}
</script>

<style scoped lang="scss">
#aside-el{
  height: 754px;
  background-color: #2c3e50;
  padding-top: 60px;
  position: sticky;
  top: 0;
  left: 0;
}
</style>

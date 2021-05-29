<!--
[在线聊天功能学习](https://www.bilibili.com/video/BV1ar4y1K7qx?p=61&spm_id_from=pageDriver)
[](https://www.bilibili.com/video/BV1tZ4y1P7dT?p=264&spm_id_from=pageDriver)
[demo 地址](https://github.com/is-liyiwei/vue-Chat-demo)
-->
<template>
  <el-main id="chat" style="margin-top: 62px; background-color: #6e8efb">
    <div class="sidebar">
      <Card></Card>
      <List></List>
    </div>
    <div class="main">
      <Message></Message>
      <UserText></UserText>
    </div>
  </el-main>
</template>

<script>
const Card = () => import('../../../components/Chat/Card.vue');
const List = () => import('../../../components/Chat/List.vue');
const Message = () => import('../../../components/Chat/Message.vue');
const UserText = () => import('../../../components/Chat/UserText.vue');
export default {
  components:{Card, List, Message, UserText},
  mounted() {
    // 连接后台 websocket - 初始化 websocket 链接
    this.$store.dispatch('chatConnect')
    // TODO 初始化本地聊天数据 - 有 bug
    this.$store.dispatch('initData')
  },
}
</script>

<style lang="scss" scoped>
#chat {
  margin: 20px auto;
  width: 800px;
  overflow: hidden;
  border-radius: 10px;
  .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
</style>

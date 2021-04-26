<!--
[在线聊天功能学习](https://www.bilibili.com/video/BV1ar4y1K7qx?p=61&spm_id_from=pageDriver)
[demo 地址](https://github.com/is-liyiwei/vue-Chat-demo)
-->
<template>
  <el-main id="chat" style="margin-top: 62px; background-color: #6e8efb">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <UserText></UserText>
    </div>
  </el-main>
</template>

<script>
import Card from '../../../components/Chat/Card.vue'
import List from '../../../components/Chat/List.vue'
import Message from '../../../components/Chat/Message.vue'
import UserText from '../../../components/Chat/UserText.vue'
export default {
  data () {
    return {

    }
  },
  mounted:function() {
    this.$store.dispatch('initData');
  },
  components:{Card, List, Message, UserText}
}
</script>

<style lang="scss" scoped>
#chat {
  margin: 20px auto;
  width: 800px;
  //height: 600px;
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

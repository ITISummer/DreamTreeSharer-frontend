<template>
  <el-container>
    <WaterfallMain
        :images="images"
        :showCardFooter="true"
        :showAvatar="false"
        :handleDelete="handleDelete"
        :handle-click="handleClick"
        :handleEdit="handleEdit"/>
    <Dialog
        :showDialog.sync="showDialog"
        :commentsOrDreamForm="true"
        :showSelect="true"/>
    <!--[admin vue页面右下角添加客服按钮](https://blog.csdn.net/thc1987/article/details/106623974)-->
    <div id="add_pins_button" v-show="true">
      <el-popover placement="left-end" trigger="click">
        <el-button type="text" style="text-align: center;" @click="showDialog = !showDialog">Add Your Pins</el-button>
        <label slot="reference" class="top_btn" title="Add Your Pins"></label>
      </el-popover>
    </div>
  </el-container>
</template>

<script>
import Header from "../../../components/Header/Header";
import WaterfallMain from "../../../components/WaterfallMain/WaterfallMain";
import Dialog from "../../../components/Dialog/Dialog";
import {EventBus} from "../../../apis/eventBus"
import {getRequest,deleteRequest} from "../../../apis/api";

export default {
  components: {Header, WaterfallMain, Dialog},
  mounted() {
    // 这里的 images 初始化从数据库获取 TODO
    getRequest('get-pinboards').then(res=>{
      this.images = res.object
      console.log(this.images)
    }).catch(err=>{
      console.log(err)
    })
    EventBus.$on('getDreamForm',data => {
      console.log(data)
      this.images.push(data)
      console.log(this.images.length)
    })
    EventBus.$on('getShowDialog',showDialog => {
      this.showDialog = showDialog
      console.log(this.showDialog)
      })
  },
  data() {
    return {
      // dreamForm: {
      //   pinboardSharable: true,
      //   pinboardBgimgUrl: '',
      //   pinboardTitle: '',
      //   pinboardContent: '',
      //   pinUsername: '',
      //   pinUserAvatarUrl: '',
      // },
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      search: '',
      list: [],
      showDialog: false,
      imageUrl: "https://i.pinimg.com/236x/4d/ba/24/4dba24872bed032eeaf85e51bbd502b9.jpg",
      images: [],
    }
  },
  methods: {
    handleClick(item) {
      this.$message.warning(item.pinboardBgimgUrl);
    },
    // * 编辑
    handleEdit(item) {
      // 弹出编辑框，TODO 发送请求向数据库更新一个 pinboard
      EventBus.$emit('getShowDialog',true)
      EventBus.$emit('initImageUrl',item.pinboardBgimgUrl)
      this.$message.success('编辑');
    },
    // * 删除
    handleDelete(item) {
      // TODO 发送请求向数据库移除一个 pinboard 同时移除其下的评论和点赞信息
      deleteRequest(`delete-one-pinboard/${item.pinboardId}`).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      console.log(item.pinboardId)
      this.$message.error('删除');
    },
  },
  // [vue中event bus被触发多次问题](https://segmentfault.com/q/1010000009710635)
  // beforeDestroy() {
  //   EventBus.$off('getDreamForm')
  // }
}

</script>

<style scoped lang="scss">
#add_pins_button {
  position: fixed;
  right: 35px;
  bottom: 35px;
  z-index: 999;
  width: 60px;
  height: 60px;
  .top_btn {
    width: 60px;
    height: 60px;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    cursor: pointer;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    -webkit-animation: wobble 250ms infinite;
    animation: wobble 250ms infinite;
    background-image: url('./imgs/polkadot-new-dot-logo.png');
  }
}
</style>
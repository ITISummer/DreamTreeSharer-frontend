<template>
  <el-container>
    <WaterfallMain
        :images="images"
        :showCardFooter="true"
        :showAvatar="false"
        :handleDelete="handleDelete"
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
export default {
  components: {Header, WaterfallMain, Dialog},
  mounted() {
    EventBus.$on('getDreamForm', dreamForm=>{
      this.dreamForm = dreamForm
      console.log("Pinboards->mounted()",this.dreamForm)
    })
  },
  data() {
    return {
      dreamForm: {
        pinboardSharable: true,
        pinboardBgimgUrl: '',
        pinboardTitle: '',
        pinboardContent: '',
      },
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      search: '',
      list: [],
      showDialog: false,
      imageUrl: "https://i.pinimg.com/236x/4d/ba/24/4dba24872bed032eeaf85e51bbd502b9.jpg",
      images: [
        {src: `https://i.pinimg.com/236x/cc/e0/c5/cce0c5377b48a53f4849a880a0482620.jpg`},
      ],
    }
  },
  methods: {
    // * 编辑
    handleEdit() {
      // 弹出编辑框，TODO 发送请求向数据库更新一个 pinboard
      this.$message.success('编辑');
    },
    // * 删除
    handleDelete() {
      // TODO 发送请求向数据库移除一个 pinboard 同时移除其下的评论和点赞信息
      this.$message.error('删除');
    },
  }
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
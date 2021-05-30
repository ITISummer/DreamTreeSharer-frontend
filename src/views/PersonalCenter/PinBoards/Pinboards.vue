<template>
  <el-container>
    <WaterfallMain
        :images="images"
        :showAvatar="false"
        :showSaveBtnInWaterfall="false"
        :handleDelete="handleDelete"
        :handle-click="handleClick"
        :handleEdit="handleEdit"/>
    <Dialog
        :showDialog.sync="showDialog"
        :showCommentsOrDreamForm="true"/>
    <!-- [vue页面右下角添加客服按钮](https://blog.csdn.net/thc1987/article/details/106623974) -->
    <div id="add_pins_button" v-show="true">
      <el-popover placement="left-end" trigger="click">
        <el-button type="text" style="text-align: center;" @click="initDreamForm">Add Your Pins</el-button>
        <label slot="reference" class="top_btn" title="Add Your Pins"></label>
      </el-popover>
    </div>
  </el-container>
</template>

<script>
import Header from "../../../components/Header/Header";
import WaterfallMain from "../../../components/WaterfallMain/WaterfallMain";
import Dialog from "../../../components/Dialog/Dialog";
import {EventBus,EventName} from "../../../apis/eventBus";
import constants from "../../../apis/constants";

export default {
  components: {Header, WaterfallMain, Dialog},
  mounted() {
    this.getRequest(constants.GET_PINS).then(res => {
      if (res) {
        this.images = res.object
      } else {
        this.$message('没有查询到您的愿望卡，您可以进行添加操作来添加您的愿望卡！')
      }
    }).catch(err => {
      console.log('Pinboards.vue->mounted()', err)
    });
    // 接收来自 DialogRight.vue
    EventBus.$on(EventName.GET_SHOW_DIALOG, value => {
      this.showDialog = value
    });
  },
  data() {
    return {
      dreamForm: {},
      userInfo: this.$store.state.user.userInfo,
      list: [],
      showDialog: false,
      imageUrl: '',
      images: [],
    }
  },
  methods: {
    initDreamForm() {
      this.showDialog = !this.showDialog
      const dreamForm = {
        pinboardTitle: '',
        pinboardContent: '',
        pinboardSharable: true,
        pinboardBgimgUrl: '',
        pinUsername: '',
        pinUserAvatarUrl: '',
      }
      // 发送到 DialogRight.vue
      EventBus.$emit(EventName.INIT_DREAM_FORM, dreamForm)
      EventBus.$emit(EventName.SAVE_OR_UPDATE, true)
      // 发送到 Upload.vue
      EventBus.$emit(EventName.INIT_IMAGE_URL, '')
    },
    /**
     * 图片点击
     */
    handleClick(item) {
      this.$message.info(item.pinboardBgimgUrl);
    },
    /**
     * 编辑
     */
    handleEdit(item) {
      this.showDialog = true
      // 发送到 Upload.vue
      EventBus.$emit(EventName.INIT_IMAGE_URL, item.pinboardBgimgUrl,'edit')
      // 发送到 DialogRight.vue
      EventBus.$emit(EventName.INIT_DREAM_FORM, item)
      EventBus.$emit(EventName.SAVE_OR_UPDATE, false)
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('确认删除吗？', '删除一个pin', 'warning').then(res => {
        if (res) {
          // 发送请求向数据库移除一个 pinboard 同时移除其下的评论和点赞信息
          this.deleteRequest(`${constants.DEL_ONE_PIN}/${item.pinboardId}`).then(res => true).catch(err => {
            console.log('Pinboards.vue->handleDelete()->err', err)
          })
        }
      }).catch(err => {
        console.log('Pinboards.vue->handleDelete()->err', err)
      })
    },
  },
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

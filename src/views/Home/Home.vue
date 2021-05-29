<!--[瀑布流学习地址](https://www.jianshu.com/p/97b89597ab5c)-->
<template>
  <el-container id="main-container">
    <Header/>
    <WaterfallMain
        :images="images"
        :showSaveBtnInWaterfall="true"
        :handleClick="handleClick"/>
    <Dialog
        :showDialog.sync="showDialog"
        :showCommentsOrDreamForm="false"/>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";
import WaterfallMain from "../../components/WaterfallMain/WaterfallMain";
import Dialog from "../../components/Dialog/Dialog";
import {EventBus,EventName} from "../../apis/eventBus";
import constants from "../../apis/constants";
export default {
  components: {Dialog, Header, WaterfallMain},
  mounted() {
    /**
     * 获取用户分享的 pinboard
     */
    this.getRequest(constants.GET_SHARABLE_PIN).then(res => {
      if (res) {
        this.images = res.object
      }
    }).catch(err => {
      console.log('Home.vue->mounted()->err', err)
    })

  },
  data() {
    return {
      userInfo: this.$store.state.user.userInfo,
      showDialog: false,
      images: [],
    }
  },

  methods: {
    /**
     * 图片点击
     */
    handleClick(item) {
      this.showDialog = true
      // 传入到 DialogRight.vue 和 Comments.vue 中
      EventBus.$emit(EventName.INIT_PIN_INFO, item)
      // 传入到 Upload.vue 中
      EventBus.$emit(EventName.INIT_IMAGE_URL, item.pinboardBgimgUrl,'home')
      // 传入到 DialogRight.vue 中
      EventBus.$emit(EventName.SHOW_SAVE_BTN, false)
      // 传入到 DialogLeft.vue 中
      EventBus.$emit(EventName.SHOW_SAVE_FROM_SITE_BTN, false)
    },
  }
}
</script>

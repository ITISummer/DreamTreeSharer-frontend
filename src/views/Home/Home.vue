<!--[瀑布流学习地址](https://www.jianshu.com/p/97b89597ab5c)-->
<template>
  <el-container id="main-container">
    <Header/>
    <WaterfallMain
        :images="images"
        :showSaveBtnInWaterfall="true"
        :handleClick="handleClick"
        :handleDelete="handleDelete"
        :handleEdit="handleEdit"/>
    <Dialog
        :showDialog.sync="showDialog"
        :showCommentsOrDreamForm="false"
        :showSelect="false"/>
  </el-container>
</template>

<script>
import Header from "../../components/Header/Header";
import WaterfallMain from "../../components/WaterfallMain/WaterfallMain";
import Dialog from "../../components/Dialog/Dialog";
import {EventBus} from "../../apis/eventBus";

export default {
  components: {Dialog, Header, WaterfallMain},
  mounted() {
    // 获取用户分享的 pinboard
    this.getRequest('/get-sharable-pin').then(res => {
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
     * @param item
     */
    handleClick(item) {
      this.showDialog = true
      EventBus.$emit('getPinboardInfoFromHome', item)
      EventBus.$emit('initImageUrl', item.pinboardBgimgUrl)
      EventBus.$emit('showSaveBtn', false)
      EventBus.$emit('showSaveFromSiteBtn', false)
    },
    /**
     * 编辑
     */
    handleEdit() {
      this.$message.success('编辑');
    },
    /**
     * 删除
     */
    handleDelete() {
      this.$message.error('删除');
    },
  }
}
</script>

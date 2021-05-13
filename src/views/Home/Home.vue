<!--[瀑布流学习地址](https://www.jianshu.com/p/97b89597ab5c)-->
<template>
<!--  这里改动 class 为 id，可能会有显示错误-->
  <el-container id="main-container">
    <Header></Header>
    <WaterfallMain
        :images="images"
        :showSaveBtnInWaterfall="true"
        :like="like"
        :savePin="savePin"
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
import {getRequest} from "../../apis/api";

export default {
  components: {Dialog, Header, WaterfallMain},
  mounted() {
    // 获取用户分享的 pinboard
    getRequest('/get-sharable-pin').then(res => {
      if (res) {
        this.images = res.object
      }
    }).catch(err => {
      console.log('Home.vue->mounted()->err',err)
    })

  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      showDialog: false,
      images: [],
    }
  },

  methods: {
    // 图片点赞
    like(item) {
      console.log(item)
      if (item.isLiked === null) {
        this.$set(item, "isLiked", true);
        item.likeNum++
      } else {
        if (item.isLiked) {
          item.likeNum--
        } else {
          item.likeNum++
        }
        item.isLiked = !item.isLiked;
      }
      // TODO 发送请求更新点赞数
      // putRequest(`update-like-num/${item.commentId}/${item.likeNum}`).then(res=>true).catch(err=>{
      //   console.log(err)
      // })
    },
    // 收藏一个 Pin
    savePin(item){
      // TODO 存储用户保存的 pin
      this.postRequest(`add-one-pin/${item.pinboardId}`).then(res=>true).catch(err=>{
        console.log(err)
      })

    },
    // * 图片点击
    handleClick(item) {
      this.showDialog = true
      EventBus.$emit('getPinboardInfoFromHome', item)
      EventBus.$emit('initImageUrl', item.pinboardBgimgUrl)
      EventBus.$emit('showSaveBtn', false)
      EventBus.$emit('showSaveFromSiteBtn', false)
    },
    // * 编辑
    handleEdit() {
      this.$message.success('编辑');
    },
    // * 删除
    handleDelete() {
      this.$message.error('删除');
    },

  }
}
</script>
<!--
flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。
flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性。
注意：如果元素不是弹性盒模型对象的子元素，则 flex 属性不起作用。
-->
<style lang="scss" scoped>

</style>

<template>
  <el-main style=" margin-top: -20px; background-color: #6e8efb">
   <WaterfallMain
       :images="images"
       :showAvatar="false"
       :showSaveBtnInWaterfall="false"
       :showSavedFrom="true"
       :handleClick="handleClick"/>
  </el-main>
</template>

<script>
import WaterfallMain from "../../components/WaterfallMain/WaterfallMain";
import constants from "../../apis/constants";

export default {
  components: {WaterfallMain},
  data() {
    return {
      images: [],
    }
  },
  mounted() {
    /**
     * 获取用户收藏的愿望卡
     */
    this.getRequest(constants.GET_FAVORITES).then(res=>{
      if (res) {
        this.images = res.object
      } else {
        this.$message.warning('该用户下没有收藏内容！')
      }
    }).catch(err=>{
      console.log('Favorites.vue->mounted()->err',err)
    })
  },
  methods: {
    handleClick(item) {
      this.$message.info(item.pinboardBgimgUrl)
    }
  }
}
</script>

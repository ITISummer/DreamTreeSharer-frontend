<template>
  <el-main style=" margin-top: -20px; background-color: #6e8efb">
   <WaterfallMain
       :images="images"
       :showAvatar="false"
       :showSaveBtnInWaterfall="false"
       :showSavedFrom="true"
       :handleDelete="handleDelete"
       :handle-click="handleClick"
       :handle-edit="handleClick"
   />
  </el-main>
</template>

<script>
import WaterfallMain from "../../components/WaterfallMain/WaterfallMain";
export default {
  components: {WaterfallMain},
  data() {
    return {
      images: [],
    }
  },
  mounted() {
    // 发送请求
    this.getRequest('/get-favorites').then(res=>{
      if (res) {
        this.images = res.object
      } else {
        this.$message.warning('该用户下没有收藏内容！')
      }
    }).catch(err=>{
      console.log('Favorites.vue->mounted()',err)
    })
  },
  methods: {
    handleDelete(item) {
      console.log(item)
    },
    handleClick(item) {
      console.log(item)
    }
  }
}
</script>

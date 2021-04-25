<template>
  <WaterfallMain
      style="margin-top: -60px; background-color: #6e8efb"
      :images="images"
      :isShowCardFooter="false"
      :handleClick="handleClick"
      :handleDelete="handleDelete"
      :handleEdit="handleEdit"
  ></WaterfallMain>
</template>

<script>
import Header from "../../../components/Header/Header";
import WaterfallMain from "../../../components/WaterfallMain/WaterfallMain";
export default {
  components: {Header,WaterfallMain},
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      search: '',
      list: [],
      loading: false,
      images: [
        {src: `https://i.pinimg.com/236x/4d/ba/24/4dba24872bed032eeaf85e51bbd502b9.jpg`},
        {src: `https://i.pinimg.com/236x/c3/4b/21/c34b217c65afe3c23bf7edbb86e53ebc.jpg`},
        {src: `https://i.pinimg.com/236x/8b/0c/f5/8b0cf5fd92f3fe289eeb34f9aaa93e26.jpg`},
        {src: `https://i.pinimg.com/236x/cc/e0/c5/cce0c5377b48a53f4849a880a0482620.jpg`},
        {src: `https://i.pinimg.com/236x/27/78/90/27789027d690792a73387d5d066a4b1b.jpg`},
        {src: `https://i.pinimg.com/236x/ff/dd/4b/ffdd4b3620da73035a6d91f6e20d1fa4.jpg`},
        {src: `https://i.pinimg.com/236x/8c/c6/6a/8cc66a9ae620e3d3f7c604c497e8085e.jpg`},
        {src: `https://i.pinimg.com/236x/a5/26/fc/a526fc6db19373194ecdaa6f93f128ca.jpg`},
        {src: `https://i.pinimg.com/236x/da/45/8f/da458fcfc28c96735cd034761b4b6c3d.jpg`},
        {src: `https://i.pinimg.com/236x/66/9b/0e/669b0e167a3ecb6ca070a3ddc4979c83.jpg`},
        {src: `https://i.pinimg.com/236x/9e/f4/19/9ef419bdfc4093bc862253f0fbbc5cee.jpg`},
        {src: `https://i.pinimg.com/236x/6a/26/ee/6a26eed72595947dd264491769567523.jpg`},
        {src: `https://i.pinimg.com/236x/cc/e0/c5/cce0c5377b48a53f4849a880a0482620.jpg`},
      ],
    }
  },
  methods: {
    /**
     * 图片点击
     */
    handleClick(item) {this.$message.info(JSON.stringify(item));},
    /**
     * 编辑
     */
    handleEdit() {this.$message.success('编辑');},
    /**
     * 删除
     */
    handleDelete() {this.$message.error('删除');},
  }
}

</script>

<style scoped>
</style>
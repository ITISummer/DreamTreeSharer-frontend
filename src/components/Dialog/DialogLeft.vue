<template>
  <div class="side" id="left_side">
    <!-- 左侧头部 -->
    <div class="section1">
      <div class="pint_mock_icon_container">
        <img src="../../assets/images/ellipse.png" alt="edit" class="pint_mock_icon">
      </div>
    </div>
    <!-- 左侧中部 -->
    <div class="section2">
      <Upload ref="Upload"/>
    </div>
    <!-- 左侧底部 -->
    <div class="section3" v-show="showSaveFromSiteBtn">
      <div class="save_from_site">Save from site</div>
    </div>
  </div>
</template>

<script>
import Upload from "../Upload/Upload";
import {EventBus} from "../../apis/eventBus";

export default {
  components: {Upload},
  mounted() {
    EventBus.$on('showSaveFromSiteBtn',value=>{
      this.showSaveFromSiteBtn = value
    });

    // this.$nextTick(() => {
    //   document.addEventListener('click', (e) => {
    //     console.log(e.target)
    //     if (!this.$refs.dd.contains(e.target)) {
    //       // this.dialog = false;
    //       this.$emit('update:showDialog', false)
    //     }
    //   })
    // })
  },
  data() {
    return {
      showSaveFromSiteBtn: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "DialogCommon";
#left_side {
  background-color: blue;
  .section1 {
    .pint_mock_icon_container {
      width: 40px;
      height: 40px;
      background-color: rgba(239, 239, 239, 0);
      transition-duration: 0.3s;
      &:hover {
        background-color: rgba(239, 239, 239, 1);
      }
    }
  }
  .section3 {
    .save_from_site {
      width: 340px;
      height: 48px;
      border-radius: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      background-color: #EFEFEF;
      cursor: pointer;
    }
  }
}
</style>
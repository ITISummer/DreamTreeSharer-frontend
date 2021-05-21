<!--
[用一个div画出关闭图标](https://segmentfault.com/a/1190000008955548)
-->
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
        :showCommentsOrDreamForm="true"
        />
    <!--
      [admin vue页面右下角添加客服按钮](https://blog.csdn.net/thc1987/article/details/106623974)
    -->
    <div id="add_pins_button" v-show="true">
      <el-popover placement="left-end" trigger="click">
        <el-button type="text" style="text-align: center;" @click="initDreamForm">Add Your Pins</el-button>
        <label slot="reference" class="top_btn" title="Add Your Pins"></label>
      </el-popover>
    </div>
  </el-container>
</template>

<script>
import Header from "@/components/Header/Header";
import WaterfallMain from "@/components/WaterfallMain/WaterfallMain";
import Dialog from "@/components/Dialog/Dialog";
import {EventBus} from "@/apis/eventBus"

export default {
  components: {Header, WaterfallMain, Dialog},
  mounted() {
    // 这里的 images 初始化从数据库获取 TODO
    this.getRequest('get-pinboards').then(res => {
      if (res) {
        this.images = res.object
      } else {
        this.$message('没有查询到您的愿望卡！')
      }
    }).catch(err => {
      console.log(err)
    });
    EventBus.$on('getShowDialog', value => {
      this.showDialog = value
      console.log(showDialog)
    });
    EventBus.$on('getADreamForm', value => {
      console.log(value)
      // this.images.push(value)
    });
  },
  data() {
    return {
      dreamForm: {},
      userInfo: this.$store.state.user.userInfo,
      search: '',
      list: [],
      showDialog: false,
      imageUrl: '',
      images: [],
    }
  },
  methods: {
    initDreamForm() {
      this.showDialog = !this.showDialog
      EventBus.$emit('initImageUrl', '')
      // EventBus.$emit('initDreamForm', {})
      EventBus.$emit('saveOrUpdate',true)
    },
    handleClick(item) {
      this.$message.warning(item.pinboardBgimgUrl);
    },
    // * 编辑
    handleEdit(item) {
      // TODO 弹出编辑框 发送请求向数据库更新一个 pinboard
      this.showDialog = true
      EventBus.$emit('initImageUrl', item.pinboardBgimgUrl)
      EventBus.$emit('initDreamFormFromPinboards', item)
      EventBus.$emit('saveOrUpdate', false)
    },
    // * 删除
    handleDelete(item) {
      this.$confirm('确认删除吗？', '删除一个pin', 'warning').then(res => {
        if (res) {
          // TODO 发送请求向数据库移除一个 pinboard 同时移除其下的评论和点赞信息
          this.deleteRequest(`delete-one-pinboard/${item.pinboardId}`).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          console.log('Pinboards->handleDelete()',item.pinboardId)
        }
      }).catch(err => {
        console.log(err)
      })
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

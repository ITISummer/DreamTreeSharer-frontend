<template>
  <el-container>
    <WaterfallMain
        style="background-color: #6e8efb"
        :images="images"
        :isShowCardFooter="true"
        :handleClick="handleClick"
        :handleDelete="handleDelete"
        :handleEdit="handleEdit"
    ></WaterfallMain>
    <el-dialog title="Add Your Pins" class="" :visible="showDialog">
      <!--      <div class="dialog-main">-->
      <el-row align="middle" justify="center">
        <el-col :span="12">
          <Upload class="dialog-upload"></Upload>
        </el-col>
        <el-col :span="12">
          <el-form :model="pinboardForm" class="dialog-form">
            <el-form-item>
              <el-input v-model="pinboardForm.title" placeholder="add your pins title" class="form-input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-image :src="userInfo.userAvatarUrl" style="width: 36px; height: 36px"></el-image>
              <span>{{ userInfo.userUsername }}</span>
            </el-form-item>
            <el-form-item class="layout">
              <el-input type="textarea" maxlength="250" v-model="pinboardForm.content" placeholder="Share Your Dreams~"
                        @input="this.descInput"></el-input>
              <span>{{ this.remnant }}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!--        </div>-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="showDialog = false">Cancel</el-button>
    <el-button type="primary" @click="showDialog = false">Confirm</el-button>
  </span>
    </el-dialog>
    <!--    [admin vue页面右下角添加客服按钮](https://blog.csdn.net/thc1987/article/details/106623974)-->
    <div class="addPins" v-show="true">
      <el-popover placement="left-end" trigger="click">
        <el-button type="text" style="text-align: center;" @click="showDialog=true">add your pins</el-button>
        <label slot="reference" class="topBtn" title="add"></label>
      </el-popover>
    </div>
  </el-container>
</template>

<script>
import Header from "../../../components/Header/Header";
import WaterfallMain from "../../../components/WaterfallMain/WaterfallMain";
import Upload from "../../Upload/Upload";

export default {
  components: {Header, WaterfallMain, Upload},
  data() {
    return {
      tab2Lable: '添加用户',
      remnant: 250,//备注最大输入250个字符
      pinboardForm: {
        title: '',
        content: '',
      },
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      search: '',
      list: [],
      loading: false,
      showDialog: false,
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
     * 计算文本剩余字数
     */
    descInput() {
      let txtVal = this.pinboardForm.content.length;
      this.remnant = 250 - txtVal;
    },
    /**
     * 图片点击
     */
    handleClick(item) {
      this.$message.info(JSON.stringify(item));
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

<style scoped lang="scss">
.addPins {
  position: fixed;
  right: 35px;
  bottom: 35px;
  z-index: 999;
  width: 60px;
  height: 60px;
  .topBtn {
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

.dialog-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .dialog-upload {
    flex: 1 1 auto;
  }

  .dialog-form {
    flex: 2 2 auto;
    flex-direction: column;
    //.form-input {
    // border-top: none;
    // border-left: none;
    // border-right: none;
    //}
  }
}
</style>
<template>
  <div class="side" id="right_side">
    <!-- 内容选择框 -->
    <div class="section1">
      <div class="select_size" v-show="showSelect">
        <select name="Sharable?" id="pin_size">
          <option value="yes">分享吧</option>
          <option value="no">不分享</option>
        </select>
      </div>
      <div class="save_pin">Save</div>
    </div>
    <!-- input 输入框 -->
    <div class="section2" v-if="commentsOrDreamForm">
      <el-form :model="DreamForm">
        <el-form-item>
          <el-image :src="userInfo.userAvatarUrl" style="width: 36px; height: 36px"></el-image>
          <span>{{ userInfo.userUsername }}</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="DreamForm.title" class="new_pin_input" maxlength="20"
                    placeholder="Add Your Pins Title~"></el-input>
        </el-form-item>
        <el-form-item class="layout">
          <el-input type="textarea" class="new_pin_input" maxlength="250" v-model="DreamForm.content"
                    placeholder="Share Your Dreams~"
                    @input="this.descInput"></el-input>
          <span>{{ this.remnant }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="section2">
      <Comments/>
    </div>
  </div>
</template>

<script>
import Comments from "../Comments/Comments";
export default {
  props: {
    commentsOrDreamForm: Boolean,
    showSelect: Boolean,
  },
  components: {Comments},
  data() {
    return{
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      tab2Lable: '添加用户',
      remnant: 249,
      DreamForm: {
        title: '',
        content: '',
      },
    }
  },
  methods: {
    /**
     * 计算文本剩余字数
     */
    descInput() {
      let txtVal = this.DreamForm.content.length;
      this.remnant = 250 - txtVal;
    },
  }
}
</script>

<style scoped lang="scss">
@import "DialogCommon";
#right_side {
  background-color: orange;
  .section1 {
    display: flex;
    justify-content: flex-end;
    .select_size {
      width: 236px;
      height: 40px;
      display: flex;
      select {
        width: 70%;
        height: 100%;
        border: none;
        border-radius: 8px;
        outline: none;
        font-size: 16px;
        background-color: #EFEFEF;
      }
    }
    .save_pin {
      width: 30%;
      height: 100%;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 700;
      color: white;
      background-color: #E60023;
      cursor: pointer;
      &:hover{
        background-color: rgb(207, 3, 3);
      }
    }
  }

  .section2 {
    .new_pin_input {
      margin-bottom: 20px;
      width: 100%;
      height: 50px;
      border: none;
      border-bottom: 2px solid #C6C6C6;
      outline: none;
      font-size: 16px;
      background-color: transparent;
    }
  }
}

</style>
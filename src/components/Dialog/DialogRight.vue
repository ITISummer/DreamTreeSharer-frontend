<template>
  <div class="side" id="right_side">
    <!-- 内容选择框 -->
    <div class="section1">
      <div class="select_size" v-show="showSelect">
        <select name="Sharable?" id="pin_size" v-model="dreamForm.pinboardSharable">
          <option value="true" label="分享吧"></option>
          <option value="false" label="不分享"></option>
        </select>
      </div>
      <button class="save_pin" @click="emitDreamForm">Save</button>
    </div>
    <!-- input 输入框 -->
    <div v-if="commentsOrDreamForm" class="section2">
      <el-form :model="dreamForm">
        <el-form-item>
          <el-image :src="userAvatarUrl" style="width: 36px; height: 36px"></el-image>
          <span>{{ userInfo.userUsername }}</span>
        </el-form-item>
        <el-form-item>
          <el-input type="text"
                    v-model="dreamForm.pinboardTitle"
                    class="new_pin_input"
                    maxlength="20"
                    placeholder="Add Your Pins Title~">
          </el-input>
        </el-form-item>
        <el-form-item class="layout">
          <el-input type="textarea"
                    v-model="dreamForm.pinboardContent"
                    class="new_pin_input"
                    maxlength="250"
                    placeholder="Share Your Dreams~"
                    @input="this.descInput">
          </el-input>
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
import {EventBus} from "../../apis/eventBus";
import {postRequest} from "../../apis/api";

export default {
  components: {Comments},
  props: {
    commentsOrDreamForm: Boolean,
    showSelect: Boolean,
  },
  mounted() {
    EventBus.$on('getImageUrl', imageUrl => {
      this.dreamForm.pinboardBgimgUrl = imageUrl
    });
  },
  data() {
    return {
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
      remnant: 249,
      dreamForm: {
        pinboardTitle: '',
        pinboardContent: '',
        pinboardSharable: true,
        pinboardBgimgUrl: '',
        pinUsername: '',
        pinUserAvatarUrl: '',
      },
    }
  },
  computed: {
    userAvatarUrl: {
      get() {
        if (this.userInfo.userAvatarUrl.startsWith("https://")) {
          return this.userInfo.userAvatarUrl
        } else {
          return 'http://qrne6et6u.hn-bkt.clouddn.com/' + this.userInfo.userAvatarUrl
        }
      }
    }
  },
  methods: {
    // * 计算文本剩余字数
    descInput() {
      let txtVal = this.dreamForm.pinboardContent.length;
      this.remnant = 249 - txtVal;
    },
    // 检查字段并分发事件 getDreamForm 给 Pinboards
    emitDreamForm() {
      const {
        pinboardTitle: title,
        pinboardContent: content,
        pinboardSharable: sharable,
        pinboardBgimgUrl: imageUrl
      } = this.dreamForm
      this.dreamForm.pinUsername = this.userInfo.userUsername
      this.dreamForm.pinUserAvatarUrl = this.userInfo.userAvatarUrl
      if (title === '' || content === '' || imageUrl === '') {
        this.$message({message: '字段不能为空！', type: 'warning'})
      } else {
        // 当用户添加一个 pin 时，往数据库中插入一条数据，并根据是否分享来决定是否往 pinboards.vue 传递一条数据
        postRequest('/add-one-pinboard', this.dreamForm).catch(err=>{
          console.log(err)
        })
        EventBus.$emit('getDreamForm',this.dreamForm)
        EventBus.$emit('getShowDialog',false)
      }
    }
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

      &:hover {
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
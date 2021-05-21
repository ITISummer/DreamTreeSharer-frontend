<template>
  <div class="side" id="right_side">
    <!-- 右侧头部 -->
    <div class="section1" v-if="showSaveBtn">
      <div class="select_size">
        <select name="Sharable?" id="pin_size" v-model="dreamForm.pinboardSharable">
          <option value="true" label="分享吧"></option>
          <option value="false" label="不分享"></option>
        </select>
      </div>
      <button class="save_pin" @click="emitDreamForm">Save</button>
    </div>
    <div class="section1" v-else>
      <div>
        <el-avatar data-title="卡片发布者头像" :src="getUserAvatarUrl"/>
        <span class="user-name">{{this.pinboardInfo.userUsername}}</span>
        <span class="date">{{this.pinboardInfo.pinboardCreateTime}}</span>
      </div>
    </div>
    <!-- 右侧中部 -->
    <div class="section2" v-if="showCommentsOrDreamForm">
      <el-form :model="dreamForm">
        <el-form-item>
          <el-avatar :src="getUserAvatarUrl"/>
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
    <div class="section2" v-else>
      <Comments/>
    </div>
  </div>
</template>

<script>
import Comments from "../Comments/Comments";
import {EventBus} from "../../apis/eventBus";

export default {
  components: {Comments},
  props: {
    showCommentsOrDreamForm: Boolean,
  },
  computed: {
    getUserAvatarUrl() {
      return this.baseUrl+this.userInfo.userAvatarUrl
    }
  },
  mounted() {
    EventBus.$on('getImageUrlFromUpload',imageUrl=>{
      this.dreamForm.pinboardBgimgUrl = imageUrl
    })
    EventBus.$on('initDreamFormFromPinboards', value => {
      this.dreamForm = value
    });
    EventBus.$on('showSaveBtn',value=>{
      this.showSaveBtn = value
    });
    EventBus.$on('saveOrUpdate', value=>{
      this.saveOrUpdate = value
    })
    EventBus.$on('getPinboardInfoFromHome',value=>{
      this.pinboardInfo = value
    })
  },
  data() {
    return {
      remnant: 249,
      pinboardInfo: {},
      saveOrUpdate: true,
      showSaveBtn: true,
      userInfo: this.$store.state.user.userInfo,
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
  methods: {
    // * 计算文本剩余字数
    descInput() {
      let txtVal = this.dreamForm.pinboardContent.length;
      this.remnant = 249 - txtVal;
    },
    // 检查字段并分发事件 getDreamForm 给 Pinboards
    emitDreamForm() {
      console.log('DialogRight->emitDreamForm()',this.saveOrUpdate)
      if (this.saveOrUpdate) {
       // 添加操作
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
        this.postRequest('/add-one-pinboard', this.dreamForm).then(res=>{
          if (res && res.statusCode === 200) {
            EventBus.$emit('getShowDialog',false)
            EventBus.$emit('getADreamForm',this.dreamForm)
          }
        }
        ).catch(err=>{
          console.log(err)
        })
        // EventBus.$emit('getDreamForm',this.dreamForm)
      }
    } else {
        // 更新操作
        const {
          pinboardTitle: title,
          pinboardContent: content,
          pinboardSharable: sharable,
          pinboardBgimgUrl: imageUrl
        } = this.dreamForm
        if (title === '' || content === '' || imageUrl === '') {
          this.$message({message: '字段不能为空！', type: 'warning'})
        } else {
          this.putRequest('/update-pinboard',this.dreamForm).then(res => {
            if (res && res.statusCode === 200) {
              EventBus.$emit('getShowDialog',false)
            }
          }).catch(err => {
            console.log(err)
          })
        }
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
    .user-name {
      font-size: 16px;
      color: #8c939d;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .date {
      font-size: 12px;
      color: #8c939d;
    }
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

<template>
  <div id="right_side" class="side">
    <!-- 右侧头部 -->
    <div class="section1" v-if="showSaveBtn">
      <div class="select_size">
        <select name="Sharable?" id="pin_size" v-model="dreamForm.pinboardSharable">
          <option value="true" label="分享吧"></option>
          <option value="false" label="不分享"></option>
        </select>
      </div>
      <button class="save_pin" @click="saveDreamForm">Save</button>
    </div>
    <div class="section1" v-else>
      <div class="publisher">
        <el-avatar data-title="卡片发布者头像" :src="getUserAvatarUrl" class="user-avatar"/>
        <span class="user-name">发布者：{{ pinboardInfo.userUsername }}</span>
        <span class="date">{{ formatPinboardCreateTime }}</span>
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
                    show-word-limit
                    placeholder="Add Your Pins Title~">
          </el-input>
        </el-form-item>
        <el-form-item class="layout">
          <el-input type="textarea"
                    v-model="dreamForm.pinboardContent"
                    class="new_pin_input"
                    maxlength="249"
                    show-word-limit
                    placeholder="Share Your Dreams~"
                    >
          </el-input>
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
import {EventBus,EventName} from "../../apis/eventBus";
import constants from "../../apis/constants";
import {getUserAvatarUrl} from "../../apis/commonMethods";

export default {
  components: {Comments},
  props: {
    showCommentsOrDreamForm: Boolean,
  },
  computed: {
    getUserAvatarUrl() {
      if (this.showSaveBtn) {
        return getUserAvatarUrl(this.userInfo)
      }
      return getUserAvatarUrl(this.pinboardInfo)
    },
    formatPinboardCreateTime() {
      return this.$moment(this.pinboardInfo.pinboardCreateTime).format(constants.TIME_FORMATTER)
    }
  },
  mounted() {
    EventBus.$on(EventName.GET_IMAGE_URL_FROM_UPLOAD, imageUrl => {
      this.dreamForm.pinboardBgimgUrl = imageUrl
    })
    // 接收来自 Pinboards.vue
    EventBus.$on(EventName.INIT_DREAM_FORM, value => {
      this.dreamForm = value
    });
    EventBus.$on(EventName.SAVE_OR_UPDATE, value => {
      this.saveOrUpdate = value
    })
    // 接收来自 Home.vue
    EventBus.$on(EventName.SHOW_SAVE_BTN, value => {
      this.showSaveBtn = value
    });
    // 接收来自 Home.vue
    EventBus.$on(EventName.INIT_PIN_INFO, value => {
      this.pinboardInfo = value
    })
  },
  data() {
    return {
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
    /**
     * 检查字段并存储一个愿望卡
     */
    saveDreamForm() {
      console.log('DialogRight->saveDreamForm()->this.saveOrupdate', this.saveOrUpdate)
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
          // 当用户添加一个 pin 时，往数据库中插入一条数据
          this.postRequest(constants.ADD_ONE_PIN, this.dreamForm).then(res => {
                if (res && res.statusCode === 200) {
                  // 发送到 Pinboards.vue
                  EventBus.$emit(EventName.GET_SHOW_DIALOG, false)
                  // EventBus.$emit('getADreamForm', this.dreamForm)
                }
              }
          ).catch(err => {
            console.log(err)
          })
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
          this.putRequest(constants.UPDATE_PIN, this.dreamForm).then(res => {
            if (res && res.statusCode === 200) {
              EventBus.$emit(EventName.GET_SHOW_DIALOG, false)
            }
          }).catch(err => {
            console.log('DialogRight.vue->saveDreamForm()->err',err)
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
    .publisher{
      position: relative;
      background: #021930;
      .user-avatar{
        position: absolute;
        left: -250px;
        top: 0;
      }
      .user-name {
        position: absolute;
        left: -200px;
        font-size: 14px;
        color: #8c939d;
        margin-bottom: 5px;
        font-weight: 600;
      }
      .date {
        left: -200px;
        top: 30px;
        position: absolute;
        font-size: 12px;
        color: #8c939d;
      }
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

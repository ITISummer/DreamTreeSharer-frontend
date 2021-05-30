<!--
[Vue修改用户信息~不要错过哦](https://blog.csdn.net/weixin_46370867/article/details/113448645)
[element-ui dialog](https://element.eleme.io/#/en-US/component/dialog)
[element-ui form](https://element.eleme.io/#/en-US/component/form)
[custom-validation-rules](https://element.eleme.io/#/en-US/component/form#custom-validation-rules)
model	data of form component
rules	validation rules of form
-->
<!--      生日-->
<!--    <el-form-item label="生日">-->
<!--      <el-col :span="11">-->
<!--        <el-form-item prop="birthday">-->
<!--          <el-date-picker type="date" placeholder="选择日期" v-model="updateForm.birthday"-->
<!--                          style="width: 100%;"></el-date-picker>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--    </el-form-item>-->
<!--    &lt;!&ndash;      性别&ndash;&gt;-->
<!--    <el-form-item label="性别" prop="sex">-->
<!--      <el-radio-group v-model="updateForm.sex">-->
<!--        <el-radio label="男" value="male"></el-radio>-->
<!--        <el-radio label="女" value="female"></el-radio>-->
<!--      </el-radio-group>-->
<!--    </el-form-item>-->
<!--      按钮 -->
<!--    <el-form-item>-->
<!--      <el-button type="primary" @click="updateUserInfo">Create</el-button>-->
<!--      <el-button @click="resetForm('updateForm')">Cancel</el-button>-->
<!--    </el-form-item>-->
<template>
  <el-main style="margin-top: 60px; background-color: #6e8efb">
    <!-- 显示基本信息 -->
    <el-form ref="updateForm" :model="updateForm" :rules="updateFormRules" label-width="70px">
      <!--头像上传(crop)-->
      <el-form-item prop="avatarUrl">
        <ele-upload-image
            crop
            ref="upload"
            v-model="updateForm.avatarURL"
            :fileSize="1"
            :action="qiniu.uploadQiniuUrl"
            :data="qiniu.qiniuData"
            :responseFn="handleResponse"
            :handleCropSuccess="handleCropSuccess"
            @commitCropDataToInvoker="getCropDataFromComponets"
        ></ele-upload-image>
      </el-form-item>
      <!--用户名-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" disabled></el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item label="邮箱" prop="email">
        <el-input clearable type="email" v-model="updateForm.email" disabled></el-input>
        <el-button type="primary" @click="updateEmailOrMobileF">修改邮箱</el-button>
      </el-form-item>
      <!--手机号-->
      <el-form-item label="手机号" prop="mobile">
        <el-input clearable type="tel" maxlength="11" v-model="updateForm.mobile" disabled></el-input>
        <el-button type="primary" @click="updateEmailOrMobileF">修改手机号</el-button>
      </el-form-item>
      <!--重置密码-->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="updateForm.password" autocomplete="off" disabled></el-input>
        <el-button type="primary" @click="updatePwdDialogF">修改密码</el-button>
      </el-form-item>
    </el-form>

    <!--更新密码的弹出框-->
    <el-dialog title="密码修改" :visible.sync="updatePwdDialog">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updatePwdDialog">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="updateForm.password" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="updateForm.rePassword" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
      </el-form>
      <!--点击此元素会自动激活验证码-->
      <button @click="varify">验证</button>
      <span slot="footer" class="dialog-footer">
      <el-button @click="cancleUpdatePwd">取消</el-button>
      <el-button type="primary" @click="commitUpdatePwd">确认</el-button>
    </span>
    </el-dialog>

    <!-- 更新邮箱和手机号弹出框 -->
    <el-dialog title="手机号或者邮箱修改" :visible.sync="updateEmailOrMobileDialog">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateEmailOrMobile">
        <el-form-item prop="flag">
          <el-select placeholder="请选择要修改的字段" v-model="updateForm.flag">
            <el-option label="邮箱" value="email"></el-option>
            <el-option label="手机号" value="mobile"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入要修改的内容：" prop="emailOrMobile">
          <el-input autocomplete="off" v-model="updateForm.emailOrMobile"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码：" prop="code">
          <el-input autocomplete="off" v-model="updateForm.code"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getCode" :disabled="!getCodeBtn">点击获取验证码</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="updateEmailOrMobileDialog = false">取消</el-button>
    <el-button type="primary" @click="commitUpdateEmailOrMobile">确认</el-button>
  </span>
    </el-dialog>

  </el-main>
</template>

<script>
import EleUploadImage from "../../../components/Cropper/EleUploadImage";
import constants from "../../../apis/constants";
import validators from "../../../apis/validators";
import {mapGetters} from "vuex";

/**
 * [Getter](https://vuex.vuejs.org/zh/guide/getters.html)
 * [vuex 如何在 obj 属性变化时 watch 到 obj 的变化？](https://segmentfault.com/q/1010000010315629)
 */
export default {
  components: {EleUploadImage},
  mounted() {
    this.updateForm.email = this.userInfo.userEmail
    this.updateForm.username = this.userInfo.userUsername
    this.updateForm.password = this.userInfo.userPassword
    this.updateForm.mobile = this.userInfo.userPhone
    this.updateForm.birthday = this.userInfo.userBirthday
    this.updateForm.sex = this.userInfo.userSex
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
    // userInfo() {
    //   return this.$store.state.user.userInfo
    // }
  },
  watch: {
    userInfo: {
        deep: true,
        handler() {
          console.log(this.userInfo)
          this.updateForm.email = this.userInfo.userEmail
          this.updateForm.username = this.userInfo.userUsername
          this.updateForm.password = this.userInfo.userPassword
          this.updateForm.mobile = this.userInfo.userPhone
          this.updateForm.birthday = this.userInfo.userBirthday
          this.updateForm.sex = this.userInfo.userSex
        }
    },
  },

  data() {
    return {
      updateEmailOrMobileDialog: false,
      updatePwdDialog: false,
      getCodeBtn: false,
      cropData: {},
      slideCode: false,
      qiniu: constants.qiniu,
      // userInfo: this.$store.state.user.userInfo,
      // 用户更新表单信息对象
      updateForm: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        mobile: '',
        // email or mobile
        emailOrMobile: '',
        flag: '',
        code: '',
      },
      // 修改表单的验证规则 blur: 文本失去焦点 - 默认 trigger: 'change'
      updateFormRules: {
        email: [{validator: validators.checkEmail, trigger: 'blur'}],
        mobile: [{validator: validators.checkMobile, trigger: 'blur'}],
        password: [{validator: validators.checkPassword, trigger: 'blur'}],
        rePassword: [{validator: validators.reCheckPassword.bind(this), trigger: 'blur'}],
        code: [{required: true, len: 6, message: "验证码长度应该为6", trigger: 'blur'}],
        emailOrMobile: [{validator: validators.checkEmailOrMobile.bind(this), trigger: 'blur'}],
      },
    }
  },
  methods: {
    cancleUpdatePwd() {
      this.updatePwdDialog = false
      this.updateForm.password = ''
    },
    /**
     * [腾讯防水墙](https://007.qq.com)
     * [如何在项目中调用腾讯云的滑动验证码](https://segmentfault.com/a/1190000023225263)
     */
    varify() {
      // 腾讯云控制台中对应这个项目的 appid
      let appid = '1258827934';
      //生成一个滑块验证码对象
      let captcha = new TencentCaptcha(appid, res => {
        // 用户滑动结束或者关闭弹窗，腾讯返回的内容
        console.log(res)
        if (res.ret === 0) {
          this.slideCode = true
        } else {
          // 提示用户完成验证
          this.slideCode = false
          this.$message.warning('请完成滑块验证')
        }
      });
      // 滑块显示
      captcha.show();
    },
    /**
     * 每次点击前先清空上次误操作输入的字段
     * [element-ui清除表单验证提示语](https://blog.csdn.net/qq_41378597/article/details/104761987)
     * [element-ui 表单报错 Cannot read property ‘clearValidate‘ of undefined“](https://blog.csdn.net/qq_36437172/article/details/107348939)
     */
    updateEmailOrMobileF() {
      this.updateEmailOrMobileDialog = true
      this.$nextTick(() => {
        this.$refs['updateEmailOrMobile'].clearValidate()
      })
      this.updateForm.emailOrMobile = ''
      this.updateForm.flag = ''
      this.updateForm.code = ''
    },
    /**
     * 每次点击前先清空上次误操作输入的字段
     */
    updatePwdDialogF() {
      this.updatePwdDialog = true
      this.$nextTick(() => {
        this.$refs['updatePwdDialog'].clearValidate()
      })
      this.updateForm.password = ''
      this.updateForm.rePassword = ''

    },
    /**
     * 向后台提交密码更新请求
     */
    commitUpdatePwd() {
      if (!this.slideCode) {
        this.$message.warning('请进行滑动验证')
        return false
      }
      this.$confirm(`确认修改密码吗？`, "", {type: 'warning'}).then(res => {
        this.$refs.updatePwdDialog.validate(valid => {
          if (valid) {
            // 验证通过
            this.putRequest(constants.UPDATE_PWD, this.updateForm).then(res => {
              // 更新密码成功
              if (res) {
                this.updatePwdDialog = false
                this.slideCode = false
              }
            }).catch(err => {
              // 更新密码失败
              console.log('AccountSetting.vue->commitUpdatePwd->err',err)
            })
          }
        })
      }).catch(err => {
        this.$message.info('取消密码修改！')
      })
    },
    /**
     * 向后台提交邮箱或者手机号更新请求
     */
    commitUpdateEmailOrMobile() {
      this.$refs.updateEmailOrMobile.validate((valid) => {
        // 没通过验证
        if (!valid) return
        // 收集数据（验证码与邮箱或者手机号），向后台发送更新请求
        this.putRequest(`${constants.UPDATE_EMAIL_OR_MOBILE}/${this.updateForm.flag}/${this.updateForm.emailOrMobile}/${this.updateForm.code}`).then(res => {
          // 通过验证，发起修改用户信息的数据请求
          if (res) {
            this.updateEmailOrMobileDialog = false
            if (this.updateForm.flag === 'email') {
              this.updateForm.email = this.updateForm.emailOrMobile
            } else {
              this.updateForm.mobile = this.updateForm.emailOrMobile
            }
            // 更新 store.user.userInfo
            this.$store.dispatch('updateEmailOrMobile', {
              flag: this.updateForm.flag,
              value: this.updateForm.emailOrMobile
            })
          }
        }).catch(err => {
          console.log('AccountSetting.vue->commitUpdateEmailOrMobile->err', err)
        })
      })

    },
    /**
     * 根据内容不同获取验证码
     */
    getCode() {
      this.$confirm(`确认修改${this.updateForm.flag === 'mobile'?"手机号":"邮箱"}吗？`, "", {type: 'warning'}).then(res => {
        // 获取邮箱或手机验证码
        this.getRequest(`${constants.GET_CODE}/${this.updateForm.flag}/${this.updateForm.emailOrMobile}`).then(res => {
          if (res) {
            alert(res.object)
          }
        }).catch(err => {
          console.log('AccountSetting.vue->getCode->err', err)
        })
      }).catch(err => {
        console.log('AccountSetting.vue->getCode->err', err)
      })
    },

    /**
     * 获取子组件 $emit() 分发的事件(commitCropDataToInvoker)的值
     */
    getCropDataFromComponets(cropData) {
      this.cropData = cropData
    },
    /**
     * https://github.com/dai-siki/vue-image-crop-upload
     * [vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)
     * [https://cn.vuejs.org/v2/api/#parent](https://cn.vuejs.org/v2/api/#parent)
     * [如何正确合理使用 JavaScript async/await ！](https://segmentfault.com/a/1190000017718513)
     * fileUrl -> 图片 base64 url
     */
    async handleCropSuccess(fileBase64Url, field, ki, callback) {
      //这里的 avatarUrl 需要和 handleResponse() 中的 file.avatarUrl 名字一致
      this.cropData.avatarUrl = fileBase64Url
      this.qiniu.qiniuData.key = this.cropData.name;
      await this.getQiniuToken(this.qiniu.qiniuData.key)
      // callback() 防止上传两次，修改了原项目中的源代码
      callback()
    },
    /**
     * 创建前从后台获取访问七牛云的 token - (key(文件名) bucket, AccessKey, SecretKey)
     */
    getQiniuToken: async function (key) {
      const _this = this;
      await this.getRequest(`${constants.GET_QINIU_TOKEN_URL}/${key}`)
          .then(function (res) {
            if (res.statusCode === 200) {
              _this.qiniu.qiniuData.token = res.object;
            } else {
              _this.$message({message: res.message, duration: 2000, type: "warning"});
            }
          });
    },
    /**
     * 上传图片成功后的响应
     * res -> 请求远程图床后响应返回的数据
     * file -> 上传的图片
     * fileList -> 上传的图片集
     */
    handleResponse(res, file, fileList) {
      let newAvatarUrl = res.key;
      this.putRequest(`${constants.UPDATE_AVATAR_URL}/${newAvatarUrl}`).then(res => {
        if (res) {
          // 更新 state 中的 userInfo
          this.$store.dispatch('updateUserAvatar', newAvatarUrl)
        }
      }).catch(err => {
        console.log('AccountSetting.vue->handleResponse->err', err)
      })
      return file.avatarUrl
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!--
[Vue修改用户信息~不要错过哦](https://blog.csdn.net/weixin_46370867/article/details/113448645)
[element-ui dialog](https://element.eleme.io/#/en-US/component/dialog)
[element-ui form](https://element.eleme.io/#/en-US/component/form)
[custom-validation-rules](https://element.eleme.io/#/en-US/component/form#custom-validation-rules)
model	data of form component
rules	validation rules of form
-->
<!-- 修改用户的对话框 -->
<!-- editDialogVisible 值 为 true 显示对话框 / false 隐藏对话框 -->
<!-- editDialogClosed 监听对话框 -->
<template>
  <el-main style="margin-top: 60px; background-color: #6e8efb">
    <el-form ref="updateForm" :model="updateForm" :rules="updateFormRules" label-width="70px">
      <!-- 头像上传(crop) -->
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
      <!--      用户名-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" disabled></el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item label="邮箱" prop="email">
        <el-input clearable type="email" v-model="updateForm.email" disabled></el-input>
        <el-button type="primary" @click="updateEmailOrMobileDialog = true">修改邮箱</el-button>
      </el-form-item>
      <!-- 手机号-->
      <el-form-item label="手机号" prop="mobile">
        <el-input clearable type="tel" maxlength="11" v-model="updateForm.mobile" disabled></el-input>
        <el-button type="primary" @click="updateEmailOrMobileDialog = true">修改手机号</el-button>
      </el-form-item>
      <!--      重置密码-->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="updateForm.password" autocomplete="off" disabled></el-input>
        <el-button type="primary" @click="updatePwdDialog = true">修改密码</el-button>
      </el-form-item>
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
    </el-form>

    <!--    update password -->
    <el-dialog title="密码修改" :visible.sync="updatePwdDialog">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updatePwdDialog">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="updateForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!--      确认密码-->
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="updateForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updatePwdDialog = false">Cancel</el-button>
      <el-button type="primary" @click="commitUpdatePwd">Confirm</el-button>
    </span>
    </el-dialog>

    <!-- update email or mobile form -->
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
        <el-button type="primary" @click="getCode" :disabled="!enableButton">点击获取验证码</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="updateEmailOrMobileDialog = false">Cancel</el-button>
    <el-button type="primary" @click="commitUpdateEmailOrMobile">Confirm</el-button>
  </span>
    </el-dialog>

  </el-main>
</template>

<script>
import EleUploadImage from "../../../components/Cropper/EleUploadImage";
import constants from "../../../apis/constants";
import validators from "../../../apis/validators";
import {getRequest, putRequest} from "../../../apis/api";

export default {
  components: {EleUploadImage},
  mounted() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
    this.updateForm.username = this.userInfo.userUsername
    this.updateForm.password = this.userInfo.userPassword
    this.updateForm.email = this.userInfo.userEmail
    this.updateForm.mobile = this.userInfo.userPhone
    this.updateForm.birthday = this.userInfo.userBirthday
    this.updateForm.sex = this.userInfo.userSex
  },
  data() {
    return {
      updateEmailOrMobileDialog: false,
      updatePwdDialog: false,
      enableButton: false,
      cropData: {},
      userInfo: {},
      // 查询到的用户信息对象
      updateForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        birthday: Date.now(),
        // email or mobile
        emailOrMobile: '',
        flag: '',
        code: '',
      },
      qiniu: {
        qiniuData: {key: "", token: ""},
        // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
        uploadQiniuUrl: "http://upload-z2.qiniup.com",
        // 七牛云返回储存图片的子域名
        uploadQiniuAddr: "qrne6et6u.hn-bkt.clouddn.com/",
      },
      // 修改表单的验证规则 blur: 文本失去焦点 - 默认 trigger: 'change'
      updateFormRules: {
        email: [{validator: validators.checkEmail, trigger: 'blur'}],
        mobile: [{validator: validators.checkMobile, trigger: 'blur'}],
        password: [{validator: validators.checkPassword, trigger: 'blur'}],
        checkPassword: [{validator: validators.reCheckPassword.bind(this), trigger: 'blur'}],
        code: [{required:true, len: 6, message: "验证码长度应该为6", trigger: 'blur'}],
        emailOrMobile: [{validator: validators.checkEmailOrMobile.bind(this), trigger: 'blur'}],
      },
    }
  },
  methods: {
    // 向后台提交密码更新请求
    commitUpdatePwd() {
      this.$confirm(`确认修改密码吗？`, "", {type: 'warning'}).then(res => {
        this.$refs.updatePwdDialog.validate(valid => {
          if (valid) {
            // 验证通过
            putRequest(`update-pwd`, this.updateForm).then(res => {
              // 更新密码成功
              if (res.statusCode === 200) {
                this.updatePwdDialog = false
                let sessionValue = JSON.parse(window.sessionStorage.getItem('userInfo'))
                sessionValue.userPassword = this.updateForm.password
                window.sessionStorage.setItem('userInfo', JSON.stringify(sessionValue))
              }
            }).catch(err => {
              // 更新密码失败
              console.log(err)
            })
          }
        })
      })
    },
    // 向后台提交邮箱或者手机号更新请求
    commitUpdateEmailOrMobile() {
      this.$refs.updateEmailOrMobile.validate((valid) => {
        // 没通过验证
        if (!valid) return
        // 收集数据（验证码与邮箱或者手机号），向后台发送更新请求
        putRequest(`update-email-or-mobile/${this.updateForm.flag}/${this.updateForm.emailOrMobile}/${this.updateForm.code}`).then(res => {
          // 通过验证，发起修改用户信息的数据请求
          if (res.statusCode === 200) {
            this.updateEmailOrMobileDialog = false
            let sessionValue = JSON.parse(window.sessionStorage.getItem('userInfo'))
            if (this.updateForm.flag === 'email') {
              this.updateForm.email = this.updateForm.emailOrMobile
              sessionValue.userEmail = this.updateForm.emailOrMobile
              window.sessionStorage.setItem('userInfo', JSON.stringify(sessionValue))
            } else {
              this.updateForm.mobile = this.updateForm.emailOrMobile
              sessionValue.userPhone = this.updateForm.emailOrMobile
              window.sessionStorage.setItem('userInfo', JSON.stringify(sessionValue))
            }
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })

    },
    // 根据内容不同获取验证码
    getCode() {
      this.$confirm(`确认修改${this.updateForm.flag}吗？`, "", {type: 'warning'}).then(res => {
        // TODO 获取邮箱或手机验证码
        getRequest(`/get-code/${this.updateForm.flag}/${this.updateForm.emailOrMobile}`).then(res => {
          // 成功！更新 updateForm
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },

    //  获取子组件 $emit() 分发的事件(commitCropDataToInvoker)的值
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
      callback()
    },
    // 创建前从后台获取访问七牛云的 token - (key(文件名) bucket, AccessKey, SecretKey)
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
     * res -> 请求远程图床响应返回的数据
     * file -> 上传的图片
     * fileList -> 上传的图片集
     */
    handleResponse(res, file, fileList) {
      // 往数据库发送异步请求，存入用户上传的头像 TODO
      let newAvatarUrl = res.key;
      console.log(newAvatarUrl)
      putRequest(`update-avatar-url/${newAvatarUrl}`).then(res=>{
        if (res.statusCode === 200) {
          // 更新 sessionStorage
          let sessionValue = JSON.parse(window.sessionStorage.getItem('userInfo'))
          sessionValue.userAvatarUrl = newAvatarUrl
          window.sessionStorage.setItem('userInfo', JSON.stringify(sessionValue))
        }
      }).catch(err=>{
        console.log(err)
      })
      return file.avatarUrl
    },
    /**
     * 展示编辑用户的对话框<br>
     * 展示时从后台异步获取对应 id 的用户信息
     * @param id
     * @returns {Promise<ElMessageComponent>}
     */
    async getUserInfo(id) {
      const {res} = await this.getRequest('getUserById/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败')
      }
      // 把查询到的数据 保存到 updateForm
      this.updateForm = res.data
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
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
      <el-input clearable type="email" v-model="updateForm.email"></el-input>
    </el-form-item>
    <!-- 手机号-->
    <el-form-item label="手机号" prop="mobile">
      <el-input clearable type="tel" maxlength="11" v-model="updateForm.mobile"></el-input>
    </el-form-item>
    <!--      重置密码-->
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="updateForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <!--      确认密码-->
    <el-form-item label="确认密码" prop="checkPassword">
      <el-input type="password" v-model="updateForm.checkPassword" autocomplete="off"></el-input>
    </el-form-item>
    <!--      生日-->
    <el-form-item label="生日">
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="updateForm.date"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--      性别-->
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="updateForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <!--      按钮 -->
    <el-form-item>
      <el-button type="primary" @click="updateUserInfo">Create</el-button>
      <el-button @click="resetForm('updateForm')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 局部引入
import EleUploadImage from "../../Cropper/EleUploadImage";
import constants from "../../../apis/constants";
import validators from "../../../apis/validators";

export default {
  components: {EleUploadImage},
  data() {
    return {
      cropData: {},
      // 查询到的用户信息对象
      updateForm: {},
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
      },
    }
  },
  methods: {
    /**
     * 获取子组件 $emit() 分发的事件(commitCropDataToInvoker)的值
     */
    getCropDataFromComponets(cropData){this.cropData = cropData},
    /**
     * https://github.com/dai-siki/vue-image-crop-upload
     * [vue组件间通信六种方式（完整版）](https://segmentfault.com/a/1190000019208626)
     * [https://cn.vuejs.org/v2/api/#parent](https://cn.vuejs.org/v2/api/#parent)
     * [如何正确合理使用 JavaScript async/await ！](https://segmentfault.com/a/1190000017718513)
     * fileUrl -> 图片 base64 url
     */
    async handleCropSuccess(fileBase64Url) {
      //这里的 avatarUrl 需要和 handleResponse() 中的 file.avatarUrl 名字一致
      this.cropData.avatarUrl = fileBase64Url
      // console.log('handleCropSuccess',this.cropData)
      // console.log(this.cropData.name)
      this.qiniu.qiniuData.key = this.cropData.name;
      console.log(this.qiniu.qiniuData.token) // ""
      await this.getQiniuToken(this.qiniu.qiniuData.key)
      console.log(this.qiniu.qiniuData.token) // 可以获得 token
    },
    /**
     * 创建前从后台获取访问七牛云的 token - (key(文件名) bucket, AccessKey, SecretKey)
     */
    getQiniuToken: async function (key) {
      const _this = this;
      await this.getRequest(`/qiniu/uploadToken/${key}`)
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
      // console.log(res)
      console.log(file)
      // console.log(file.url)
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
    /**
     * 修改用户信息并提交
     */
    updateUserInfo() {
      this.$refs.updateFormRef.validate(async (valid) => {
        // 没通过验证
        if (!valid) return
        // 通过验证，发起修改用户信息的数据请求
        const {res} = await this.putRequest(`updateUserInfo/${this.updateForm.id}`, this.updateForm)
        // console.log(res)
        // 判断请求是否成功
        // 请求失败
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        // 刷新数据列表
        await this.getUserInfo(this.updateForm.id)
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
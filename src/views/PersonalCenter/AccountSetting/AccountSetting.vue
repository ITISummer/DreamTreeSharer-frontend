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
  <el-dialog title="用户个人信息修改" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
    <el-form ref="updateFormRef" :model="updateForm" :rules="updateFormRules" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" disabled></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input clearable type="email" v-model="updateForm.email"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input clearable type="tel" maxlength="11" v-model="updateForm.mobile"></el-input>
      </el-form-item>
    </el-form>
<!--    对话框脚部-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
       <el-button @click="editDialogClosed">重置</el-button>
      <el-button type="primary" @click="updateUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    /**
     * 验证邮箱格式
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    const checkEmail = (rule, value, callback) => {
      if (!value) {return callback(new Error('请输入邮箱！'));}
      // 验证邮箱的正则表达式
      const regOfEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      setTimeout(() => {
        if (!regOfEmail.test(value)) {
          callback(new Error('邮箱格式不匹配！'));
        } else {
            callback();
        }
      }, 500);
    };
    /**
     * 验证手机格式
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    const checkMobile = (rule, value, callback) => {
      if (!value) {return callback(new Error('请输入手机号！'));}
      setTimeout(() => {
        const regOfMobile = /^1[3456789]\d{9}$/
        if (!regOfMobile.test(value)) {
          callback(new Error('手机号格式不正确！'));
        } else {
            callback();
          }
      },500);
    };
    return {
       // 控制 修改用户对话框 的 显示与隐藏
      editDialogVisible: true,
      // 查询到的用户信息对象
      updateForm: {},
      // 修改表单的验证规则 blur: 文本失去焦点
      updateFormRules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
      },
    }
  },
  methods: {
    /**
     * 展示编辑用户的对话框<br>
     * 展示时从后台异步获取对应 id 的用户信息
     * @param id
     * @returns {Promise<ElMessageComponent>}
     */
    async getUserInfo(id) {
      // console.log(id)
      // this.editDialogVisible = true
      const { res } = await this.getRequest('getUserById/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败')
      }
      // 把查询到的数据 保存到 updateForm
      this.updateForm = res.data
      // 显示修改用户的对话框
      this.editDialogVisible = true
    },
    /**
     * 修改用户信息并提交
     */
    updateUserInfo() {
      this.$refs.updateFormRef.validate(async (valid) => {
        // console.log(valid)
        // 没通过验证
        if (!valid) return
        // 通过验证，发起修改用户信息的数据请求
        const {res} = await this.putRequest(`updateUserInfo/${this.updateForm.id}`, this.updateForm)
        // 判断请求是否成功
        // 请求失败
        if (res.meta.status !== 200) {return this.$message.error('更新用户信息失败！')}
        // 请求成功，关闭对话框
        this.editDialogVisible = false
        // 刷新数据列表
        await this.getUserInfo(this.updateForm.id)
        // 提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
    /**
     * 监听修改用户对话框的关闭事件<br>
     * updateFormRef 修改用户表单的别名<br>
     * 关闭表单<br>
     */
    editDialogClosed() {
      this.$refs.updateFormRef.resetFields()
    }
  },
}
</script>

<style scoped>

</style>
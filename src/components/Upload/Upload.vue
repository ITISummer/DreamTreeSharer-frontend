<!--
[element-ui upload](https://element.eleme.cn/#/zh-CN/component/upload)
[ElementUI的Upload上传，配合七牛云储存图片](https://segmentfault.com/a/1190000016309473)
drag	是否启用拖拽上传 默认 false
action	必选参数，上传的地址
show-file-list	是否显示已上传文件列表
on-success	文件上传成功时的钩子
on-error	文件上传失败时的钩子
before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
data	上传时附带的额外参数
-->
<template>

  <div id="upload_container">
    <a :href="imageUrl" target="_blank" v-if="imageUrl && showFlag === 'home'">
      <el-image  :src="imageUrl" class="card" />
    </a>
    <el-upload
        v-else
        drag
        :show-file-list="false"
        :action="qiniu.uploadQiniuUrl"
        :data="qiniu.qiniuData"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
    >
      <el-image v-if="imageUrl && showFlag === 'edit'" :src="imageUrl" class="card"/>
      <div v-else class="el-default">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import {EventBus,EventName} from '../../apis/eventBus'
import constants from "../../apis/constants";

export default {
  mounted() {
    // 接收来自 Home.vue 和 Pinboards.vue
    EventBus.$on(EventName.INIT_IMAGE_URL, (value, flag) => {
      this.imageUrl = value
      this.showFlag = flag
    })
  },
  data() {
    return {
      imageUrl: '',
      showFlag: '',
      qiniu: constants.qiniu
    }
  },
  methods: {
    /**
     * 图片上传前的格式校验
     */
    beforeUpload: async function (file) {
      this.qiniu.qiniuData.key = file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      await this.getQiniuToken(this.qiniu.qiniuData.key)
    },
    /**
     * 创建前从后台获取访问七牛云的 token - (key(文件名) bucket, AccessKey, SecretKey)
     */
    async getQiniuToken(key) {
      const _this = this;
      await this.getRequest(`${constants.GET_QINIU_TOKEN_URL}/${key}`).then(res => {
        if (res && res.statusCode === 200) {
          _this.qiniu.qiniuData.token = res.object;
        } else {
          _this.$message({message: res.message, duration: 2000, type: "warning"});
        }
      }).catch(err => {
        console.log('Upload.vue->getQiniuToken()->err', err)
      });
    },
    /**
     * 上传成功
     */
    handleSuccess(res) {
      this.imageUrl = this.qiniu.uploadQiniuAddr + res.key;
      this.showFlag = 'edit'
      // 向上暴露 imageUrl
      EventBus.$emit(EventName.GET_IMAGE_URL_FROM_UPLOAD, this.imageUrl)
      this.$message({message: `上传成功！图片地址为：${this.imageUrl}`, type: "success"})
    },
    /**
     * 上传失败
     */
    handleError(res) {
      this.$message({message: "上传失败", type: "error"});
    }
  }
};
</script>
<!--[译] Vue: scoped 样式与 CSS Module 对比](https://juejin.cn/post/6844903673517211655)-->
<style scoped lang="scss">
#upload_container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: #efefef;

  .card {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
}
</style>

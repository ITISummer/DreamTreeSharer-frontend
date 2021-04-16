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
  <div class="container">
    <div class="title"><h2>ElementUI的Upload上传图片到七牛云</h2></div>
    <el-upload
        class="upload-demo"
        drag
        :action="upload_qiniu_url"
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :data="qiniuData">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <div v-else class="el-default">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      qiniuData: {key: "", token: "7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:hVlr_ADbwZzdNjZIn05fKBzenow=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OnRlc3QuanBnIiwiZGVhZGxpbmUiOjE2MTg1ODA4ODh9"},
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: "http://upload-z2.qiniup.com",
      // upload_qiniu_url: "qrne6et6u.hn-bkt.clouddn.com",
      // 七牛云返回储存图片的子域名
      // upload_qiniu_addr: "http://abc.clouddn.com/",
      upload_qiniu_addr: "qrne6et6u.hn-bkt.clouddn.com/",
      global: {dataUrl: 'localhost:8080'}
    };
  },
  /**
   * 创建前从后台获取访问七牛云的 token - (bucket, AccessKey, SecretKey)
   */
  // created() {this.getQiniuToken();},
  methods: {
    // getQiniuToken: function() {
    //   const _this = this;
    //   this.$axios
    //       .post(this.global.dataUrl + "/qiniu/uploadToken")
    //       .then(function(res) {
    //         console.log(res);
    //         if (res.data.success) {
    //           _this.qiniuData.token = res.data.result;
    //         } else {
    //           _this.$message({
    //             message: res.data.info,
    //             duration: 2000,
    //             type: "warning"
    //           });
    //         }
    //       });
    // },
    /**
     * 图片上传前的格式校验
     * @param file
     * @returns {boolean}
     */
    beforeUpload: function(file) {
      this.qiniuData.key = file.name;
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
    },
    /**
     * 上传成功
     * @param res
     * @param file
     */
    handleSuccess: function(res, file) {
      this.imageUrl = "http://"+this.upload_qiniu_addr + res.key;
      this.$message({message: `上传成功！图片地址为：${this.imageUrl}`})
    },
    /**
     * 上传失败
     * @param res
     */
    handleError: function(res) {
      this.$message({
        message: "上传失败",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped lang="scss">

.title {
  margin: 90px 0 40px 0;
}
.el-default {
  .el-icon-upload {
    margin-top: 125px;
  }
}
.el-upload-dragger {
  width: 350px;
  height: 350px;
}
.avatar {
  width: 350px;
  height: 350px;
  display: block;
}

</style>

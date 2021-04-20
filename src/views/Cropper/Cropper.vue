<!--<template>-->
<!--&lt;!&ndash;<a class="btn" @click="toggleShow">set avatar</a>&ndash;&gt;-->
<!--<my-upload field="img"-->
<!--           @crop-success="cropSuccess"-->
<!--           @crop-upload-success="cropUploadSuccess"-->
<!--           @crop-upload-fail="cropUploadFail"-->
<!--           v-model="show"-->
<!--           :width="300"-->
<!--           :height="300"-->
<!--           url="/upload"-->
<!--           :params="params"-->
<!--           :headers="headers"-->
<!--           img-format="png"></my-upload>-->
<!--<img :src="imgDataUrl">-->
<!--</template>-->
<!--<script>-->
<!--import 'babel-polyfill'; // es6 shim-->
<!--import myUpload from 'vue-image-crop-upload';-->
<!--export default {-->

<!--  data() {-->
<!--    return {-->
<!--    show: true,-->
<!--    params: {-->
<!--      token: '7viju8jm47T3cIZFLPXPJpj28OUpjQzFPS5Fw80p:SdY3W3UQRDLXTPTa6b9drb5p1ac=:eyJzY29wZSI6Iml0aXN1bW1lci1odWFuYW4tYnVja2V0OuS4reWbveWcsOWbvi5qcGciLCJkZWFkbGluZSI6MTYxODg5NTE1MH0=',-->
<!--      name: 'avatar.jpg'-->
<!--    },-->
<!--    headers: {-->
<!--      smail: '*_~'-->
<!--    },-->
<!--    imgDataUrl: '' // the datebase64 url of created image-->
<!--    }-->
<!--  },-->
<!--  components: {-->
<!--    'my-upload': myUpload-->
<!--  },-->
<!--  methods: {-->
<!--    toggleShow() {-->
<!--      this.show = !this.show;-->
<!--    },-->
<!--    /**-->
<!--     * crop success-->
<!--     *-->
<!--     * [param] imgDataUrl-->
<!--     * [param] field-->
<!--     */-->
<!--    cropSuccess(imgDataUrl, field){-->
<!--      console.log('&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; crop success &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;');-->
<!--      this.imgDataUrl = imgDataUrl;-->
<!--    },-->
<!--    /**-->
<!--     * upload success-->
<!--     *-->
<!--     * [param] jsonData  server api return data, already json encode-->
<!--     * [param] field-->
<!--     */-->
<!--    cropUploadSuccess(jsonData, field){-->
<!--      console.log('&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; upload success &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;');-->
<!--      console.log(jsonData);-->
<!--      console.log('field: ' + field);-->
<!--    },-->
<!--    /**-->
<!--     * upload fail-->
<!--     *-->
<!--     * [param] status    server api return error status, like 500-->
<!--     * [param] field-->
<!--     */-->
<!--    cropUploadFail(status, field){-->
<!--      console.log('&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; upload fail &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;');-->
<!--      console.log(status);-->
<!--      console.log('field: ' + field);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <div id="panel">
  </div>
</template>

<script>
export default {
  methods: {
    mouseMove(e) {
      /*这里获取元素节点*/
      let oPanel = document.getElementById("panel");
      let oSpan = document.createElement(`span`);
      /*浏览器兼容*/
      e = e || window.Event;
      // let x = e.clientX;
      // let y = e.clientY;
      /*获取相关参数*/
      oSpan.style.left = e.clientX + `px`;
      oSpan.style.top = e.clientY - 50 + `px`;
      /*设定随机数存储在size中*/
      let size = Math.random() * 20;
      /*给节点赋值参数数值*/
      oSpan.style.width = 5 + size + `px`;
      oSpan.style.height = 5 + size + `px`;
      /*在body中添加span标签*/
      oPanel.appendChild(oSpan);
      /*设置定时器 间隔时间为2000毫秒*/
      setTimeout(() => {
        /*清除ospan节点*/
        oSpan.remove();
      }, 1000);
    },
  },
  mounted() {
    /*这里是给整个页面添加了一个鼠标移动的监听事件 e为事件对象*/
    document.addEventListener(`mousemove`, this.mouseMove);
  },
  beforeDestroy() {
    document.removeEventListener(`mousemove`, this.mouseMove);
  },
};
</script>

<style lang='scss' scoped>
@keyframes blow {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
    filter: hue-rotate(0deg);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -1000%);
    opacity: 0;
    filter: hue-rotate(720deg);
    -webkit-transform: translate(-50%, -1000%);
    -moz-transform: translate(-50%, -1000%);
    -ms-transform: translate(-50%, -1000%);
    -o-transform: translate(-50%, -1000%);
    -webkit-filter: hue-rotate(720deg);
  }
}

#panel {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  span {
    width: 10px;
    height: 10px;
    background: #55b9f3;
    border-radius: 50%;
    position: absolute;
    box-shadow: 5px 5px 15px #489dcf, -5px -5px 15px #62d5ff;
    animation: blow 4s linear infinite;
    -webkit-animation: blow 4s linear infinite;
  }
}
</style>

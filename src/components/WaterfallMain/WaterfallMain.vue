<template>
  <!--    瀑布流主体-->
  <el-main class="main-content">
    <!-- 滚动加载 下面 v-infinite-scroll 的放置位置与瀑布流是否能够加载有关 -->
    <div v-infinite-scroll="load" infinite-scroll-disabled="disabled" class="waterfall-container">
      <!--        封装了 vue-waterfall 插件 -->
      <Waterfall ref="waterfall" :list="list" :gutter="10" :width="250"
           :breakpoints="{
            //当屏幕宽度小于等于1200
            1200: { rowPerView: 5},
            //当屏幕宽度小于等于800
            800: { rowPerView: 4},
            //当屏幕宽度小于等于500
            500: { rowPerView: 2}
          }"
         animationEffect="fadeIn"
         :animationDuration="3+'s'"
         :animationDelay="0.6+'s'"
         backgroundColor="rgb(73, 74, 95)"
      >
        <!--
          图片插槽-item，props 就代表一张图片插槽的属性！
          props.data = {src,blankColor,itemWidth}
          itemWidth 对应 <Waterfall>中的 width
        -->
        <template slot="item" slot-scope="props">
          <div class="card">
            <div class="cover" @click="handleClick(props.data)">
              <el-image :src="props.data.src" :alt="props.data.src" @load="$refs.waterfall.refresh"/>
            </div>
            <div class="menus">
              <el-avatar data-title="卡片发布者头像" :src="userInfo.userAvatarUrl"/>
              <span class="user-name">{{userInfo.userUsername}}</span>
              <p data-title="编辑" @click="handleEdit(props.data)" v-if="showCardFooter"/>
              <p data-title="删除" @click="handleDelete(props.data)" v-if="showCardFooter"/>
            </div>
          </div>
        </template>
      </Waterfall>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </el-main>
</template>

<script>
import Waterfall from 'vue-waterfall-plugin';
export default {
  components: {Waterfall},
  props: {
    images: {type: Array, default: []},
    showCardFooter: {type: Boolean, default: false},
    handleClick: Function,
    handleEdit: Function,
    handleDelete: Function,
  },
  mounted() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
  },
  data() {
    return {
      userInfo: {},
      loading: false,
      list: [],
    }
  },
  computed: {
    noMore() {return this.list.length >= 200;},
    disabled() {return this.loading || this.noMore;},
  },
  methods: {
    /**
     * 加载图片
     */
    async load() {
      this.loading = true;
      await this.addNewList();
      this.loading = false;
    },
    /**
     * 添加到新 list 中
     * [es6 扩展运算符 三个点（...）](https://blog.csdn.net/qq_30100043/article/details/53391308)
     */
    addNewList() {
      // axios 异步向数据库发送请求 TODO
      // 然后使用 const list = this.images.map()
      return new Promise((resolve) => {
        const list = this.images.map((item, index) => {
          return {...item}
        });
        this.list.push(...list);
        setTimeout(() => resolve(), 2000);
      });
    },
  }
};
</script>

<style scoped lang="scss">
//.main-container {
//  display: flex;
//}
/**
主体样式
 */
.main-content {
  background: #6e8efb;
  height: 100vh;
  overflow-y: auto;
  .waterfall-container{
    margin-top: 40px;
  }
  .card { /** 每一张卡片样式 */
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: 0.2s;
    top: 0;
    &:hover {
      top: -3px;
    }
    .cover {
      margin: 10px 10px 0 10px;
      img {
        display: block;
        width: 100%;
      }
    }
    .name { //卡片底部名字样式
      background: #fff;
      color: #666;
      font-weight: 600;
      padding: 10px 20px;
      font-size: 14px;
    }
    .menus {// 卡片操作菜单栏
      padding: 10px;
      border-top: 1px solid #e7e7e7;
      text-align: right;
      p {
        position: relative;
        display: inline-block;
        padding: 4px 10px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        user-select: none;
        color: white;
        font-size: 12px;
        margin-left: 10px;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          border-radius: 4px;
          transition: box-shadow 0.5s ease, transform 0.2s ease;
          will-change: transform;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
        }
        &:hover::before {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        &::after {
          position: relative;
          display: inline-block;
          content: attr(data-title);
          transition: transform 0.2s ease;
          font-weight: bold;
          letter-spacing: 0.01em;
          will-change: transform;
          transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
        }
      }
    }
  }
}
</style>
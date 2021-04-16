<!--[瀑布流学习地址](https://www.jianshu.com/p/97b89597ab5c)-->
<template>
  <el-container class="main-container" >
    <!--    头部-->
    <el-header>
      <el-row align="middle" justify="center">
        <el-col :span="2">
          <img  width="36" height="36" src="../../assets/logo.png"/>
<!--          <el-avatar size="large" src=""></el-avatar>-->
        </el-col>
        <el-col :span="2">
          <div>
            <el-button round>Home</el-button>
          </div>
        </el-col>
        <el-col :span="15" :offset="1">
          <el-input type="text" placeholder="Type something" prefix-icon="el-icon-search" v-model="search"></el-input>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-dropdown>
            <div class="el-dropdown-link">
              <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item disabled>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <!--    主体-->
    <el-main  class="main-content">
      <!-- 滚动加载 -->
      <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <Waterfall ref="waterfall" :list="list" :gutter="10" :width="240"
         :breakpoints="{
          //当屏幕宽度小于等于1200
            1200: { rowPerView: 4, },
            //当屏幕宽度小于等于800
            800: { rowPerView: 3, },
            //当屏幕宽度小于等于500
            500: { rowPerView: 2, }
          }"
           :animationEffect="effect"
           :animationDuration="`${duration}s`"
           :animationDelay="`${delay}s`"
           backgroundColor="rgb(73, 74, 95)"
        >
          <!--            卡片-->
          <template slot="item" slot-scope="props">
            <div class="card">
              <div class="cover" :style="initCardStyle(props)" @click="handleClick(props.data)">
                <img :src="props.data.src" :alt="props.data.src" @load="$refs.waterfall.refresh">
              </div>
              <div class="name">
                <p>height:{{ `${Math.floor(props.data.itemWidth / props.data.width * props.data.height)}px` }}</p>
              </div>
              <div class="menus">
                <el-avatar data-title="卡片发布者头像" size="small"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           @error="handleEdit(props.data)">
                </el-avatar>
                <p data-title="编辑" @click="handleEdit(props.data)"/>
                <p data-title="删除" @click="handleDelete(props.data)"/>
              </div>
            </div>
          </template>
        </Waterfall>
      </div>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </el-main>
  </el-container>
</template>

<script>
import Waterfall from 'vue-waterfall-plugin';
// const baseURL = '../../assets/images/'
export default {
  components: {Waterfall},

  data() {
    return {
      search: '',
      // 图片地址与图片原始高度
      images: [
        {src: require(`../../assets/images/1.jpg`), width: 400, height: 400},
        {src: require(`../../assets/images/2.jpg`), width: 500, height: 701},
        {src: require(`../../assets/images/3.jpg`), width: 500, height: 673},
        {src: require(`../../assets/images/4.jpg`), width: 600, height: 845},
        {src: require(`../../assets/images/5.jpg`), width: 600, height: 799},
        {src: require(`../../assets/images/6.jpg`), width: 597, height: 593},
        {src: require(`../../assets/images/7.jpg`), width: 650, height: 912},
        {src: require(`../../assets/images/8.jpg`), width: 500, height: 1411},
        {src: require(`../../assets/images/9.jpg`), width: 620, height: 835},
        {src: require(`../../assets/images/10.jpg`), width: 658, height: 940},
        {src: require(`../../assets/images/11.jpg`), width: 658, height: 658},
        {src: require(`../../assets/images/12.jpg`), width: 658, height: 688},
        {src: require(`../../assets/images/13.jpg`), width: 658, height: 862},
        {src: require(`../../assets/images/14.jpg`), width: 658, height: 877},
        {src: require(`../../assets/images/15.jpg`), width: 468, height: 662},
        {src: require(`../../assets/images/16.jpg`), width: 719, height: 1101},
      ],
      colors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'],
      list: [],
      loading: false,
      effect: 'fadeIn',
      duration: 1,
      delay: 0.3,
      boxWidth: 'auto',
      effectOptions: [
        {label: 'fadeIn', value: 'fadeIn'},
        {label: 'fadeInUp', value: 'fadeInUp'},
        {label: 'fadeInDown', value: 'fadeInDown'},
        {label: 'zoomIn', value: 'zoomIn'}
      ],
    };
  },

  computed: {
    noMore() {return this.list.length >= 200;},
    disabled() {return this.loading || this.noMore;}
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
     */
    addNewList() {
      return new Promise((resolve) => {
        const list = this.images.map((item, index) => {return {...item, blankColor: this.colors[index % this.colors.length]}});
        this.list.push(...list);
        setTimeout(() => resolve(), 3000);});
    },
    /**
     *初始化卡片样式
     */
    initCardStyle(props) {
      if (this.isSetInitStyle) {
        return {
          width: `${props.data.itemWidth - 20}px`,
          height: `${((props.data.itemWidth - 20) / props.data.width) * props.data.height}px`,
          backgroundColor: props.data.blankColor
        };
      }
    },
    /**
     * 图片点击
     */
    handleClick(item) {this.$message.info(JSON.stringify(item));},
    /**
     * 编辑
     */
    handleEdit() {this.$message.success('编辑');},
    /**
     * 删除
     */
    handleDelete() {this.$message.error('删除');},
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  .el-header {
    background: #66677c;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    border-radius: 20px;
    padding: 10px 0 0 0;
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    img {
      cursor: pointer;
      border-radius: 13px;
    }
  }
  /**
  主体样式
   */
  .main-content {
    flex: 1;
    background: #66677c;
    height: 100vh;
    overflow-y: auto;
    padding: 60px 0 0 0;
  }
}

/**
每一张卡片样式
 */
.card {
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
  // 卡片底部名字样式
  .name {
    background: #fff;
    color: #666;
    font-weight: 600;
    padding: 10px 20px;
    font-size: 14px;
  }

  // 卡片操作菜单栏
  .menus {
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
</style>

<template>
  <!--    瀑布流主体-->
  <el-main id="main-content">
    <!-- 滚动加载 下面 v-infinite-scroll 的放置位置与瀑布流是否能够加载有关 -->
    <div v-infinite-scroll="load" infinite-scroll-disabled="disabled" class="waterfall-container">
      <!--      waterfall 组件 -->
      <Waterfall ref="waterfall" :list="list" :gutter="8" :width="235"
                 :breakpoints="{
                  //当屏幕宽度小于等于1200
                  1200: { rowPerView: 5},
                  //当屏幕宽度小于等于800
                  800: { rowPerView: 4},
                  //当屏幕宽度小于等于500
                  500: { rowPerView: 3}
                }"
                 animationEffect="fadeIn"
                 :animationDuration="2+'s'"
                 :animationDelay="0.6+'s'"
                 backgroundColor="rgb(73, 74, 95)"
      >
        <!--
          图片插槽-item，props 就代表一张图片插槽的属性！
          props.data = {src,blankColor,itemWidth}
          itemWidth 对应 <Waterfall>中的 width 属性
        -->
        <template slot="item" slot-scope="props">
          <div class="card">
            <div v-show="showSaveBtnInWaterfall">
              <el-button type="danger" round class="save-btn" @click="savePin(props.data)">Save</el-button>
            </div>
            <div v-show="showSaveBtnInWaterfall">
              <el-button type="danger" round class="thumb" @click="like(props.data)">👍</el-button>
            </div>
            <div class="cover" @click="handleClick(props.data)">
              <el-image :src="props.data.pinboardBgimgUrl"
                        :alt="props.data.pinboardBgimgUrl" @load="$refs.waterfall.refresh"/>
              <div class="dream">
                <div class="dream-font">
                  <div class="dream-title">{{ props.data.pinboardTitle }}</div>
                  <hr>
                  <div class="dream-content">{{ props.data.pinboardContent }}</div>
                </div>
              </div>
            </div>
            <div class="menus">
              <!--Home 页所需-->
              <div v-if="showAvatar" class="avatar-and-like">
                <el-avatar :title="props.data.userUsername" :src="getBaseUrl+props.data.userAvatarUrl"/>
                <span class="like-num">👍{{ props.data.likeNum }}</span>
              </div>
              <!--Favorites 页所需-->
              <div v-else-if="showSavedFrom" class="save-from">
                <strong>Saved From: </strong>
                <router-link :to="{path: '/profile',query:{username:props.data.userUsername}}">
                  <span>{{ props.data.userUsername }}</span></router-link>
              </div>
              <!--Pinboards 页所需-->
              <div v-else class="edit">
                <p data-title="编辑" @click="handleEdit(props.data)"/>
                <p data-title="删除" @click="handleDelete(props.data)"/>
              </div>
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
import constants from "../../apis/constants";
import {getBaseUrl} from "../../apis/commonMethods";

export default {
  components: {Waterfall},
  props: {
    images: {type: Array, default: []},
    showAvatar: {type: Boolean, default: true},
    showSavedFrom: {type: Boolean, default: false},
    showSaveBtnInWaterfall: {type: Boolean, default: true},
    handleClick: Function,
    handleEdit: Function,
    handleDelete: Function,
  },
  data() {
    return {
      loading: false,
      list: [],
    }
  },
  computed: {
    noMore() {
      return this.list.length >= this.images.length;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    getBaseUrl() {
      return getBaseUrl()
    }
  },
  methods: {
    /**
     * 图片点赞
     */
    like(item) {
      let el_mock = {}
      let num_mock = item.likeNum
      this.list.forEach(el => {
        if (el.pinboardId === item.pinboardId) {
          el_mock = el
          num_mock = el.likeNum
          if (el.isliked) {
            el.likeNum--
          } else {
            el.likeNum++
          }
          el.isliked = !el.isliked
        }
      })
      // console.log(el_mock)
      this.putRequest(`${constants.UPDATE_PIN_LIKE_NUM}/${item.pinboardId}/${el_mock.likeNum}`).then(res => true).catch(err => {
        // 如果发生错误则需要还原点赞量
        el_mock.likeNum = num_mock
        // 发送还原点赞量请求
        this.putRequest(`${constants.UPDATE_PIN_LIKE_NUM}/${item.pinboardId}/${el_mock.likeNum}`).then(res => true).catch(err => {
          console.log('WaterfallMain.vue->like(err_1)', err)
        })
      })
    },
    /**
     * 收藏一个 Pin
     */
    savePin(item) {
      this.postRequest(`${constants.FAVORITE_ONE_PIN}/${item.pinboardId}`).then(res => true).catch(err => {
        console.log('Home.vue->savePin()->err', err)
      })

    }
    ,
    /**
     * 加载图片
     */
    async load() {
      this.loading = true;
      await this.addNewList();
      this.loading = false;
    }
    ,
    /**
     * 添加到新 list 中
     * [es6 扩展运算符 三个点(...)](https://blog.csdn.net/qq_30100043/article/details/53391308)
     */
    addNewList() {
      return new Promise((resolve) => {
        const list = this.images.map((item, index) => {
          return {...item}
        });
        this.list.push(...list);
        setTimeout(() => resolve(), 1000);
      });
    }
    ,
  }
}
</script>

<style scoped lang="scss">
#main-content {
  background: #6e8efb;
  height: 100vh;
  overflow-y: auto;

  .waterfall-container {
    margin-top: 40px;
  }

  .card { //每一张卡片样式
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: 0.2s;
    top: 0;

    &:hover {
      top: -3px;
      background: rgba(201, 147, 147, 0.1);
      .save-btn { // 设置按钮显示
        display: block;
      }
      .thumb {
        display: block;
      }
      .dream {
        display: block;
      }
    }

    .save-btn {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 102;
    }

    .thumb {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 102;
      background: url("thumb.png") no-repeat;
      border-style: none;
    }

    //.cover {
    //  position: relative;
    //}

    .dream {
      position: absolute;
      background: rgba(66, 65, 65, 0.6);
      //background: white;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      //----------------
      display: none;
      z-index: 101;
      .dream-font{
        position: absolute;
        top: 45px;
        width: 100%;
        height: 100%;
        .dream-title {
          width: 100%;
          color: #3a8ee6;
          font-size: 18px;
          font-weight: bold;
          font-style: italic;
        }
        .dream-content {
          width: 100%;
          color: #f3cf06;
          font-size: 15px;
        }
      }
    }

    //.name { //卡片底部名字样式
    //  background: #fff;
    //  color: #666;
    //  font-weight: 600;
    //  padding: 10px 20px;
    //  font-size: 14px;
    //}

    .menus { // 卡片操作菜单栏
      background-image: linear-gradient(45deg, #F73D3D 25%, #4F1948 50%, #D12378 75%, #24A4E9 100%);
      position: relative;
      z-index: 102;
      padding: 10px;
      border-top: 1px solid #e7e7e7;
      text-align: right;

      .avatar-and-like {
        display: flex;
        justify-content: space-between;
      }

      .save-from {
        text-align: left;

        strong {
          font-size: 14px;
        }

        a {
          font-size: 12px;
        }
      }

      .edit {
        display: flex;
        justify-content: space-between;
      }

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

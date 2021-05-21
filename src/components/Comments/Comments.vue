<!--评论模块
[vue + element-ui + scss 仿简书评论模块](https://juejin.cn/post/6844903635063668744)
[时间格式化及操作（moment.js篇）](https://segmentfault.com/a/1190000016117935)
[momentjs 中文网 #显示](http://momentjs.cn/docs/#/displaying/)
[Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
-->
<template>
  <div id="comments-container">
    <div class="comment" v-for="comment in comments">
      <!--      头像、评论者昵称、日期-->
      <div class="info">
        <img class="avatar" :src="getBaseUrl+comment.fromAvatar" width="36" height="36"/>
        <div class="right">
          <div class="name">{{ comment.fromName }}</div>
          <div class="date">{{ comment.date }}</div>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <!--      点赞选项 -->
      <div class="control">
        <span class="like" :class="{active: comment.isLiked}" @click="likeClick(comment)">
          <span class="like-num">👍{{ comment.likeNum > 0 ? comment.likeNum + '人赞' : '赞' }}</span>
        </span>
      </div>
    </div>
    <button @click="loadComments" v-if="showLoadBtn">点击加载更多评论</button>
    <div v-else>没有更多评论~</div>
    <div class="comment">
      <div class="reply">
        <!--        添加母评论-->
        <div class="write-reply" @click="showCommentInput">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <!--      评论输入框  -->
        <transition name="fade">
          <div class="input-wrapper" v-show="showInput">
            <el-input class="gray-bg-input"
                      v-model="inputComment"
                      type="textarea"
                      :rows="3"
                      autofocus
                      placeholder="写下你的评论">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import constants from "../../apis/constants";
import {EventBus} from "../../apis/eventBus";
// 分页查询评论
let limit = 2
let offset = 0
export default {
  data() {
    return {
      showLoadBtn: false,
      inputComment: '',
      showItemId: '',
      showInput: false,
      comments: [],
      pinboardInfo: {},
    }
  },
  i_mounted() {
    EventBus.$on('getPinboardInfoFromHome', value=>{
      offset = 0
      this.comments = []
      this.pinboardInfo = value
      this.loadComments();
    })
  },
  computed: {
    getBaseUrl() {
      return this.baseUrl
    }
  },
  methods: {
    showCommentInput() {
      this.showInput = !this.showInput
    },
    /**
     * 取消评论
      */
    cancel() {
      this.showItemId = ''
      this.showInput = false
    },

    /**
     * 加载更多评论 - 分页查询
      */
    loadComments() {
      // getRequest(`/get-comments/${this.$store.state.pinboardInfo.pinboardId}/${limit}/${offset}`).then(res=>{
            this.getRequest(`/get-comments/${this.pinboardInfo.pinboardId}/${limit}/${offset}`).then(res=>{
        if (res) {
        Array.from(res.object,value=>{
          this.comments.push(value)
        })
          if (res.object.length < limit) {
            this.showLoadBtn = false
          }else {
            offset += 2
            this.showLoadBtn = true
          }
        } else {
          this.showLoadBtn = false
        }
      }).catch(err=>{
        console.log(err)
      })
    },

    /**
     * 点赞
     */
    likeClick(item) {
      console.log(item)
      if (item.isLiked === null) {
        this.$set(item, "isLiked", true);
        item.likeNum++
      } else {
        if (item.isLiked) {
          // TODO 发送请求更新点赞数
          item.likeNum--
        } else {
          // TODO 发送请求更新点赞数
          item.likeNum++
        }
        item.isLiked = !item.isLiked;
      }
      this.putRequest(`update-like-num/${item.commentId}/${item.likeNum}`).then(res=>true).catch(err=>{
        console.log(err)
      })
    },

    /**
     * 确认提交评论
      */
    commitComment() {
      if (this.inputComment !== '') {
        // 每次添加前new一个comment以防止数据覆盖
        const comment = {
          date: this.$moment(Date.now()).format('yyyy-MM-DD HH:mm:ss'),  //评论时间
          pinboardId: this.pinboardInfo.pinboardId,//图片的id
          fromId: this.$store.state.user.userInfo.userId, //评论者id
          fromName: this.$store.state.user.userInfo.userUsername,  //评论者昵称
          fromAvatar: this.$store.state.user.userInfo.userAvatarUrl,//评论者头像
          likeNum: 0, //点赞人数
          content: this.inputComment,  //评论内容
        }
        //TODO 向后台发送请求添加一个评论，如果后台返回成功，则将 comment push 进 comments，后台需要返回 commentId
        this.postRequest('/add-one-comment',comment).then(res=>{
          if (res && res.statusCode === 200) {
            comment.commentId = res.object
            this.showInput = false
            this.showLoadBtn = true
            this.inputComment = ''
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "./scss/index";

#comments-container {
  width: 100%;
  height: 90%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: scroll;

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 50%;
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }

    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }

    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;

      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;

        &.active, &:hover {
          color: $color-main;
        }

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }

      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $text-333;
        }

        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }

    }

    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;

      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;

        &:hover {
          color: $text-main;
        }

        .el-icon-edit {
          margin-right: 5px;
        }
      }

      .fade-enter-active, fade-leave-active {
        transition: opacity 0.5s;
      }

      .fade-enter, .fade-leave-to {
        opacity: 0;
      }

      .input-wrapper {
        padding: 10px;

        .gray-bg-input, .el-input__inner {
          /*background-color: #67C23A;*/
        }

        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;

          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
              color: $text-333;
            }
          }

          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>

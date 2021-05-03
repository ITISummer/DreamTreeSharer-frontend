<!--评论模块
[vue + element-ui + scss 仿简书评论模块](https://juejin.cn/post/6844903635063668744)
-->
<template>
  <div id="comments-container">
    <div class="comment" v-for="comment in comments">
<!--      头像、昵称、日期-->
      <div class="info">
        <img class="avatar" :src="comment.fromAvatar" width="36" height="36"/>
        <div class="right">
          <div class="name">{{comment.fromName}}</div>
          <div class="date">{{comment.date}}</div>
        </div>
      </div>
<!--      母评论内容 -->
      <div class="content">{{comment.content}}</div>
<!--      点赞与回复选项 -->
      <div class="control">
        <span class="like" :class="{active: comment.isLiked}" @click="likeClick(comment)">
          <i class="el-icon-goblet-full"></i>
          <span class="like-num">{{comment.likeNum > 0 ? comment.likeNum + '人赞' : '赞'}}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(comment)">
          <i class="el-icon-s-comment"></i>
          <span>回复</span>
        </span>
      </div>
<!--      子评论-->
      <div class="reply">
        <div class="item" v-for="reply in comment.reply">
<!--          子评论 昵称，对应母评论者昵称-->
          <div class="reply-content">
            <span class="from-name">{{reply.fromName}}</span><span>: </span>
            <span class="to-name">@{{reply.toName}}</span>
            <span>{{reply.content}}</span>
          </div>
<!--         评论日期和评论框 -->
          <div class="reply-bottom">
            <span>{{reply.date}}</span>
            <span class="reply-text" @click="showCommentInput(comment, reply)">
              <i class="el-icon-s-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
<!--        添加母评论-->
        <div class="write-reply" v-if="comment.reply.length > 0" @click="showCommentInput(comment)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === comment.id">
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

export default {
  data() {
    return {
      inputComment: '',
      showItemId: '',
      comments: [
        {
          id: 'comment0001', //主键id
          date: '2018-07-05 08:30',  //评论时间
          ownerId: 'talents100020', //图片的id
          fromId: 'errhefe232213',  //评论者id
          fromName: '犀利的评论家',   //评论者昵称
          fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //评论者头像
          likeNum: 3, //点赞人数
          content: '非常靠谱的程序员',  //评论内容
          reply: [  //回复，或子评论
            {
              id: '34523244545',  //主键id
              commentId: 'comment0001',  //父评论id，即父亲的id
              fromId: 'observer223432',  //评论者id
              fromName: '夕阳红',  //评论者昵称
              fromAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', //评论者头像
              toId: 'errhefe232213',  //被评论者id
              toName: '犀利的评论家',  //被评论者昵称
              toAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg',  //被评论者头像
              content: '赞同，很靠谱，水平很高',  //评论内容
              date: '2018-07-05 08:35'   //评论时间
            },
            // {
            //   id: '34523244545',
            //   commentId: 'comment0001',
            //   fromId: 'observer567422',
            //   fromName: '清晨一缕阳光',
            //   fromAvatar: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
            //   toId: 'observer223432',
            //   toName: '夕阳红',
            //   toAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
            //   content: '大神一个！',
            //   date: '2018-07-05 08:50'
            // }
          ]
        },
        // {
        //   id: 'comment0002',
        //   date: '2018-07-05 08:30',
        //   ownerId: 'talents100020',
        //   fromId: 'errhefe232213',
        //   fromName: '毒蛇郭德纲',
        //   fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        //   likeNum: 0,
        //   content: '从没见过这么优秀的人',
        //   reply: []
        // }
      ]
    }
  },
  methods: {
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLiked === null) {
        this.$set(item, "isLiked", true);
        item.likeNum++
      } else {
        if (item.isLiked) {
          item.likeNum--
        } else {
          item.likeNum++
        }
        item.isLiked = !item.isLiked;
      }
    },
    /**
     * 点击评论按钮显示输入框
     * item: 当前母评论
     * reply: 当前子评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = "@" + reply.fromName + " "
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
    },
    cancel() {this.showItemId = ''},
    commitComment() {console.log(this.inputComment);},

  },
  created() {console.log(this.comments)}
}
</script>

<!--
1. 加与不加 scoped 无影响
2. 加 module 会有很大影响
-->
<style scoped lang="scss">
@import "./scss/index";

#comments-container {
  padding: 0 10px;
  box-sizing: border-box;
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
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .from-name {
            color: $color-main;
          }
          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
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

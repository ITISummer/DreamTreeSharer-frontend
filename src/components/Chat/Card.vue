<!--
[#select](https://element.eleme.io/#/en-US/component/select#select)
[elementUI el-select中el-option中插入图片](https://blog.csdn.net/weixin_43861299/article/details/107311108)
[Vue+Element+Select获取选中的对象](https://blog.csdn.net/weixin_30788239/article/details/98126179)
-->
<template>
  <div id="card">
    <header>
      <img class="avatar" :src="getUserAvatarUrl">
      <p class="name">{{ currentUser.userUsername }}</p>
    </header>
    <footer>
      <el-select
          class="search"
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="search chat user..."
          :remote-method="filterOptions"
          :loading="loading"
          @change="refreshChatList">
        <el-option
            style="margin-bottom: 10px;height: 40px;position: relative;"
            v-for="item in options"
            :key="item.userId"
            :label="item.userUsername"
            :value="item.userUsername">
          <el-avatar
              style="margin-left:-15px;margin-right:6px;height:39px;"
              :src="getBaseUrl+item.userAvatarUrl"/>
          <span style="position: absolute;top: 0px;">{{ item.userUsername }}</span>
        </el-option>
      </el-select>
    </footer>
  </div>
</template>

<script>
import constants from "@/apis/constants";
import {getUserAvatarUrl,getBaseUrl} from "../../apis/commonMethods";

export default {
  data() {
    return {
      currentUser: this.$store.state.chat.currentUser,
      options: [],
      value: [],
      loading: false,
      list: [
        {
          userId: '1',
          userUsername: 'summer',
          userAvatarUrl: 'user1.jpg'
        },
        {
          userId: '2',
          userUsername: 'summerlv',
          userAvatarUrl: 'user2.jpg'
        },
        {
          userId: '3',
          userUsername: 'sulv',
          userAvatarUrl: 'user3.jpg'
        }
      ],
    }
  },
  mounted() {
    this.getRequest(constants.GET_CHAT_LIST).then(res => {
      if (res) {
        this.list = res.object
      }
    }).catch(err => {
      console.log('Card.vue->mounted()->err', err)
    })
  },
  computed: {
    getUserAvatarUrl() {
      return getUserAvatarUrl(this.currentUser)
    },
    getBaseUrl() {
      return getBaseUrl()
    }
  },
  methods: {
    /**
     * 根据用户选择获取 chat list
     * @param optionValue
     */
    refreshChatList(optionValue) {
      let chatList = []
      optionValue.forEach(value => {
        this.options.filter(option => {
          if (value === option.userUsername) {
            chatList.push(option)
          }
        })
      })
      this.$store.dispatch('initChatList', chatList)
    },
    filterOptions(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.userUsername.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 500);
      } else {
        this.options = [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#card {
  padding: 12px;

  .avatar {
    width: 40px;
    height: 40px;
    /*这个是图片和文字居中对齐*/
    vertical-align: middle;
  }

  .name {
    display: inline-block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }

  .search {
    margin-top: 5px;
    background: #26292E;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    /*鼠标点击后不会出现蓝色边框*/
    outline: none;
    color: #FFF;
  }
}
</style>

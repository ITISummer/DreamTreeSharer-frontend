<!--
[element-ui table中的图片的显示 解决方案](https://blog.csdn.net/DianaGreen7/article/details/81169893)
[element UI 的row-click事件如何使用参数？](https://blog.csdn.net/Gochan_Tao/article/details/79606066)
-->
<template>
  <div>
    <el-dialog title="模糊查询结果" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" v-if="flag === '1'">
        <el-table-column label="用户头像"  prop="userAvatarUrl">
          <template slot-scope="scope" property="userAvatarUrl">
            <el-avatar size="large" :src="getBaseUrl+scope.row.userAvatarUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="用户名"  prop="userUsername">
          <template slot-scope="scope" property="userUsername">
            <router-link :to="{path: '/profile',query:{username:scope.row.userUsername}}">
              <span>{{ scope.row.userUsername }}</span></router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 模糊分页查询 pin-title 或者 pin-type 后的展示 table -->
<!--          <el-table :data="gridData" v-else @row-click="rowClick">-->
      <el-table :data="gridData" v-else>
        <el-table-column label="梦卡背景图" prop="pinboardBgimgUrl">
          <template slot-scope="scope">
            <el-image fit="cover" style="width: 100px; height: 100px" :src="scope.row.pinboardBgimgUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="flag === '2'? '梦卡类型':'梦卡标题'"
                         :prop="flag === '2'?'pinboardType':'pinboardTitle'">
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="this.total"
          :page-size="size">
      </el-pagination>
    </el-dialog>

    <Dialog
        :showDialog.sync="showDialog"
        :showCommentsOrDreamForm="false"
        :showSelect="false"/>
  </div>
</template>

<script>
import {EventBus} from "../../apis/eventBus";
import constants from "../../apis/constants";
import {getBaseUrl} from "../../apis/commonMethods";

export default {
  props: {
    search: '',
    flag: '',
  },
  computed: {
    getBaseUrl() {
      return getBaseUrl();
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      // 分页查询
      size: 5, // 每页数量[5,21] 的奇数
      currentPage: 1, // 初始查询页
      gridData: [],
      total: 0,
      showDialog: false
    }
  },
  methods: {
    // rowClick(item) {
    //   console.log(item)
    //   // 获取图片元数据后，设置 dialog 显示为 true，通过 $emit()
    //   this.showDialog = true
    //   EventBus.$emit('getPinboardInfoFromHome', item)
    //   EventBus.$emit('initImageUrl', item.pinboardBgimgUrl)
    //   EventBus.$emit('showSaveBtn', false)
    //   EventBus.$emit('showSaveFromSiteBtn', false)
    // },
    /**
     * 当前页
     * @param currentPage
     */
    currentChange(currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
      this.fuzzySearch()
    },
    /**
     * 模糊查询字段验证
     */
    validate() {
      console.log(this.flag, '-----', this.search)
      // 先判断 search 和 flag 是否为空
      if (this.search === '' || this.flag === '') {
        this.$message({message: '请正确填写字段！', type: 'warning'})
      } else {
        // 每次调用之前 offset 记得清零
        this.offset = 0
        this.fuzzySearch()
        this.dialogTableVisible = true
      }
    },
    /**
     * 模糊查询
     */
    fuzzySearch() {
      // 判断 flag，根据 flag 向后端发送数据，对相关表进行字段模糊查询
      this.getRequest(`${constants.FUZZY_SEARCH}/${this.flag}/${this.search}/${this.size}/${this.currentPage}`).then(res => {
        if (res) {
          this.total = res.object.total
          this.gridData = res.object.records
        } else {
          this.$message.warning('已无更多数据！')
        }
      }).catch(err => {
        console.log('Pagination.vue->fuzzySearch()->err',err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-dialog .el-table{
      //display: flex;
      //justify-content: center;
      //align-items: center;
}
</style>

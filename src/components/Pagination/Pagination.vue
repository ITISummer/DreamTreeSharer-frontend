<template>
<div>
  <!--
  dialog 显示分页查询
  [element-ui table中的图片的显示 解决方案](https://blog.csdn.net/DianaGreen7/article/details/81169893)
  -->
  <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column label="用户头像" width="150" prop="userAvatarUrl">
        <template slot-scope="scope" property="userAvatarUrl" style="cursor: pointer">
          <el-avatar size="large" :src="'http://qrne6et6u.hn-bkt.clouddn.com/'+scope.row.userAvatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="200" prop="userUsername">
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
</div>
</template>

<script>
export default {
  props: {
   search: '',
   flag: '',
  },
  data() {
    return{
      dialogTableVisible: false,
      // 分页查询
      size: 2, // 每页数量[5,21] 的奇数
      currentPage: 1, // 初始查询页
      gridData: [],
      total: 0,
    }
  },
  methods: {
    // 当前页
    currentChange(currentPage) {
      console.log(currentPage)
      this.currentPage = currentPage
      // this.fuzzySearch()
    },
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
    // 模糊查询
    fuzzySearch() {
      // 判断 flag，根据 flag 向后端发送数据，对相关表进行字段模糊查询
      this.getRequest(`/fuzzy-search/${this.flag}/${this.search}/${this.size}/${this.currentPage}`).then(res =>{
        if (res) {
          this.total = res.object.total
          console.log(this.total)
          this.gridData = res.object.records
          console.log(res.object)
        } else {
          this.$message.warning('已无更多数据！')
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>
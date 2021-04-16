<template>
  <Comments :comments="commentData"></Comments>
</template>

<script>
import Comments from "./Comments";
import * as CommentData from "../../mockdata/mockdata"

export default {
  components: {
    Comments
  },
  data() {
    return {
      commentData: []
    }
  },
  created() {
    this.commentData = CommentData.comment.data;
  },
}
</script>

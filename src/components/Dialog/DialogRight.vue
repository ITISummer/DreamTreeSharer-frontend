<template>
  <div class="side" id="right_side">
    <!-- 内容选择框 -->
    <div class="section1">
      <div class="select_size">
        <select name="pin_size" id="pin_size">
          <option value="">Select</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <div class="save_pin">Save</div>
      </div>
    </div>
    <!-- input 输入框 -->
    <div class="section2" v-if="commentsOrDreamForm">
      <input placeholder="Add your title" type="text" class="new_pin_input" id="pin_title">
      <input placeholder="Tell everyone what your Pin is about" type="text" class="new_pin_input" id="pin_description">
    </div>
    <Comments v-else class="section2"/>
  </div>
</template>

<script>
import Comments from "../Comments/Comments";
export default {
  props: {commentsOrDreamForm: Boolean},
  components: {Comments}
}
</script>

<style scoped lang="scss">
@import "DialogCommon";
#right_side {
  background-color: orange;

  .section1 {
    display: flex;
    justify-content: flex-end;

    .select_size {
      width: 236px;
      height: 40px;
      display: flex;

      select {
        width: 70%;
        height: 100%;
        border: none;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        outline: none;
        font-size: 16px;
        background-color: #EFEFEF;
      }

      .save_pin {
        width: 30%;
        height: 100%;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        color: white;
        background-color: #E60023;
        cursor: pointer;
      }
    }
  }

  .section2 {
    .new_pin_input {
      margin-bottom: 20px;
      width: 100%;
      height: 50px;
      border: none;
      border-bottom: 2px solid #C6C6C6;
      outline: none;
      font-size: 16px;
      background-color: transparent;
    }
  }
}

</style>
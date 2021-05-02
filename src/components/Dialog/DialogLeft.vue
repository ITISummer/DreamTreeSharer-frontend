<template>
  <div class="side" id="left_side">
    <!-- 左侧头部-三圆点 -->
    <div class="section1">
      <div class="pint_mock_icon_container">
        <img src="../../assets/images/ellipse.png" alt="edit" class="pint_mock_icon">
      </div>
    </div>
<!--    <div class="section2">-->
<!--      <label for="upload_img" id="upload_img_label" style="display: block;">-->
<!--        <div class="upload_img_container">-->
<!--          <div id="dotted_border">-->
<!--            <div class="pint_mock_icon_container">-->
<!--              <img src="../../assets/images/up-arrow.png" alt="upload_img" class="pint_mock_icon"></div>-->
<!--            <div>Click to upload</div>-->
<!--            <div>Recommendation: Use high-quality .jpg less than 20MB</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <input type="file" name="upload_img" id="upload_img" value="">-->
<!--      </label>-->
<!--    </div>-->
    <div class="section2">
      <Upload/>
    </div>
    <!-- 左侧底部 -->
    <div class="section3">
      <div class="save_from_site">Save from site</div>
    </div>
  </div>
</template>

<script>
import Upload from "../../views/Upload/Upload";
export default {
  components: {Upload}
}
</script>

<style scoped lang="scss">
@import "DialogCommon";
#left_side {
  background-color: blue;
  .section1 {
    .pint_mock_icon_container {
      width: 40px;
      height: 40px;
      background-color: rgba(239, 239, 239, 0);
      transition-duration: 0.3s;
      &:hover {
        background-color: rgba(239, 239, 239, 1);
      }
    }
  }
  .section2 {
    #upload_img_label {
      width: 100%;
      height: 100%;
      cursor: pointer;
      input {
        width: 0;
        height: 0;
        opacity: 0;
      }
      .upload_img_container {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #efefef;
        #dotted_border {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border: 1px dashed #dadada;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      }
    }
    .pint_mock_icon_container {
      background-color: #767676;
    }
  }

  .section3 {
    .save_from_site {
      width: 340px;
      height: 48px;
      border-radius: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      background-color: #EFEFEF;
      cursor: pointer;
    }
  }
}
</style>
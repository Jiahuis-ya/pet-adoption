<template>
  <div class="content">
    <img class="backgroud" src="@/assets/img/error_page.png" alt>
    <div class="text main-text">抱歉，您访问的页面出现错误了</div>
    <div>
      <el-button class="text back_btn" @click="back()" type="text" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 900px;
  text-align: center;
  .backgroud {
    display: inline-block;
    width: 500px;
    height: 400px;
    margin-top: 80px;
  }
  .main-text{
    margin-top: 80px;
    color: rgb(192, 137, 66)!important;
    
  }
  .text {
    font-size: 24px;
    color: #333;

    &.back_btn {
      margin-top: 15px;
      font-weight: 600;
    }
  }
}
</style>


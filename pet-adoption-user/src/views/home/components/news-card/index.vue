<template>
  <div class="wrapper">
    <el-divider
       content-position="center"
        class="divider"
    >
    <div class="title_box">
      <span class="divider_title">系统公告</span>
      <span>System Announcement</span>
    </div>
      
    </el-divider>

    <div 
    class="content_box" 
    v-for="(item) in dataList" 
    :key="item.id" >
      <div class="title">【{{ item.newsName }}】</div>
      <div class="content_bottom">
        <div class="img-box">
          <img :src="item.newsPhoto" class="image">
          <!-- <el-image
            style="width: 100px; height: 100px"
            :src="item.newsPhoto"
            fit="fill"></el-image> -->
        </div>
        <div class="bottom-right">
          <div class="desc clamp_lines" v-html="item.newsContent"></div>
          <div class="right_content_bottom">
            <div class="read_btn_box clearfix">
              <el-button type="primary" class="read_btn" @click="handleDetail(item.id)">阅读全文>></el-button>
              
            </div>
            <div class="time">{{ item.insertTime }}</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'news-card',
  data() {
    return {
    }
  },
  props: {
    dataList:{
      type: Array,
      default: () => []
    }
  },
  created() {

  },
  mounted() {
  },
  methods:{
    handleDetail(id) {
      this.$router.push('/news/detail/' + id);
    },
  },

};
</script>

<style lang="scss" scoped>

.clamp_lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 或者使用 'nowrap' 根据你的需求调整 */
  }

.wrapper {
  margin-top: 50px;

  .divider {
    background-color: #fff;
    margin-bottom: 50px;
    
    .title_box {
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      


     
    }

    .divider_title {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    

    
     
  }


  
  .content_box {
      min-height: 200px;
      border: 1px solid #eee;
      padding: 0px 30px 20px 12px;
      border-radius: 5px;
      background-color: #e0b59f4f;
      margin-top: 12px;

      .title {
        line-height: 40px;
        height: 40px;
      }

      .img-box{
        width: 200px;
        height: 170px;
        padding: 10px;
        box-shadow: 0 2px 5px 0 #444;
        background-color: #fff;
        box-sizing: border-box;

        .image{
          width: 100%;
          height: 100%;
          // display: block;
          object-fit: cover
        }
      }

      .content_bottom {
        display: flex;
        flex-direction: row;
      }

      .bottom-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px 20px 0px 30px;

        .desc {
          line-height: 22px;
          text-indent: 2em;
          margin-bottom: 12px;
        }

        .read_btn {
          width: 110px;
          float: right;
        }
        

      }
  }
}






</style>

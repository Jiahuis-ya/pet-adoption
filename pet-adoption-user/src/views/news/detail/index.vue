<template>
  <div class="wrapper">
    <div class="back">
      <span @click="back" class="iconfont">&#xe607;</span>
      <span @click="back">返回</span>
    </div>

    <div class="info_box">
      <div class="row name">{{ dataInfo.newsName }}</div>
      <div class="img-box">
          <img class="image" :src="dataInfo.newsPhoto" />
      </div>
      <div class="row row_content" v-html="dataInfo.newsContent"> </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "news-detail",
  components: {
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 9999,
      totalPage: 0,
      dataListLoading: false,
      petTypesSelectSearch: [],
      adoptStatusSelectSearch: [],
      newsId: '',
      dataInfo: {},
      userInfo: {},
    };
  }, 

  computed: {

  },
 
  mounted() {
    
  },
  created() {
    this.init();
    this.getData();
  },

  
  
  methods: {
   
    getData() {
       // 知识数据
       this.$http({
          url: `news/info/${this.newsId}`,
          method: 'get'
      }).then(({ data }) => {
          if (data && data.code === 0) {
              this.dataInfo = data.data;
          } else {
              this.$message.error(data.msg);
          }
      });
    },
 
    init() {
        // 获取用户信息
        this.$http({
            url:`${this.$storage.get("sessionTable")}/session`,
            method: "get"
        }).then(({ data }) => {
          if(data.code === 401) {
            this.$router.push({
              
              name: "login",
              query: {
                redirect: this.$route.path
              }
    
            })
          }
            if (data && data.code === 0) {
                this.userInfo = data.data;
            } else {
                this.$message.error(data.msg);
            }
        });

      this.newsId = +this.$route.params.id;
     
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
  
  }
};
</script>
<style lang="scss" scoped>

  .back {
    display: inline-block;
    color: #409EFF;
    text-align: left;
    span {
      cursor: pointer;
    }
    .iconfont {
      margin-right: 5px;
    }
  }

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;

  .info_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    line-height: 30px;

    .row {
      width: 90%;
      text-align: center;

      &.row_content {
        text-align: left;
      }
    }

    .name {
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
    }
 
    .img-box{
        width: 500px;
        height: 400px;
        box-shadow: 0 2px 5px 0 #444;
        background-color: #fff;
        box-sizing: border-box;
        margin: 50px 0 24px;

        .image{
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }
  }

}
</style>

<template>
  <div class="content">

    <!-- 轮播图 -->
    <HomeCarousel :dataListLoading="dataListLoading" :carouselList="carouselList" />
   <NewsCard :dataList="newsData" />
   
   <PetCard :dataList="petList" />
   <KnowledgeCard :dataList="knowledgeList" />
   <div>

   </div>
  </div>
</template>

<script>
import HomeCarousel from './components/home-carousel.vue';
import PetCard from './components/pet-card/index.vue';
import NewsCard from './components/news-card/index.vue';
import KnowledgeCard from './components/knowledge-card/index.vue';

export default {
  name: 'home',
  components: {
    HomeCarousel,
    PetCard,
    NewsCard,
    KnowledgeCard,
  },
  data() {
    return {
      dataListLoading: false,
      carouselList: [],
      knowledgeList: [],
      newsData: [],
      petList: [],
    }
  },
  activated() {
    // console.log("home-activated")
  },
  deactivated() {
    // console.log("home-deactivated")
  },
  mounted(){
    // console.log("home-mounted")

  },
  created() {
    // console.log("home-created")
    
    this.getCarouselList();
    this.getKnowledgeList();
    this.getNewsList();
    this.getPetList();
  },
  methods:{

    getCarouselList() {
      this.dataListLoading = true;
      let params = {
        page: 1,
        limit: 10,
        sort: 'id',
      }

      this.$http({
          url: "carousel/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
              this.carouselList = data.data.list;
          }else{
              this.carouselList = [];
          }
          this.dataListLoading = false;
      });

    },

    getKnowledgeList() {
      let params = {
        page: 1,
        limit: 10,
        sort: 'id',
      }

      this.$http({
          url: "knowledge/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
              this.knowledgeList = data.data.list;
          }else{
              this.knowledgeList = [];
          }
      });

    },

    getNewsList() {
      let params = {
        page: 1,
        limit: 10,
        sort: 'id',
      }

      this.$http({
          url: "news/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
              this.newsData = data.data.list;
          }else{
              this.newsData = [];
          }
      });
    },
    getPetList() {
      this.dataListLoading = true;
      let params = {
        page: 1,
        limit: 10,
        sort: 'id',
      }

      this.$http({
          url: "adopt/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
              this.petList = (data.data.list || []).slice(0, 5);
          }else{
              this.petList = [];
          }
          this.dataListLoading = false;
      });

    },

 

  }
};
</script>

<style lang="scss" scoped>

.content {

}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
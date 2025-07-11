<template>
  <div>
    
    <PetCard 
      :dataList="petList" 
      :petTypesSelectSearch="petTypesSelectSearch"
      :adoptStatusSelectSearch="adoptStatusSelectSearch"
      @search="search"
      @handle-adopt="handleAdopt"
    />
    <el-pagination
        style="padding-top: 20px;"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        background
    >
    </el-pagination>
  </div>
</template>

<script>
import PetCard from "./components/pet-card/index.vue"

export default {
  name: "pet-index",
  components: {
    PetCard
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      dataListLoading: false,
      petList: [],
      petTypesSelectSearch: [],
      adoptStatusSelectSearch: []
    };
  },
  mounted() {

  },
  created() {
    this.init();
    this.getDataList();
  },
  
  methods: {
    handleAdopt(id) {
      this.$router.push('/pet/adopt/' + id);
    },
    
    init() {
      // 宠物类型
      this.$http({
          url: "dictionary/page?dicCode=pet_types&page=1&limit=100",
          method: "get",
      }).then(({data}) => {
          if(data && data.code === 0){
              this.petTypesSelectSearch = data.data.list;
          }
      });
      // 领养状态
      this.$http({
          url: "dictionary/page?dicCode=adopt_status_types&page=1&limit=100",
          method: "get",
      }).then(({data}) => {
          if(data && data.code === 0){
              this.adoptStatusSelectSearch = data.data.list;
          }
      });
    },

    search(searchForm) {
      this.pageIndex = 1;
      this.getDataList(searchForm);
    },
    getDataList(searchForm = {}) {
      this.dataListLoading = true;
      let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          sort: 'id',
      }

      if (searchForm.petName != '' && searchForm.petName != undefined) {
            params['petName'] = '%' + searchForm.petName + '%'
        }
         
      if (searchForm.petTypes != '' && searchForm.petTypes != undefined) {
          params['petTypes'] = searchForm.petTypes
      }

       if (searchForm.adoptStatusTypes != '' && searchForm.adoptStatusTypes != undefined) {
          params['adoptStatusTypes'] = searchForm.adoptStatusTypes
      }

      this.$http({
          url: "adopt/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
            this.petList = data.data.list;
            this.totalPage = data.data.total;
          }else{
              this.petList = [];
              this.totalPage = 0;
          }
          this.dataListLoading = false;
      });

    },
    //每页数
    sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList();
    },
  }
};
</script>
<style lang="scss" scoped>

</style>

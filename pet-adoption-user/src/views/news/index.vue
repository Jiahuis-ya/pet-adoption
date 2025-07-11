<template>
  <div>
    <el-form 
        :inline="true" 
        :model="searchForm" 
        class="form-content" 
        ref="searchFormRef" 
    >
        <el-row 
            :gutter="20" 
            class="el_row"
        >
          <el-form-item label="" prop="newsName" class="form_item">
              <el-input v-model="searchForm.newsName" placeholder="请输入公告名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSearch()">
                  搜索
              </el-button>
          </el-form-item>
        </el-row>
          <div class="sort_box">
            <div class="name">筛选</div>
            <el-form-item prop="sortValue">
              <div>
                <span 
                  :class="['sort_item', {'active': searchForm.sortTypes === item.codeIndex}]"
                  v-for="(item,index) in sortTypesOptions"
                  :key="index"
                  @click="() => onSortTypesSelect(item.codeIndex, item)"
                >{{ item.indexName }}</span>
              </div>
            </el-form-item>
            
          </div>
          
    </el-form>
    <el-empty v-if="!dataList.length" :image-size="200"></el-empty>
    <Card 
      @handle-detail="handleDetail" 
      :dataList="dataList" 
    />

    <el-pagination
        style="padding-top: 20px;"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[6, 12, 24]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        background
    >
    </el-pagination>
  </div>
</template>

<script>
import Card from './components/card';

export default {
  name: "news",
  components: {
    Card
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      totalPage: 0,
      dataListLoading: false,
      dataList: [],
      sortOptions: [],
      searchForm: {
        key: "",
        sortTypes: 999,
        sortValue: '全部',
        newsName: '',
      },
      activeSelect: 999,
    };
  },
  beforeRouteEnter(to, from, next) {
      next()
    },
  beforeRouteLeave (to, from, next) {
    // console.log("beforeRouteLeave", from,"to", to)
    const homeArr = ['/index']
    const toRouter = '/news/detail'
    if (homeArr.includes(to.path)) {
      // 返回主页,移除所有
      this.$store.commit('cachedViews/DEL_CACHED_VIEW', {
        from: {name: "news"},
        flag: 'all'
      })
    } else if (!to.path.includes(toRouter)) {
      // path是'/news/detail/3'
      // 不在缓存列表中，从cachedViews缓存列表中移除
      this.$store.commit('cachedViews/DEL_CACHED_VIEW', {
        from: {name: "news"}
      })
    }

    next()
  },
  mounted() {

  },
  created() {
    // 新增缓存组件
    this.$store.commit('cachedViews/ADD_CACHED_VIEW', 'news')
    
    this.init();
    this.getDataList();
  },
  
  methods: {
    handleDetail(id) {
      this.$router.push('/news/detail/' + id);
    },
    init() {
      // 公告类型
      this.$http({
          url: "dictionary/page?dicCode=news_types&page=1&limit=100",
          method: "get",
      }).then(({data}) => {
          if(data && data.code === 0){
              this.sortTypesOptions = [
                {
                  "id": 999,
                  "dicCode": "news_types",
                  "dicName": "公告类型名称",
                  "codeIndex": 999,
                  "indexName": "全部",
                  "superId": null,
                  "beizhu": null,
                  "createTime": "2024-12-04 16:32:16"
                },
                ...(data.data.list || []),
              ];
              this.searchForm.sortTypes = 999;
          }
      });
     
    },
    onSearch() {
      this.pageIndex = 1;
      this.getDataList();
    },
    onSortTypesSelect(value, item) {
      this.searchForm.sortTypes = item.codeIndex;
      this.onSearch();
    },
    getDataList() {
      this.dataListLoading = true;
      let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          sort: 'id',
      }

      if (this.searchForm.newsName != '' && this.searchForm.newsName != undefined) {
            params['newsName'] = '%' + this.searchForm.newsName + '%'
        }
         
       if (this.searchForm.sortTypes != '' && 
            this.searchForm.sortTypes != undefined &&
            this.searchForm.sortTypes !== 999
      ) {
          params['newsTypes'] = this.searchForm.sortTypes
      }

      this.$http({
          url: "news/list",
          method: "get",
          params: params
      }).then(({data}) => {
          if(data && data.code === 0){
            this.dataList = data.data.list;
            this.totalPage = data.data.total;
          }else{
              this.dataList = [];
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

.form-content {
    .el_row {
      display: flex;
      justify-content: flex-end;
    }

    .sort_box {
      .name {
        margin-bottom: 12px;
      }

      .sort_item {
        display: inline-block;
        padding: 1px 15px;
        border-radius: 3px;
        cursor: pointer;
      
        &.active {
          color: #fff;
          background-color: #409eff;
        }
       
      }
    }
}

</style>

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
          <el-form-item label="" prop="title" class="form_item">
              <el-input v-model="searchForm.title" placeholder="请输入知识名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSearch()">
                  搜索
              </el-button>
          </el-form-item>
        </el-row>
          <div class="sort_box">
            <div class="name">筛选</div>
            <el-form-item prop="knowledgeValue">
              <div>
                <span 
                  :class="['sort_item', {'active': searchForm.knowledgeTypes === item.codeIndex}]"
                  v-for="(item,index) in knowledgeTypesOptions"
                  :key="index"
                  @click="() => onKnowledgeTypesSelect(item.codeIndex, item)"
                >{{ item.indexName }}</span>
              </div>
              <!-- <el-radio-group v-model="searchForm.knowledgeValue" size="medium">
                <el-radio-button
                  v-for="(item,index) in knowledgeTypesOptions"
                  v-bind:key="index"
                  :label="item.indexName"
                  :value="item.codeIndex"
                  @input="onKnowledgeTypesSelect"
                >
                </el-radio-button>
                
              </el-radio-group> -->
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
        :page-sizes="[4, 8, 16]"
        :page-size="4"
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
  name: "knowledge",
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
      knowledgeTypesOptions: [],
      searchForm: {
        key: "",
        knowledgeTypes: 999,
        knowledgeValue: '全部',
        title: '',
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
    const toRouter = '/knowledge/detail'
    if (homeArr.includes(to.path)) {
      // 返回主页,移除所有
      this.$store.commit('cachedViews/DEL_CACHED_VIEW', {
        from: {name: "knowledge"},
        flag: 'all'
      })
    } else if (!to.path.includes(toRouter)) {
      // path是'/knowledge/detail/3'
      // 不在缓存列表中，从cachedViews缓存列表中移除
      this.$store.commit('cachedViews/DEL_CACHED_VIEW', {
        from: {name: "knowledge"}
      })
    }

    next()
  },
  mounted() {

  },
  created() {
    // 新增缓存组件
    this.$store.commit('cachedViews/ADD_CACHED_VIEW', 'knowledge')
    
    this.init();
    this.getDataList();
  },
  
  methods: {
    handleDetail(id) {
      this.$router.push('/knowledge/detail/' + id);
    },
    init() {
      // 宠物类型
      this.$http({
          url: "dictionary/page?dicCode=knowledge_types&page=1&limit=100",
          method: "get",
      }).then(({data}) => {
          if(data && data.code === 0){
              this.knowledgeTypesOptions = [
                {
                  "id": 999,
                  "dicCode": "knowledge_types",
                  "dicName": "知识分类",
                  "codeIndex": 999,
                  "indexName": "全部",
                  "superId": null,
                  "beizhu": null,
                  "createTime": "2024-12-04 16:32:16"
                },
                ...(data.data.list || []),
              ];
              this.searchForm.knowledgeTypes = 999;
          }
      });
     
    },
    onSearch() {
      this.pageIndex = 1;
      this.getDataList();
    },
    onKnowledgeTypesSelect(value, item) {
      this.searchForm.knowledgeTypes = item.codeIndex;
      this.onSearch();
    },
    getDataList() {
      this.dataListLoading = true;
      let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          sort: 'id',
      }

      if (this.searchForm.title != '' && this.searchForm.title != undefined) {
            params['title'] = '%' + this.searchForm.title + '%'
        }
         
       if (this.searchForm.knowledgeTypes != '' && 
            this.searchForm.knowledgeTypes != undefined &&
            this.searchForm.knowledgeTypes !== 999
      ) {
          params['knowledgeTypes'] = this.searchForm.knowledgeTypes
      }

      this.$http({
          url: "knowledge/list",
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

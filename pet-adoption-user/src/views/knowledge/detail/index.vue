<template>
  <div class="wrapper">
    <div class="back">
      <span @click="back" class="iconfont">&#xe607;</span>
      <span @click="back">返回</span>
    </div>

    <div class="info_box">

      <div class="row name">{{ dataInfo.title }}</div>
      <div class="icon_row">
        <div class="icon_box icon_like">
          <span 
          :class="['iconfont', {'iconfont2': hasLike}]"
          @click="hasLike ? onCancelKnowledgeInteractions(hasLikeData) : onAddKnowledgeInteractions(2)"
          >&#xec8c;</span>
          <span>（{{ dataInfo.likeCount }}）</span>
        </div>
        <div class="icon_box icon_dislike">
          <span 
          :class="['iconfont', {'iconfont2': hasCollect}]"
          @click="hasCollect ? onCancelKnowledgeInteractions(hasCollectData) : onAddKnowledgeInteractions(1)"
          >&#xe666;</span>
          <span>（{{ dataInfo.collectCount  }}）</span>
        </div>
        
        <div class="icon_box icon_collect">
          <span 
          :class="['iconfont', {'iconfont2': hasDislike}]"
          @click="hasDislike ? onCancelKnowledgeInteractions(hasDislikeData) : onAddKnowledgeInteractions(3)"
          >&#xe68f;</span>
          <span>（{{ dataInfo.dislikeCount}}）</span>
        </div>
      </div>
   
      <div class="img-box">
          <img class="image" :src="dataInfo.photo" />
      </div>

      <div class="row row_content" v-html="dataInfo.content"> </div>
      
    </div>

  

    <div class="divider_box">
      <el-divider
        content-position="center"
        class="divider"
      >
      <div class="title_box">
        <span class="divider_title">留言</span>
      </div>
        
      </el-divider>
    </div>
    

    <el-form
      class="el_form"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
        
        <el-form-item label="" prop="commentText">
            <el-input
                type="textarea" 
                maxlength="2000"
                show-word-limit
                :autosize="{ minRows: 5}"
                v-model="ruleForm.commentText" 
                placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">发布</el-button>
              <el-button type="default" @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
    </el-form>

    <div class="comment_wrapper">
      <CommentItem 
        v-for="(item) in commentList"
        :key="item.id" 
        :item="item"
      />
    </div>

  </div>
</template>

<script>
import CommentItem from './components/comment-item.vue';

export default {
  name: "knowledge-detail",
  components: {
    CommentItem
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 9999,
      totalPage: 0,
      dataListLoading: false,
      commentList: [],
      petTypesSelectSearch: [],
      adoptStatusSelectSearch: [],
      knowledgeId: '',
      dataInfo: {},
      userInfo: {},
      ruleForm: {
        commentText: ''
      },
      rules: {
        commentText: [
          { required: true, message: '留言不能为空', trigger: 'blur' },
        ],
      },
      hasLikeData: {},
      hasDislikeData: {},
      hasCollectData: {},
      interactionsData: [],
    };
  }, 

  computed: {
    hasLike() {
      return this.interactionsData.filter(item => item.knowledgeInteractionsTypes === 2).length > 0;
     
      
    },
    hasDislike() {
      return this.interactionsData.filter(item => item.knowledgeInteractionsTypes === 3).length > 0;
    },
    hasCollect() {
      return this.interactionsData.filter(item => item.knowledgeInteractionsTypes === 1).length > 0;
    }
  },
 
  mounted() {
    
  },
  created() {
    this.init();
    this.getKnowledge();
    this.getCommentList();
    this.getInteractionsData();
  },

  
  
  methods: {
    onAddKnowledgeInteractions(type) {

      const params = {
        knowledgeId: this.knowledgeId,
        userId: this.userInfo.id, // data.userId
        knowledgeInteractionsTypes: type
      }

      this.$http({
          url: `knowledgeInteractions/save`,
          method: "post",
          data: params
      }).then(({ data }) => {
          if (data && data.code === 0) {
            this.getInteractionsData();
            this.getKnowledge();

              this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                     
                  }
              });
          } else {
              this.$message.error(data.msg);
          }
      });
    },
    onCancelKnowledgeInteractions(data) {
      var ids = [Number(data.id)];
      this.$http({
          url: "knowledgeInteractions/delete",
          method: "post",
          data: ids
      }).then(({ data }) => {
          if (data && data.code === 0) {
            this.getInteractionsData();
            this.getKnowledge();
            
              this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                     
                  }
              });
          } else {
              this.$message.error(data.msg);
          }
      });
      
    },

    getInteractionsData() {

      // 知识互动数据
      this.$http({
          url: `knowledgeInteractions/findByKnowledgeIdAndUserId`,
          method: 'get',
          params: { // 将请求参数放在params对象中
            knowledgeId: this.knowledgeId,
            userId: +this.$storage.get("userId")
          }
      }).then(({ data }) => {
          if (data && data.code === 0) {
              const res = data.data;
              this.interactionsData = res;
              
              this.hasCollectData = res.find(item => item.knowledgeInteractionsTypes === 1 );
              this.hasLikeData = res.find(item => item.knowledgeInteractionsTypes === 2);
              this.hasDislikeData = res.find(item => item.knowledgeInteractionsTypes === 3);
              
          } else {
              this.$message.error(data.msg);
          }
      });
    },
    getKnowledge() {
       // 知识数据
       this.$http({
          url: `knowledge/info/${this.knowledgeId}`,
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

      this.knowledgeId = +this.$route.params.id;
     

      

      // 互动类型
      this.$http({
          url: "dictionary/page?dicCode=knowledge_interactions_types&page=1&limit=100",
          method: "get",
      }).then(({data}) => {
          if(data && data.code === 0){
              this.knowledgeInteractionsTypesOptions = data.data.list;
          }
      });
    },

    getCommentList() {
      let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          sort: 'id',
      }

      this.$http({
              url: "knowledgeComment/list",
              method: "get",
              params: params
          }).then(({ data }) => {
              if (data && data.code === 0) {
              let result = data.data.list || [];
              this.commentList = result.filter(i => i.knowledgeId === this.knowledgeId);
              this.totalPage = data.data.total;
          } else {
              this.commentList = [];
              this.totalPage = 0;
          }
          this.dataListLoading = false;
      });
    },

    // 返回
    back() {
      this.$router.go(-1);
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },

    // 提交
    onSubmit() {
        this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              const params = {
                knowledgeId: this.knowledgeId,
                userId: this.userInfo.id,
                commentText: this.ruleForm.commentText,
              }
                this.$http({
                    url:`knowledgeComment/save`,
                    method: "post",
                    data: params
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                      this.resetForm('ruleForm');
                      this.getCommentList();
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                
                            }
                        });
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            }
        });
    },
 
  }
};
</script>
<style lang="scss" scoped>

.divider_box {
  display: flex;
  justify-content: center;
  width: 100%;
}
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

     .icon_row {
        width: 100%;
        display: flex;
        // justify-content: flex-start;
        justify-content: center;
        gap: 20px;
        margin-bottom: 12px;
        cursor: pointer;

        .icon_box  {
          user-select: none;
        }
        
          .iconfont {
            color: #8a8a8a;
          }

          .iconfont2 {
            color: #409EFF!important;
          }

          .iconfont:hover {
            color: #409EFF;
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

  .comment_wrapper {
    
  }


}
.divider {
  width: 90%;
}

.el_form {
  margin-top: 12px;

  // ::v-deep .el-form-el-form-item__content {
  //   margin-left: 0!important;
  // }

  & /deep/ .el-form-item__content {
    margin-left: 0!important;
  }
}
</style>

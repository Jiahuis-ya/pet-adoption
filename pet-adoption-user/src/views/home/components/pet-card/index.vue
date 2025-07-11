<template>
  <div class="content">
    <el-row class="row">
      <div class="row_left">
        <span class="title">宠物展示</span>
        <a class="more_btn" @click="goToMore">更多</a>

      </div>
        <el-col class="right_col">
          <el-card 
            class="card"
            v-for="(item) in dataList" 
            :key="item.id" 
            :body-style="{ 
              padding: '0px', 
              height: '100%', 
            }"
          >
            <img 
              :src="item.photo"
              class="image"
             />
            <div style="padding: 14px;" class="card_content">
              
              
              <span class="card_content_title clamp-2-lines">{{ item.petName }}</span>
              <!-- <div class="icon_row">
                <div class="icon_box icon_like">
                  <span class="iconfont">&#xe600;</span>
                  <span>{{ item.likeCount }}</span>
                </div>
                <div class="icon_box icon_dislike">
                  <span class="iconfont">&#xe78d;</span>
                  <span>{{ item.dislikeCount }}</span>
                </div>
                
                <div class="icon_box icon_collect">
                  <span class="iconfont">&#xe62d;</span>
                  <span>{{ item.collectCount }}</span>
                </div>
              </div> -->
              <div class="desc clamp-lines" v-html="item.content"></div>
              
              <div class="card_content_bottom">
                <time class="time">{{ item.createTime }}</time>
                
                <el-button type="text" class="button" @click="() => handleAdopt(item.id)">
                  <span class="iconfont" style="font-size: 18px;">&#xe634;</span>
                </el-button>
              </div>
            </div>
        </el-card>
        </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'pet-card',
  data() {
    return {
      
    }
  },
  props: {
    dataList:{
      type: Array,
      default: () => {}
    }
  },
  created() {

    // console.log("knowledgeList", this.dataList); // 监听不了数组的变化
  },
  mounted() {
  },
  methods:{
    goToMore() {
      this.$router.push('/pet');
    },
    
    handleAdopt(id) {
      this.$router.push('/pet/adopt/' + id);
    },
  },

};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 170px;
    display: block;
  }

 

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 300px;

    .row_left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 60px;
      border: 1px solid #eee;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-right: 12px;
      padding: 12px 0;

     .title {
        width: 30px;
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
        margin-left: 6px;
     }

      .more_btn {
        display: inline-block;
        color: #409EFF;
        cursor: pointer;
        margin: 0 auto;
      }
    }


    .right_col {
      flex: 1;
      display: flex;
      flex-wrap: no-wrap;
      gap: 12px; 

      .card {
        width: 25%;
        
        


        .icon_row {
          display: flex;
          gap: 5px;
          margin-top: 30px;
          margin-bottom: 12px;
        }

        .card_content {
          .desc {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 25px;
            height: 50px;
          }
          .card_content_title {
            line-height: 18px;
          }

          .card_content_bottom {
            line-height: 18px;
            
            .time {
              margin-top: 12px;
            }
          }
          
        }
      }
    }
  }


  .clamp-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 或者使用 'nowrap' 根据你的需求调整 */
  }
</style>

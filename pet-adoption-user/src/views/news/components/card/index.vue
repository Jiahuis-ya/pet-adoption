<template>
  <div class="content">
    <el-row class="row">
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
              :src="item.newsPhoto"
              class="image"
             />
            <div style="padding: 14px;" class="card_content">
              <div class="card_content_title clamp-2-lines">{{ item.newsName }}</div>
              <div class="desc clamp-lines" v-html="item.newsContent"></div>
              <div class="card_content_bottom">
                <time class="time">{{ item.createTime }}</time>
                <el-button type="text" class="button" @click="$emit('handle-detail', item.id)">
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
  name: 'card',
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

  },
  mounted() {
  },
  methods:{
   
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
    height: 230px;
    display: block;
  }

 

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // height: 340px;

    .right_col {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 12px; 

      .card {
        width: 32%;
        
        


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
            font-weight: bold;
            height: 35px;
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

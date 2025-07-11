<template>
  <div class="wrapper">
    <el-divider
       content-position="center"
        class="divider"
    >
    <div class="title_box">
      <span class="divider_title">宠物小知识</span>
      <span>Pet knowledge</span>
    </div>
      
    </el-divider>

    <div 
    class="content_box" 
    v-for="(item) in dataList" 
    :key="item.id" >
      <div class="title">【{{ item.title }}】</div>
      <div class="content_bottom">
        <div class="img-box">
          <img :src="item.photo" class="image">
        </div>
        <div class="bottom-right">
          <div class="desc clamp_lines" v-html="item.content"></div>
          <div class="right_content_bottom">
            <div class="read_btn_box clearfix">
              <el-button 
                type="primary" 
                class="read_btn"
                @click="handleDetail(item.id)"
              >阅读全文>></el-button>
              
            </div>
            <div class="comment_box">
              <div class="time">{{ item.createTime }}</div>
              <div class="num_box">
                <div class="icon_box">
                  <span class="iconfont icon_like">&#xe600;</span>
                  (<span class="num">
                    {{ item.likeCount }}
                  </span>)
                </div>
                <div class="icon_box">
                  <span class="iconfont icon_collect">&#xe78d;</span>
                  (<span class="num">
                    {{ item.collectCount }}
                  </span>)
                </div>
                <div class="icon_box">
                  <span class="iconfont icon_dislike">&#xe62d;</span>
                  (<span class="num">
                    {{ item.dislikeCount }}
                  </span>)
                </div>
              
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'knowledge-card',
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
    goToMore() {
      this.$router.push('/knowledge');
    },
    handleDetail(id) {
      this.$router.push('/knowledge/detail/' + id);
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
      // background-color: #e0b59f4f;
      background-color: #fefe9c57;
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
          display: block;
          object-fit: cover;
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

        .right_content_bottom {
          .comment_box {
            margin-top: 12px;
            color: #999;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .num_box {
              display: flex;
              flex-direction: row;

             .num {
              color: #96c707;
             }

             .icon_box {
                margin-left: 15px;
                font-size: 12px;

                .iconfont {
                  // position: absolute;
                  position: relative;
                  

                  &.icon_like, &.icon_collect {
                    top: 2px;
                  }

                  &.icon_dislike {
                    top: 4px;
                  }
                }
             }

             

            }
          }
        }
        

      }
  }
}






</style>

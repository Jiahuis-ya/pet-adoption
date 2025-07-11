<template>
  <div class="wrapper">
    
   
    <el-form 
        :inline="true" 
        :model="searchForm" 
        class="form-content" 
        ref="searchFormRef" 
    >
        <el-row 
            :gutter="20" 
            class="row" 
            :style="{justifyContent: 'flex-start'}"
        >
              <el-form-item label="" prop="petName" class="form_item">
                  <el-input v-model="searchForm.petName" placeholder="请输入宠物名称" clearable></el-input>
              </el-form-item>
  
              <el-form-item label="" prop="petTypes" class="form_item">
                <el-select
                    v-model="searchForm.petTypes"
                    placeholder="请选择宠物类型"
                    clearable
                >
                    <el-option
                        v-for="(item,index) in petTypesSelectSearch"
                        v-bind:key="index"
                        :label="item.indexName"
                        :value="item.codeIndex">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="" prop="petTypes" class="form_item">
                <el-select
                    v-model="searchForm.adoptStatusTypes"
                    placeholder="请选择领养状态"
                    clearable
                >
                    <el-option
                        v-for="(item,index) in adoptStatusSelectSearch"
                        v-bind:key="index"
                        :label="item.indexName"
                        :value="item.codeIndex">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" @click="onSearch()">
                      搜索
                  </el-button>
              </el-form-item>
          </el-row>
          
    </el-form>
    <el-empty v-if="!dataList.length" :image-size="200"></el-empty>
    <div 
      class="content_box" 
      v-for="(item) in dataList" 
      :key="item.id" 
    >
      <div class="content_bottom">
        <div class="img-box">
          <img :src="item.photo" class="image">
        </div>
        <div class="bottom-right">
          <div class="right_content_top">
            <span class="name">宠物名称：{{ item.petName }}</span>
            
            <span></span>
          </div>
          <div class="right_content_middle">
            <!-- <p class="time">发布时间：{{ item.createTime }}</p> -->
            <p class="gender">宠物性别：{{ item.petGenderValue }}</p>
            <p class="birth">宠物生日：{{ item.petBirthday }}</p>
            <p class="type">{{ item.petValue }}（宠物类型）</p>
            <p class="status">
              领养状态：
              <span :class="['status_text', { 'red': item.adoptStatusTypes === 2 }]">{{ item.adoptStatusValue }}</span>
            </p>

            <p class="birth">宠物描述：{{ item.content }}</p>
          </div>

          <div class="right_content_bottom">
            <div class="read_btn_box clearfix">
              <el-button 
              v-if="item.adoptStatusTypes !== 1" 
              type="primary" 
              class="read_btn"
              @click="handleAdopt(item.id)"
              >去领养</el-button>
              
            </div>
            <div class="comment_box">
              <div class="time">发布时间：{{ item.createTime }}</div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'pet-card',
  data() {
    return {
      searchForm: {
          key: ""
      },
    }
  },
  props: {
    dataList:{
      type: Array,
      default: () => []
    },
    petTypesSelectSearch:{
      type: Array,
      default: () => []
    },
    adoptStatusSelectSearch:{
      type: Array,
      default: () => []
    }
  },
  created() {

  },
  mounted() {
  },
  methods:{
    handleAdopt(id) {
      this.$emit('handle-adopt', id);
    },
    onSearch() {
      console.log(this.searchForm, "this.searchForm")
        this.$emit('search', this.searchForm);
    },
    goToMore() {
      this.$router.push('/knowledge');
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

  .form-content {
    .row {
      padding: 0 10px;
    }
  }



  
  .content_box {
    min-height: 180px;
    border: 1px solid #eee;
    padding: 12px 12px 12px 12px;
    border-radius: 5px;
    background-color: #e0b59f4f;
    margin-top: 12px;

     
      .img-box{
        width: 250px;
        height: 175px;
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
        padding: 12px 0 0px 50px;

        .right_content_top {
          border-bottom: 1px solid #d0c173;
          padding-bottom: 12px;

          .name{
            font-size: 18px;
            margin-right: 12px;
            font-weight: bold;
          }
          
        }

        .right_content_middle {
          line-height: 25px;
          margin-bottom: 12px;

          .status_text {
            color: #0010ff;

            &.red {
              color: #f00!important;
            }
          }
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

            
          }
        }
        

      }
  }
}






</style>

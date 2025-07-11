<template>
  <div class="interaction_wrapper">
    <div class="menu">
      <el-menu 
        :default-active="activeTab" 
        class="el-menu-demo" 
        @select="onTabClick"
        style="border: none;"
        mode="horizontal"
      >
        <el-menu-item class="el-menu-item" index="2">点赞</el-menu-item>
        <el-menu-item class="el-menu-item" index="1">收藏</el-menu-item>
        <el-menu-item class="el-menu-item" index="3">踩</el-menu-item>
      </el-menu>
    </div>

    <el-empty v-if="!renderList.length" :image-size="200"></el-empty>

      <div 
        class="list_card" 
        v-for="item in renderList" 
        v-bind:key="item.id"
        @click="gotoDetail(item.knowledgeId)"
      >
        <div class="content_box">
          <div class="title">{{ item.knowledgeTitle }}</div>
          <div class="content clamp-lines" v-html="item.knowledgeContent"></div>
          <div class="bottom">
            <span class="date">{{ item.createTime }}</span>
            <span class="type">{{ item.knowledgeValue }}</span>
          </div>
        </div>
        <img class="img" :src="item.knowledgePhoto" alt="" />
      

      </div>

  </div>
</template>

<script>


export default {
  name: "center-interaction",
  data() {
    return {
      activeTab: "2",
      renderList: []
    };
  },

  created() {
    this.getInteractionsData(this.activeTab)
  },
  methods: {
    gotoDetail(id) {
      this.$router.push('/knowledge/detail/' + id);
    },
    onTabClick(type) {
      if(this.activeTab === type) return;
      this.getInteractionsData(+type)
    },
    getInteractionsData(type) {

      // 知识互动数据
      this.$http({
          url: `knowledgeInteractions/findAllKnowledgeByUserId`,
          method: 'get',
          params: { // 将请求参数放在params对象中
            knowledgeInteractionsTypes: type,
            userId: +this.$storage.get("userId")
          }
      }).then(({ data }) => {
          if (data && data.code === 0) {
            console.log("data", data)
             this.renderList = data.data;
              
          } else {
              this.$message.error(data.msg);
          }
      });
    },
  }

};
</script>
<style lang="scss" scoped>
.interaction_wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  

  .menu {
    width: 100%;
    margin-bottom: 15px;
    margin-left: 15px;

    .el-menu-demo {
      .el-menu-item {
        height: 40px;
        line-height: 30px;
      }
 
    }

  }



  .list_card {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 15px;
    padding-left: 15px;

    &:hover{
      background: #f7f8fa;
      cursor: pointer;
    }

    .content_box {
      height: 100%;
      flex: 1;
      padding: 12.5px 0;
      box-sizing: border-box;

      .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }

      .content {
        font-size: 13px;
        color: #8A919F;
        line-height: 22px;
        margin-top: 3px;
      }

      .bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #8A919F;
          line-height: 24px;
          margin-top: 3px;


          .type {
            display: inline-block;
            background-color: #f2f3f5;
            padding: 0 6px;
            border-radius: 2px;
            max-width: 76px;
            box-sizing: border-box;
            margin-left: 6px;
            color: #8a919f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            min-height: 18px;
            line-height: 18px;
          }
        }
    }

    .img {
      width: 110px;
      height: 75px;
      margin-left: 15px;

    }
  }
}

.clamp-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 或者使用 'nowrap' 根据你的需求调整 */
  }

</style>

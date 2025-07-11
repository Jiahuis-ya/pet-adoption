<template>
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal"
      router
      @select="handleRoute"
     >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/pet">宠物列表</el-menu-item>
      <!-- <el-menu-item index="/adoption/notice">领养须知</el-menu-item> -->
      <el-menu-item index="/knowledge">宠物小知识</el-menu-item>
      <el-menu-item index="/news">公告</el-menu-item>
      <el-menu-item index="/center">个人中心</el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.path,
      };
    },
    watch: {
    // 监视 $route.path 的变化
    '$route.path'(newPath, oldPath) {
      // 当路由路径变化时，更新 activeIndex
      

      if(newPath.includes('/index')) {
        this.activeIndex = '/index';
      } else if(newPath.includes('/pet')) {
        this.activeIndex = '/pet';
      }  else if(newPath.includes('/knowledge')) {
        this.activeIndex = '/knowledge';
      } else if(newPath.includes('/news')) {
        this.activeIndex = '/news';
      } else if(newPath.includes('/center')) {
        this.activeIndex = '/center';
      } else if(newPath.includes('/messageBoard')) {
        this.activeIndex = '/messageBoard';
      } else {
        this.activeIndex = newPath;
      }

      
    }
  },
    methods: {
      handleRoute(key, keyPath) {
        console.log(key, keyPath)
        // this.$router.push(name).catch(err => err)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .el-menu-demo {
    margin-right: 200px;
  }
</style>


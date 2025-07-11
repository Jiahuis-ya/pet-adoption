<template>
  <el-aside class="index-aside" height="100vh" width="210px">
    <div class="index-aside-inner menulist" style="height:100%">
      <div 
        v-for="item in menuList" 
        :key="item.roleName" 
        v-if="role==item.roleName" 
        class="menulist-item" 
        style="height:100%;broder:0;background-color:#2A3542"
      >
        <el-menu 
          :default-active="activeIndex"
          mode="vertical"
         :unique-opened="true"
          class="el-menu-demo" 
          style="height:100%;" 
          background-color="#2A3542" 
          text-color="#F4F4F5"
          router
          >
           <div class="system_name">
            宠物领养平台
        </div>
          <el-menu-item 
            index="/index"
            @click="menuHandler('')"
          >
            <i v-if="true" class="el-icon-s-home" />
            首页
          </el-menu-item>
          
          <el-submenu :index="(1).toString()">
            <template slot="title">
              <i v-if="true" class="el-icon-user-solid" />
              <span>个人中心</span>
            </template>

            <el-menu-item 
              :index="`/updatePassword`" 
              @click="menuHandler('updatePassword')"
            >
              修改登录密码
            </el-menu-item>
            <el-menu-item 
              :index="`/center`" 
              @click="menuHandler('center')"
            >
              个人信息
            </el-menu-item>
          </el-submenu>

          <el-submenu v-for=" (menu,index) in item.backMenu" :key="menu.menu" :index="(index+2).toString()">
            <template slot="title">
              <i v-if="true" :class="icons[index]" />
              <span>{{ menu.menu }}</span>
            </template>
            <el-menu-item v-for=" (child,sort) in menu.child" :key="sort" :index="`/${child.tableName}`" @click="menuHandler(child.tableName)">{{ child.menu }}</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>
    </div>
  </el-aside>
</template>
<script>
import menu from '@/utils/menu'
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      menuList: [],
      dynamicMenuRoutes: [],
      role: '',
      icons: [
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-chat-dot-square',
        'el-icon-message',
        'el-icon-postcard',
        'el-icon-position',
        'el-icon-microphone',
        'el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
      ],
    }
  },
  mounted() {
    const menus = menu.list()
    this.menuList = menus
    this.role = this.$storage.get('role')
  },
  watch: {
    // 监视 $route.path 的变化
    '$route.path'(newPath, oldPath) {
      // 当路由路径变化时，更新 activeIndex
      this.activeIndex = newPath;
    }
  },
  created(){
    
    this.icons.sort(()=>{
      return (0.5-Math.random())
    })
	// this.lineBorder()
  },
  methods: {
    menuHandler(name) {
      let router = this.$router
      name = '/'+name
      router.push(name).catch(err => err)
    },
  }
}
</script>
<style lang="scss" scoped>
  .index-aside {
    position: relative;
    overflow: hidden;

    .menulistImg {
      padding: 24px 0;
      box-sizing: border-box;

      .el-image {
        margin: 0 auto;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        display: block;
      }
    }

    .index-aside-inner {
      height: 100%;
      margin-right: -17px;
      margin-bottom: -17px;
      overflow: scroll;
      overflow-x: hidden !important;
      // padding-top: 60px;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }

      .el-menu {
        border: 0;
      }
    }


    .system_name {
      font-size: 24px;
      color: #fff;
      font-weight: 700;
      padding-left: 24px;
      height: 50px;
      line-height: 50px;
    }
  }
</style>

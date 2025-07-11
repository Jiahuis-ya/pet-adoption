<template>
  <div class="page">
    <div class="left_menu">
      <div class="header">
        <div class="avatar_wrapper">
          <img :src="this.$store.state.global.userInfo ? this.$store.state.global.userInfo.userImg : '@/assets/img/avatar-default.gif'" class="user-avatar">
        </div>
        <div class="user_info">
          {{this.$storage.get('adminName')}}
        </div>
      </div>
      <el-menu 
        :default-active="activeTab" 
        class="el-menu-demo" 
        @select="onTabClick"
        style="border: none;"
      >
        <el-menu-item v-for="(item) in activeKeysView" :key="item.en" :index="item.en">
          <i :class="item.icon" />
          <span>{{ item.cn }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="right_page">
      <div class="bread">
        <span class="line"></span>
        <span class="text">{{ activeTitle }}</span>
      </div>
      <keep-alive>
        <components :is="activeComponent"></components>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CenterMessage from './components/center-message.vue';
import CenterPassword from './components/center-password.vue';
import CenterAdoption from './components/center-adoption.vue';
import CenterInteraction from './components/center-interaction.vue';
import CenterMessageBoard from './center-message-board/index.vue';

const activeKeys = {
  MESSAGE: {
    en: 'MESSAGE',
    cn: '我的信息',
    icon: "el-icon-s-ticket",
  },
  PASSWORD: {
    en: 'PASSWORD',
    cn: '修改登录密码',
    icon: "el-icon-s-ticket",
  },
  ADOPTION: {
    en: 'ADOPTION',
    cn: '领养记录',
    icon: "el-icon-s-opportunity",
  },
  INTERACTION: {
    en: 'INTERACTION',
    cn: '我的互动',
    icon: "el-icon-s-platform",
  },
  MESSAGE_BOARD: {
    en: 'MESSAGE_BOARD',
    cn: '意见反馈',
    icon: "el-icon-s-data",
  },
  CLOSE: {
    en: 'CLOSE',
    cn: '退出登录',
    icon: "el-icon-news",
  },
}

export default {
  name: "center",
  data() {
    return {
      activeTab: activeKeys.MESSAGE.en,
      activeKeysView: activeKeys,
    };
  },
  mounted() {
    
  },
  computed: {
    activeComponent() {
      const config = {
        [activeKeys.MESSAGE.en]: CenterMessage,
        [activeKeys.PASSWORD.en]: CenterPassword,
        [activeKeys.ADOPTION.en]: CenterAdoption,
        [activeKeys.INTERACTION.en]: CenterInteraction,
        [activeKeys.MESSAGE_BOARD.en]: CenterMessageBoard
      }
      return config[this.activeTab]
    },
    activeTitle() {
      return activeKeys[this.activeTab].cn
    },
  },

  
  methods: {
    onTabClick(activeTab) {
      if(activeTab === "CLOSE") {
        this.onLogout();
        return;
      }

      this.activeTab = activeTab
    },
    onLogout() {
				let storage = this.$storage
				let router = this.$router
				storage.clear()
				router.replace({
					name: "login"
				});
			},

  }
};
</script>
<style lang="scss" scoped>
.page {
  min-height: 612px;
  display: flex;
  flex-direction: row;

  .left_menu {
    width: 150px;
    min-height: 612px;
    border-right: 1px solid #e6e6e6;

    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      padding-right: 20px;

      .avatar_wrapper {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .user_info {
        font-size: 20px;
        line-height: 30px;
      }
    }

  }

  .right_page {
    display: flex;
    flex-direction: column;
    flex: 1;
    

    .bread {
      display: flex;
      height: 50px;
      align-items: center;
      margin-bottom: 15px;
      border-bottom: 1px solid #e6e6e6;
      margin-left: 15px;
      
      .text {
        color: #409EFF;
        font-size: 14px;
        line-height: 16px;
      }

      .line{
        display: inline-block;
        width: 4px;
        height: 16px;
        margin-right: 5px;
        background-color: #409EFF;
        border-radius: 4px;
      }
    }
  }
}

</style>

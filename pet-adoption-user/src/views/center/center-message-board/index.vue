<template>
  <div class="center_message_page">
    <el-menu 
      :default-active="activeTab" 
      class="el-menu-demo" 
      @select="onTabClick"
      style="border: none;"
      mode="horizontal"
    >
      <el-menu-item class="el-menu-item" index="FEEDBACK">意见反馈</el-menu-item>
      <el-menu-item class="el-menu-item" index="MY_FEEDBACK_RECORD">我的反馈</el-menu-item>
    </el-menu>

    <keep-alive>
      <components :is="activeComponent"></components>
    </keep-alive>

  </div>
</template>

<script>
import Feedback from './components/feedback.vue';
import MyFeedbackRecord from './components/my-feedback-record.vue';

const activeKeys = {
  FEEDBACK: {
    en: 'FEEDBACK',
    cn: '意见反馈',
  },
  MY_FEEDBACK_RECORD: {
    en: 'MY_FEEDBACK_RECORD',
    cn: '我的反馈',
  },
}

export default {
  name: "center-message-board",
  
  data() {
    return {
      activeTab: "FEEDBACK",
    };
  },
 
  computed: {
    activeComponent() {
      const config = {
        [activeKeys.FEEDBACK.en]: Feedback,
        [activeKeys.MY_FEEDBACK_RECORD.en]: MyFeedbackRecord,
      }
      console.log("config[this.activeTab]", config[this.activeTab])
      return config[this.activeTab]
    },
  },
  methods: {
   
    onTabClick(value) {
      this.activeTab = value;
    },

  }

};
</script>
<style lang="scss" scoped>
.center_message_page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  
  .el-menu-demo {
    width: 100%;
    display: flex;
    justify-content: space-around;
    
    .el-menu-item {
      height: 40px;
      line-height: 30px;
    }
     
  }

 

}

</style>

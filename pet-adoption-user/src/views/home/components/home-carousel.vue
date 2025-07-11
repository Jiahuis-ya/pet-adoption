<template>
  <div class="content">
    <el-carousel 
      :interval="5000" 
      arrow="always" 
      type="card" 
      height="300px"
    >
      <el-carousel-item v-for="item in carouselList" :key="item.id">
        <img 
          style="width: 100%; height: 100%;" 
          :src="item.carouselPhoto"
        />
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
export default {
  name: 'home-carousel',
  data() {
    return {
    }
  },
  props: {
    dataListLoading: {
        type: Boolean,
        default: false
      },
    carouselList:{
        type: Array,
        default: () => []
    }
  },
  created() {
  },
  methods:{

  },

};
</script>

<style lang="scss" scoped>
.content {
  // display: flex;
  // align-items: center;
  // flex-direction: column;
 
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
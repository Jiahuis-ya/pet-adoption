<template>
  <div class="wrapper">
    <div class="info_box">

      <div class="row name">{{ dataInfo.petName }}</div>
      <div class="row status border">

        <span :class="[
          'status_text', 
          { 'red': dataInfo.adoptStatusTypes === 2 }
        ]">{{ dataInfo.adoptStatusValue }}</span>

      </div>
      <div class="row birthday border"> 出生年月： {{ dataInfo.petBirthday }} </div>
      <div class="row birthday border"> {{ dataInfo.petValue }} </div>
      <div class="row birthday border"> {{ dataInfo.petGenderValue }} </div>

      <div class="img-box">
          <img class="image" :src="dataInfo.photo" />
      </div>
     
      <div class="row birthday">{{ dataInfo.content }} </div>

    </div>
   
   
    
  </div>
</template>

<script>
export default {
  name: 'pet-detail',
  data() {
    return {
    }
  },
  props: {
    dataInfo:{
      type: Object,
      default: () => {}
    },
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

  .border {
    border: 1px solid #d0c173;
  }

  .border-left {
    border-left: 1px solid #d0c173;
  }

  .border-right {
    border-right: 1px solid #d0c173;
  }

  .border-bottom {
    border-bottom: 1px solid #d0c173;
  }

.clamp_lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 或者使用 'nowrap' 根据你的需求调整 */
  }

.wrapper {
  width: 100%;

  .info_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    line-height: 30px;

    .row {
      width: 90%;
      text-align: center;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
    }

    .status {
      .status_text {
            color: #0010ff;

            &.red {
              color: #f00!important;
            }
          }
    }

    .birthday {
      color: #999;
    }



    .img-box{
        width: 500px;
        height: 400px;
        box-shadow: 0 2px 5px 0 #444;
        background-color: #fff;
        box-sizing: border-box;
        margin: 50px 0 24px;

        .image{
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }
  }

 


     
     

}






</style>

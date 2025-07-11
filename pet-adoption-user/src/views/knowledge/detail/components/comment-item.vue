<template>
  <div 
    class="comment_item"
  >
    <div class="comment_left">
      <img :src="item.userPhoto" class="user_photo" />
    </div>
    <div class="comment_right">
      <div class="name">{{ item.username }}</div>
      <div class="content">{{ item.commentText }}</div>
      <div class="create_time">{{ item.createTime }}</div>
      <div v-if="item.replyText" class="reply">回复：{{ item.replyText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment-item",
  props: {
    item: {
      type: Object,
      default: () => {} // 默认值
    }
  },
  
}

</script>

<style lang="scss" scoped>
  .comment_item {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;

      .comment_left {
        .user_photo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }

      .comment_right {
        width: 100%;
        border-bottom: 1px solid #E3E5E7;
        margin-left: 20px;

        .name {
          color: #61666D;
          font-size: 13px;
          margin-bottom: 15px;
        }

        .content {
          color: #18191C;
          font-size: 15px;
          margin-bottom: 15px;
        }

        .create_time {
          color: #9499A0;
          font-size: 13px;
          margin-bottom: 15px;
        }

        .reply  {
          color: #9499A0;
          font-size: 13px;
          margin-bottom: 15px;
          margin-left: 2em;
        }
      }
    }

</style>

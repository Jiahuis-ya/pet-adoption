<template>
  <div>
    <el-empty v-if="!dataInfo.length" :image-size="200"></el-empty>

    
    <div class="my_center_record_page">
      <el-collapse accordion>
        <el-collapse-item
          class="el-collapse-item"
          v-for="(item) in dataInfo" 
          :key="item[0].originalRecordId" 
          :title="`【${item[0].feedbackValue}】${item[0].feedbackTypes === 1 ? item[0].feedbackQuestionValue : item[0].adviceTitle}`" 
          :name="item[0].originalRecordId"
        >
          <div class="collapse_item">
            <div class="messages">
              <!-- 发送消息 -->
             
                <div 
                  v-for="(item2) in item" 
                  :key="item2.id"
                  :class="['message', item2.ifUserSend ? 'sent' : 'received']"

                >
                  <div class="date_box">
                    <div class="message_date">{{ item2.createTime }}</div>
                  </div>
                  
                  <div class="message-wrapper">
                      <img 
                        :src="item2.userPhoto" 
                        class="avatar" 
                        alt="我的头像"
                        v-if="item2.ifUserSend"
                      >

                      <div class="avatar_box" v-else>
                        <span class="iconfont iconfont_avatar">&#xe7a2;</span>
                      </div>

                      <div class="message-bubble">
                          <p>{{ item2.feedbackContent }}</p>
                      </div>
                  </div>

                  <template v-if="item2 && item2.questionPhoto">
                    <div 
                      v-for="(photoUrl, index) in item2.questionPhoto.split(',')" 
                      :key="index"
                      style="width: 100%;"
                    >
                      
                      <div class="date_box">
                        <div class="message_date">{{ item2.createTime }}</div>
                      </div>
                      
                     
                      <div class="message-wrapper">
                        <img 
                          :src="item2.userPhoto" 
                          class="avatar" 
                          alt="我的头像"
                          v-if="item2.ifUserSend"
                        >

                        <div class="avatar_box" v-else>
                          <span class="iconfont iconfont_avatar">&#xe7a2;</span>
                        </div>

                        <img :src="photoUrl"  alt="图片" class="show_photo">
                        
                      </div>
                    </div>
                  </template>
                    
                </div>

              <div class="question_btn_box">
                <el-button plain class="question_btn" @click="clickQuestionModal(item)">还有问题 ></el-button>
              </div>

          </div>
        </div>
        </el-collapse-item>
        
      </el-collapse>
    </div>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="dialogVisible" 
      size="tiny" 
      :show-close="false"
    >
      <el-form
        v-if="dialogVisible"
        :model="ruleForm"
        ref="formRef"
        :rules="rules"
        label-position="top"
        width="70%"
      >
     
      <el-form-item prop="feedbackContent">
        <el-input 
          type="textarea"  
          v-model="ruleForm.feedbackContent"
          :autosize="{ minRows: 5}"
          placeholder="请填写你的具体描述"
          maxlength="200"
          show-word-limit
        >
        </el-input>
      </el-form-item>

      <el-form-item 
        class="upload"
        label="" 
        prop="questionPhoto"
      >
        <file-upload
          action="file/upload"
          :limit="3"
          :fileUrls="ruleForm.questionPhoto ? ruleForm.questionPhoto : ''"
          @change="photoUploadChangeOther"
          accept=".jpg, .jpeg, .png"
          :uploadSize="2"
        ></file-upload>
      </el-form-item>

      <el-form-item>
        <div class="other_button_box">
          <el-button @click="dialogVisible = false;" class="other_button">取消</el-button>
          <el-button type="primary" @click="onSubmit" class="other_button">确认</el-button>
        </div>
      </el-form-item>
    </el-form>

    </el-dialog>

  </div>
</template>

<script>


export default {
  name: "my-feedback-record",
  data() {
    return {
      dialogVisible: false,
      dataInfo: [],
      userInfo: {},
      ruleForm: {
        feedbackContent: "",
        questionPhoto: "",
      },
      submitData: {},
      rules: {
        feedbackContent: [
          { required: true, message: '描述不能为空', trigger: 'blur' },

        ]
      },
    };
  },
  watch: {
    dialogVisible: {
      handler(newVal, oldVal) {
        this.ruleForm = {
          feedbackContent: "",
          questionPhoto: "",
        }
      },
      immediate: true
    }
  },
  created() {
    this.getUserData();
    this.getRecord();
  },
  methods: {
    getUserData() {
       // 获取用户信息
       this.$http({
            url:`${this.$storage.get("sessionTable")}/session`,
            method: "get"
        }).then(({ data }) => {
          if(data.code === 401) {
            this.$router.push({
              
              name: "login",
              query: {
                redirect: this.$route.path
              }
    
            })
          }
            if (data && data.code === 0) {
                this.userInfo = data.data;
            } else {
                this.$message.error(data.msg);
            }
        });
    },
    clickQuestionModal(data) {
      this.dialogVisible = true;
      this.submitData = data;
    },
    getRecord() {
      this.$http({
          url: "feedback/getFeedbackRecordsByUserId",
          method: "get",
          params: {
            userId: +this.$storage.get("userId"),
          }
      }).then(({data}) => {
          if(data && data.code === 0){
              this.dataInfo = Object.values(data.data || {});
              console.log("this.dataInfo", this.dataInfo)
          }
      });
    },
 
    onSubmit() {
      console.log(this.ruleForm);
      this.$refs["formRef"].validate(valid => {
            if (valid) {
                const params = {
                  ...this.ruleForm,
                  userId: this.userInfo.id,
                  adminId: null,
                  parentId: this.submitData[this.submitData.length -1].id,
                  originalRecordId: this.submitData[0].originalRecordId,
                  ifUserSend: true,
                  feedbackTypes: this.submitData[0].feedbackTypes,
                  feedbackQuestionTypes: this.submitData[0].feedbackTypes,
                }

                this.$http({
                    url:`feedback/save`,
                    method: "post",
                    data: params
                }).then(({ data }) => {
                  if (data && data.code === 0) {
                    this.dialogVisible = false;
                    this.$message({
                        message: "操作成功",
                        type: "success",
                        duration: 500,
                        onClose: () => {
                          this.ruleForm = {
                            feedbackContent: "",
                            questionPhoto: "",
                          };
                          this.getRecord();
                        }
                    });
                  } else {
                    this.$message.error(data.msg);
                  }
                });
            
            }

            

        });
    },
    
    //图片
    photoUploadChange(fileUrls){
      this.ruleForm.questionPhoto = fileUrls;
    },

    photoUploadChangeOther(fileUrls) {
      this.ruleForm.questionPhoto = fileUrls;
    },
  }

};
</script>
<style lang="scss" scoped>
  .my_center_record_page {
    .collapse_item {
      max-height: 400px;
      background: #f2f2f2;
      overflow-y: auto;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;

      
      .messages {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 10px;

          .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
          }
  

          .question_btn {
            float: right;
            width: 105px;
            background: transparent;
            color: #3388FF;
            border-color: #3388FF;
          }
      }
  
      .message {
          display: flex;
          align-items: flex-end;
          margin-bottom: 10px;

          .message-wrapper {
            .message-content, 
            .message-bubble {
              padding: 10px;
              border-radius: 10px;
              max-width: calc(100% - 50px);
            }

            .message-bubble {
              max-width: 70%;
            }

            .show_photo {
              width: 150px;
              height: 150px;
            }
          }

          .message-content p, .message-bubble p {
            margin: 0;
            padding: 0;
          }

          &.sent {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

       
              .date_box {
                width: 100%;

                .message_date {
                  width: 130px;
                  background: #dadada;
                  color: #fff;
                  border-radius: 3px;
                  margin: 15px auto;
                  text-align: center;
                } 
              }

              .message-wrapper {
                  display: flex;
                  flex-direction: row-reverse;

                  .avatar {
                    margin-left: 15px;
                  }

                  .message-bubble {
                    background-color: #95ec69;
                    align-self: flex-end;
                    position: relative;

                    &:after {
                        content: "";
                        position: absolute;
                        top: 10px;
                        right: -9px;
                        border-width: 10px 0 10px 10px;
                        border-style: solid;
                        border-color: transparent transparent transparent #95ec69;
                    }
                      
                  }

              }
          }
  
          &.received {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

              .date_box {
                width: 100%;

                .message_date {
                  width: 130px;
                  background: #dadada;
                  color: #fff;
                  border-radius: 3px;
                  margin: 15px auto;
                  text-align: center;
                } 
              }

              .message-wrapper {
                display: flex;

                .avatar_box {
                  margin-right: 15px;
                  background: #3388FF;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;

                  .iconfont_avatar {
                    color: #fff;
                  }
                }

                .message-bubble {
                    background-color: #fff;
                    align-self: flex-end;
                    position: relative;

                    &:before {
                      content: "";
                      position: absolute;
                      top: 10px; /* Adjust based on padding */
                      left: -10px;
                      border-width: 10px 10px 10px 0;
                      border-style: solid;
                      border-color: transparent #fff transparent transparent;
                    }
                      
                  }

                .message-content {
                  background-color: #fff;
                  align-self: flex-start;
                  position: relative;

                  &:before {
                    content: "";
                    position: absolute;
                    top: 10px;
                    left: -9px;
                    border-width: 10px 10px 10px 0;
                    border-style: solid;
                    border-color: transparent #fff transparent transparent;
                  }
                }
              }

              

          }


      }

      
      

    }

    .other_button_box {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .other_button {
        width: 48%;
        height: 40px;
      }
    }


    
  }
 

    .el-collapse-item {
      & /deep/ .el-collapse-item__header:hover {
        background: #ecf5ff;
    }

    
  }


</style>

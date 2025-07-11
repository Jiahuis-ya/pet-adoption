<template>
	<div class="step_component" >
		<div class="steps_title">
      <div class="title_line"></div> 
				编号：{{ id}} &nbsp;&nbsp;{{ titleValue }}
		</div>
    <div class="approval_process" >
			<el-steps 
				:active="active" 
				finish-status="wait" 
				direction="vertical" 
				process-status="finish"
				class="el-steps"
			>
					<el-step v-for="(item) in dataInfo" :id="item.id" :key="item.id" >
						<template slot="title">
								<div class="title_box">
									<div class="left_title">
										<img 
											:src="item.userPhoto" 
											class="avatar" 
											alt="我的头像"
											v-if="item.ifUserSend"
										>
										<div class="avatar_box" v-else>
											<span class="iconfont iconfont_avatar">&#xe7a2;</span>
										</div>
										<span>{{ item.ifUserSend ? item.username : item.adminName }}</span>
									</div>
									
									
									<span class="title_date"><i class="el-icon-time"></i>&nbsp;&nbsp;2024-02-20 00:12:24</span>
								</div>
						</template>
						<template slot="description" >
							<div class="step_row">
									<div class="processing_content_detail" style="float:left;width:70%">
										<div class="content_line"></div> 
										<span style="color:#919FB8">{{ item.feedbackContent }}</span>
										<div 
											class="image_box"
										>
											<el-image 
												class="show_photo"
												style="width: 100px; height: 100px;margin-right: 10px;"
												v-for="(photoUrl, index) in item.questionPhotoShow" 
												:key="index"
												:src="photoUrl"
												:preview-src-list="item.questionPhotoShow">
											</el-image>
										</div>
									</div>
									
							</div>
						</template>
					</el-step>
			</el-steps>
			<el-button class="submit_btn" type="primary" @click="openModal()">{{ isAdmin ? '回复' : '还有问题 >' }}</el-button>
			<el-button type="default" @click="back()">返回</el-button>
 
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
    // 数字，邮件，手机，url，身份证校验
    import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
    export default {
        data() {
            return {
							isAdmin: false,
							titleValue: '',
							dialogVisible: false,
							addEditForm: null,
							id: '',
							userId: '',
							type: '',
							sessionTable : "",//登录账户所在表名
							role : "",//权限
							active: 0,
							userInfo: {},
							dataInfo: [],
							approvalProcessProject:[
									{id:'0',label: "方案制定"},
									{ id:'1',label: "割接方案会审"},
									{ id:'2',label: "割接审批"},
									{ id:'3',label: "审批成功"},
							],
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
        computed: {
        },
        created() {
            this.init();

            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");

        },
       

        mounted() {
        },
        methods: {
					openModal() {
						this.dialogVisible = true;
						this.ruleForm = {
							feedbackContent: "",
							questionPhoto: "",
						};
					},
				
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            // 初始化
            init() {
								this.isAdmin = this.$storage.get("sessionTable") === 'admin'
							 
                this.id = this.$route.params.id;
                this.userId = +this.$route.params.userId;
                this.type = this.$route.params.type;
								
                if(this.type=='add') return;

                if(this.type=='info') {
                    this.info(this.id);
                    this.rules = {};
                }
                if(this.type=='else') {
                   this.info(this.id); 
                }
                // 获取用户信息
                this.$http({
                    url:`${this.$storage.get("sessionTable")}/session`,
                    method: "get"
                }).then(({ data }) => {
									if (data && data.code === 0) {
											this.userInfo = data.data;
									} else {
											this.$message.error(data.msg);
									}
                });

								
            },

						getRecord(id) {
							this.$http({
									url: "feedback/getFeedbackRecordsByUserIdAndOriginalRecordId",
									method: "get",
									params: {
										userId: this.userId,
										originalRecordId: id
									}
							}).then(({data}) => {
									if(data && data.code === 0){
											this.dataInfo = (data.data || []);
											this.dataInfo.forEach(item => {
													item.questionPhotoShow = item.questionPhoto ? item.questionPhoto.split(',') : [];
											})

											this.active = this.dataInfo.length - 1;
											this.titleValue = `【${this.dataInfo[0].feedbackValue}】${this.dataInfo[0].feedbackTypes === 1 
										? this.dataInfo[0].feedbackQuestionValue 
										: this.dataInfo[0].adviceTitle}`;
									}
							});
						},
            // 多级联动参数
            info(id) {
                this.getRecord(id);
            },
            // 提交
            onSubmit() {
							if(!this.ruleForm.feedbackContent) {
								this.$message.warning('内容不能为空');
								return;
							}
                
							this.$refs["formRef"].validate(valid => {
								if (valid) {
									
										const params = {
											...this.ruleForm,
											userId: this.dataInfo[this.dataInfo.length -1].userId,
											adminId: this.$storage.get("sessionTable") === 'admin' ? this.userInfo.id : null,
											parentId: this.dataInfo[this.dataInfo.length -1].id,
											originalRecordId: this.dataInfo[0].originalRecordId,
											ifUserSend: this.$storage.get("sessionTable") === 'admin' ? false : true,
											feedbackTypes: this.dataInfo[0].feedbackTypes,
											feedbackQuestionTypes: this.dataInfo[0].feedbackTypes,
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
										          this.getRecord(this.id);
										        }
										    });
										  } else {
										    this.$message.error(data.msg);
										  }
										});
								
								}

            

        			});
                  
            },
            // 返回
            back() {
                this.$router.go(-1);
            },
						photoUploadChangeOther(fileUrls) {
							this.ruleForm.questionPhoto = fileUrls;
						},
            
        }
    };
</script>

<style lang="scss">

	.step_component{
			width: calc(100%-20px);
			padding: 10px 10px 10px 10px;
			margin: 10px 10px 10px 10px;

			.steps_title {
				margin: 20px 0;

				.title_line{
					float: left;
					width: 4px;
					height: 20px;
					background: rgb(33, 154, 255);
					margin-left: 24px;
					margin-right: 10px;
				}
			}

			.approval_process{
				color: #9EADC4;
				font-size: 14px;
				margin-left:20px;
				margin-right:0px;
				margin-top:10px;

				.title_box {
					width: 90%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.left_title {
						display: flex;
						flex-direction: row;
						align-items: center;
					}

					.avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
          }

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
				}


				.step_row{
					min-width:500px;
					margin-bottom:12px;
					margin-top:12px;
					color: #333;

					

					.processing_content_detail{
						margin-left: 10px;
						margin-top: 3.5px;
						margin-bottom: 3.5px;
						width:150px;
						display:inline-block;
						margin-bottom: 20px;

						.content_line {
							float:left;
							width: 2px;
							height: 20px; 
							background:#fff;
							// background:#C7D4E9;
							margin-left:10px;
							margin-right:10px;
						}

						.image_box {
							display: flex;
							flex-direction: row;
							width: 100%;
							margin-left: 10px;
							margin-top: 10px;

							.show_photo {
								// width: 80px;
								// height: 80px;
								// margin-right: 10px;
							}
						}
					}


				}
				
				.submit_btn {
					margin-top: 12px;
				}


			}


			

			
	}
  
	.el-steps {
				& /deep/ el-step__main {
					padding-botton: 24px;
				}
			}
			

</style>


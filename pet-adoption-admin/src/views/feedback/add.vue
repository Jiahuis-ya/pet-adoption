<template>
	<div class="feedback_add_page">
		<el-form
			v-if="!successPageShow"
      :model="ruleForm"
      ref="formRef"
      :rules="rules"
      label-position="top"
		>
			<el-form-item label="反馈类型" prop="feedbackTypes">
				<el-radio-group v-model="ruleForm.feedbackTypes">
					<el-radio 
						border
						v-for="(item,index) in feedbackTypesSelectSearch"
						v-bind:key="index"
						:label="item.codeIndex"
						:value="item.codeIndex"
					>
						<span @click="resetForm">{{ item.indexName }}</span>
					</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item 
				label="问题类型" 
				prop="feedbackQuestionTypes" 
				v-if="ruleForm.feedbackTypes === 1"
			>
					<el-select 
						v-model="ruleForm.feedbackQuestionTypes" 
						placeholder="请选择问题类型"
						clearable
						style="width: 100%;"
					>
						<el-option
								v-for="(item,index) in feedbackQuestionTypesSelectSearch"
								v-bind:key="index"
								:label="item.indexName"
								:value="item.codeIndex">
						</el-option>

				</el-select>
			</el-form-item>

			<el-form-item 
				label="建议标题" 
				prop="adviceTitle"
				v-if="ruleForm.feedbackTypes === 2"
			>
				<el-input
					v-model="ruleForm.adviceTitle"
					placeholder="请填写标题"
				>
				</el-input>
			</el-form-item>

			<el-form-item label="问题描述" prop="feedbackContent">
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
					@change="photoUploadChange"
					accept=".jpg, .jpeg, .png"
					:uploadSize="2"
				></file-upload>
				<div class="upload_tip">
					<p>温馨提示：</p>
					<p>1、仅支持上传jpg、png格式的图片，暂不支持上传mp4、zip、docx等格式的文件</p>
					<p>2、最多只能上传3张图片</p>
					<p>3、每张图片不能超过2MB</p>
				</div>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交反馈</el-button>
			</el-form-item>
		</el-form>


		<div class="success_page" v-if="successPageShow">
			<div class="success_icon">
				<img src="@/assets/img/success-tip.png" class="success_img">
			</div>
			<p class="success_text">提交成功！</p>
			<p class="success_desc">我们珍视你的每一条反馈</p>
			<el-button class="success_button" type="primary" @click="confirmSuccess">确定</el-button>
		</div>
	</div>
</template>

<script>


export default {
 name: "feedback",
 data() {
		return {
			feedbackTypesSelectSearch : [], // 反馈类型
			feedbackQuestionTypesSelectSearch : [], // 反馈的问题类型
			successPageShow: false,
			userInfo: {},
			ruleForm: {
				feedbackTypes: 1,
				feedbackQuestionTypes: undefined,
				feedbackContent: "",
				questionPhoto: "",
			},
			rules: {
				feedbackTypes: [
						{ required: true, message: '选择不能为空', trigger: 'blur' },
				],
				adviceTitle: [
					{ required: true, message: '标题不能为空', trigger: 'blur' },
				],
				feedbackQuestionTypes: [
							{ required: true, message: '类型不能为空', trigger: 'blur' },
					],
				feedbackContent: [
					{ required: true, message: '描述不能为空', trigger: 'blur' },

				]
			},
		};
 },

	created() {
		this.getFeedbackTypesData();
		this.getFeedbackQuestionTypesData()
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
		getFeedbackTypesData() {
			this.$http({
					url: "dictionary/page?dicCode=feedback_types&page=1&limit=100",
					method: "get",
			}).then(({data}) => {
					if(data && data.code === 0){
							this.feedbackTypesSelectSearch = (data.data.list || []).sort((a, b) => a.id - b.id);
					}
			});
		},

		getFeedbackQuestionTypesData() {
			this.$http({
					url: "dictionary/page?dicCode=feedback_question_types&page=1&limit=100",
					method: "get",
			}).then(({data}) => {
					if(data && data.code === 0){
							this.feedbackQuestionTypesSelectSearch = (data.data.list || []).sort((a, b) => a.id - b.id);
					}
			});
		},
		back() {
			this.$router.go(-1);
		},
		confirmSuccess() {
			this.back();
		},
		resetForm() {
			this.$refs["formRef"].resetFields();
		},
		// 提交	
		onSubmit() {
			if(!this.ruleForm.feedbackTypes) {
				this.$message.warning("反馈类型不能为空");
				return;
			}

				this.$refs["formRef"].validate(valid => {
					if (valid) {

						const params = {
							...this.ruleForm,
							userId: this.userInfo.id,
							adminId: null,
							parentId: null,
							originalRecordId: null,
							ifUserSend: true,
						}
						this.$http({
								url:`feedback/save`,
								method: "post",
								data: params
						}).then(({ data }) => {
							if (data && data.code === 0) {
								this.$message({
										message: "操作成功",
										type: "success",
										duration: 500,
										onClose: () => {
											this.ruleForm = {
												feedbackTypes: 1,
												feedbackQuestionTypes: undefined,
												feedbackContent: "",
												questionPhoto: "",
											};
											this.successPageShow = true;
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

 }

};
</script>
<style lang="scss" scoped>
	.feedback_add_page {
		padding: 24px;
	}
	.upload_tip {
		color: #858585;
		font-size: 13px;
		line-height: 20px;
		margin-top: 24px;
	}

 .success_page {
		margin: 50px auto 0;
		text-align: center;

		.success_text {
			color: #333;
			font-size: 20px;
			margin-top: 25px;
		}

		.success_desc {
			color: #999;
			margin-top: 15px;
		}

		.success_button {
			margin-top: 50px;
			width: 140px;
			background: #2E58FF;
		}

		.success_img {
			width: 71px;
			height: 71px;
		}
 }

</style>

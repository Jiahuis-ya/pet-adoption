<template>
    <div class="addEdit-block">
        <el-form
            class="detail-form-content"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="150px"
        >
            <el-row>
                <input id="updateId" name="id" type="hidden">
                <el-col :span="24">
                    <el-form-item
                        class="input" 
                        label="问题反馈类型编码" 
                        prop="codeIndex"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.codeIndex }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.codeIndex"
                            placeholder="请输入"
                            clearable
                            :readonly="type == 'info'"
                        ></el-input>
                   </el-form-item>
                   
                </el-col>
                <el-col :span="24">
                    <el-form-item
                        class="input" 
                        label="问题反馈类型名称" 
                        prop="indexName"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.indexName }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.indexName"
                            placeholder="请输入"
                            clearable  
                            :readonly="type == 'info'"
                        ></el-input>
                   </el-form-item>
                    
                </el-col>
            </el-row>
            <el-form-item>
                <el-button v-if="type!='info'" type="primary" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" type="primary"  @click="back()">取消</el-button>
                <el-button v-if="type=='info'" type="primary" @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { isNumber } from "@/utils/validate";
   
    export default {
        data() {
            let codeIndexRule = (rule, value, callback) => {
                if((value)&& !isNumber(value)) {
                    callback(new Error('类型编码必须为数字'));
                } else {
                    callback();
                }
            }

            return {
                addEditForm: null,
                id: '',
                type: '',
                formVal:{
                    codeIndex: '',
                    indexName: '',
                    beizhu: ''
                },
                ruleForm: {
                    codeIndex: '',
                    indexName: '',
                    beizhu: ''
                },
                rules: {
                    codeIndex: [
                        { required: true, message: '问题反馈类型编码', trigger: 'blur' },
                        { required: true, validator: codeIndexRule, trigger: 'blur' }
                    ],
                    indexName: [
                        { required: true, message: '问题反馈类型名称', trigger: 'blur' },
                    ]
                }
            };
        },
        computed: {
        },
        created() {
            this.init();
            this.ruleForm.shenqingriqi = this.getCurDate();



        },
       

        mounted() {
        },
        methods: {
            // 初始化
            init() {
               
                this.id = this.$route.params.id;
                this.type = this.$route.params.type;
                if(this.type=='info') {
                    this.info(this.id);
                    this.rules = {};
                }
                if(this.type=='else') {
                   this.info(this.id); 
                }
              
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `dictionary/info/${id}`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.ruleForm = data.data;
                    //解决前台上传图片后台不显示的问题
                    let reg=new RegExp('../../../upload','g')//g代表全部
                } else {
                    this.$message.error(data.msg);
                }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        let ruleForm = this.ruleForm;
                        ruleForm["dicCode"]="feedback_types";
                        ruleForm["dicName"]="反馈类型";

                        this.$http({
                            url: `dictionary/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: ruleForm
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.back();
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
           
            
           
        }
    };
</script>

<style lang="scss">

    
</style>


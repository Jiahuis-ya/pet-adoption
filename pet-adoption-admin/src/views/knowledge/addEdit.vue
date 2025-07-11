<template>
    <div class="addEdit-block">
        <el-form
            class="detail-form-content"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
        >
            <el-row>
                <input id="updateId" name="id" type="hidden">
                <el-col :span="24">
                    <el-form-item
                        class="input" 
                        label="知识标题" 
                        prop="title"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.title }}
                        </span>
                       <el-input
                            v-else
                            v-model="ruleForm.title"
                            placeholder="知识标题"
                            clearable
                        ></el-input>
                   </el-form-item>
                   
                </el-col>
                <el-col :span="24">
                    <el-form-item 
                        class="select" 
                        label="知识类型" 
                        prop="knowledgeTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.knowledgeValue }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.knowledgeTypes"
                            placeholder="知识类型"
                        >
                            <el-option
                                v-for="(item) in knowledgeTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex"
                                :disabled="type == 'info'"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-col>

                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="赞" 
                        prop="likeCount"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.likeCount }}
                        </span>
                        <el-input
                            v-else
                            v-model="ruleForm.likeCount"
                            type="number"
                            :min="0"
                            :max="999"
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="踩" 
                        prop="dislikeCount"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.dislikeCount }}
                        </span>
                       <el-input
                            v-else
                            v-model="ruleForm.dislikeCount"
                            type="number"
                            :min="0"
                            :max="999"
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="收藏" 
                        prop="collectCount"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.collectCount }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.collectCount"
                            type="number"
                            :min="0"
                            :max="999"
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item 
                        class="upload"
                        v-if="type!='info' && !formVal.photo" 
                        label="知识封面" 
                        prop="photo"
                     >
                        <file-upload
                            action="file/upload"
                            :limit="1"
                            :multiple="true"
                            :fileUrls="ruleForm.photo ? ruleForm.photo : ''"
                            @change="photoUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.photo" 
                            label="知识封面" 
                            prop="photo"
                        >
                            <img 
                                style="margin-right:20px;" 
                                v-bind:key="index" 
                                v-for="(item,index) in (ruleForm.photo || '').split(',')" 
                                :src="item" width="100" 
                                height="100"
                            >
                        </el-form-item>
                    </div>
                </el-col>
               
                <el-col :span="24">
                    <el-form-item 
                        v-if="type!='info'"  
                        label="知识内容" 
                        prop="content"
                    >
                        <editor 
                            style="min-width: 200px; max-width: 600px;"
                            v-model="ruleForm.content"
                            class="editor"
                            action="file/upload"
                        >
                        </editor>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.content" 
                            label="知识内容" 
                            prop="content"
                        >
                            <span v-html="ruleForm.content"></span>
                        </el-form-item>
                    </div>
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
    // 数字，邮件，手机，url，身份证校验
    import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
    export default {
        data() {
            return {
                addEditForm: null,
                id: '',
                type: '',
                sessionTable : "",//登录账户所在表名
                role : "",//权限
                formVal:{
                    title: false,
                    knowledgeTypes: false,
                    photo: false,
                    content: false,
                    likeCount: false,
                    dislikeCount: false,
                    collectCount: false,
                },
                ruleForm: {
                    title: '',
                    knowledgeTypes: '',
                    photo: '',
                    content: '',
                    likeCount: 0,
                    dislikeCount: 0,
                    collectCount: 0,
                },
                knowledgeTypesOptions : [],
                rules: {
                    title: [
                        { required: true, message: '知识标题不能为空', trigger: 'blur' },
                    ],
                    knowledgeTypes: [
                        { required: true, message: '知识类型不能为空', trigger: 'blur' },
                        {  
                            pattern: /^[1-9][0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    photo: [
                              { required: true, message: '知识封面不能为空', trigger: 'blur' },
                          ],
                    content: [
                        { required: true, message: '知识内容不能为空', trigger: 'blur' },
                    ],
                }
            };
        },
        computed: {
        },
        created() {
            this.init();

            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");

            if (this.role != "管理员"){
            }
            //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=knowledge_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.knowledgeTypesOptions = data.data.list;
                    }
                });

           

        },
       

        mounted() {
        },
        methods: {
            // 初始化
            init() {
               
                this.id = this.$route.params.id;
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
                        var json = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `knowledge/info/${id}`,
                    method: 'get'
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
                let params = {
                    ...this.ruleForm,
                    likeCount: +this.ruleForm.likeCount,
                    dislikeCount: +this.ruleForm.dislikeCount,
                    collectCount: +this.ruleForm.collectCount,
                }
                
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url:`knowledge/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: params
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
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            // 返回
            back() {
                this.$router.go(-1);
            },
            //图片
            photoUploadChange(fileUrls){
                this.ruleForm.photo = fileUrls;
            },

            
           
        }
    };
</script>

<style lang="scss">

    
</style>


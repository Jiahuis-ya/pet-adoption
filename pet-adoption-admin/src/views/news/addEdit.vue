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
                        label="公告名称" 
                        prop="newsName"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.newsName }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.newsName"
                            placeholder="公告名称"
                            clearable  
                            :readonly="type == 'info'"
                        ></el-input>
                   </el-form-item>
                   
                </el-col>
                <el-col :span="24">
                    <el-form-item 
                        class="select" 
                        label="公告类型" 
                        prop="newsTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.newsValue }}
                        </span>
                        <el-select
                             v-else
                            v-model="ruleForm.newsTypes"
                            placeholder="公告类型"
                        >
                            <el-option
                                v-for="(item) in newsTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex"
                                :disabled="type == 'info'"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-col>

                <el-col :span="24">
                    <el-form-item 
                        class="upload"
                        v-if="type!='info' && !formVal.newsPhoto" 
                        label="公告图片" 
                        prop="newsPhoto"
                     >
                        <file-upload
                            action="file/upload"
                            :limit="1"
                            :multiple="true"
                            :fileUrls="ruleForm.newsPhoto ? ruleForm.newsPhoto : ''"
                            @change="photoUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.newsPhoto" 
                            label="公告图片" 
                            prop="newsPhoto"
                        >
                            <img 
                                style="margin-right:20px;" 
                                v-bind:key="index" 
                                v-for="(item,index) in (ruleForm.newsPhoto || '').split(',')" 
                                :src="item" width="100" 
                                height="100"
                            >
                        </el-form-item>
                    </div>
                </el-col>
               
                <el-col :span="24">
                    <el-form-item 
                        v-if="type!='info'"  
                        label="公告内容" 
                        prop="newsContent"
                    >
                        <editor 
                            style="min-width: 200px; max-width: 600px;"
                            v-model="ruleForm.newsContent"
                            class="editor"
                            action="file/upload"
                        >
                        </editor>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.newsContent" 
                            label="公告内容" 
                            prop="newsContent"
                        >
                            <span v-html="ruleForm.newsContent"></span>
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
                    newsName: false,
                    newsTypes: false,
                    newsPhoto: false,
                    newsContent: false,
                },
                ruleForm: {
                    newsName: '',
                    newsTypes: '',
                    newsPhoto: '',
                    newsContent: '',
                },
                newsTypesOptions : [],
                rules: {
                    newsName: [
                        { required: true, message: '公告名称不能为空', trigger: 'blur' },
                    ],
                    newsTypes: [
                        { required: true, message: '公告类型不能为空', trigger: 'blur' },
                        {  
                            pattern: /^[1-9][0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    newsPhoto: [
                              { required: true, message: '公告图片不能为空', trigger: 'blur' },
                          ],
                    newsContent: [
                        { required: true, message: '公告内容不能为空', trigger: 'blur' },
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
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=news_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.newsTypesOptions = data.data.list;
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
                    url: `news/info/${id}`,
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
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url:`news/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
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
                this.ruleForm.newsPhoto = fileUrls;
            },

            
           
        }
    };
</script>

<style lang="scss">

    
</style>


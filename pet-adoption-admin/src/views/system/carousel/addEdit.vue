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
                        label="轮播名称" 
                        prop="carouselName"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.carouselName }}
                        </span>
                       <el-input  
                            v-else
                            v-model="ruleForm.carouselName"
                            placeholder="轮播名称"
                            clearable  
                            :readonly="type == 'info'"
                        ></el-input>
                   </el-form-item>
                   
                </el-col>

                <el-col :span="24">
                    <el-form-item 
                        class="upload"
                        v-if="type!='info' && !formVal.carouselPhoto" 
                        label="轮播图片" 
                        prop="carouselPhoto"
                     >
                        <file-upload
                            action="file/upload"
                            :limit="1"
                            :multiple="true"
                            :fileUrls="ruleForm.carouselPhoto ? ruleForm.carouselPhoto : ''"
                            @change="photoUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.carouselPhoto" 
                            label="轮播图片" 
                            prop="carouselPhoto"
                        >
                            <img 
                                style="margin-right:20px;" 
                                v-bind:key="index" 
                                v-for="(item,index) in (ruleForm.carouselPhoto || '').split(',')" 
                                :src="item" width="100" 
                                height="100"
                            >
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
                    carouselName: false,
                    carouselPhoto: false,
                },
                ruleForm: {
                    carouselName: '',
                    carouselPhoto: '',
                },
                rules: {
                    carouselName: [
                        { required: true, message: '轮播名称不能为空', trigger: 'blur' },
                    ],
                    carouselPhoto: [
                        { required: true, message: '轮播图片不能为空', trigger: 'blur' },
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
                    url: `carousel/info/${id}`,
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
                            url:`carousel/${!this.ruleForm.id ? "save" : "update"}`,
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
                this.ruleForm.carouselPhoto = fileUrls;
            },

            
           
        }
    };
</script>

<style lang="scss">

    
</style>


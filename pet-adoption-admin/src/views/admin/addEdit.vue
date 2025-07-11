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
                <!-- <input id="updateId" name="id" type="hidden"> -->
                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="用户名" 
                        prop="username"
                    >
                    <span v-if="this.type == 'info'">
                        {{ ruleForm.username }}
                    </span>
                       <el-input
                            v-else
                            v-model="ruleForm.username"
                            placeholder="请输入用户名"
                            clearable
                        ></el-input>
                   </el-form-item>
                   
                </el-col>
                <!-- <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="密码" 
                        prop="password"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.password }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.password"
                            placeholder="请输入密码"
                            clearable  
                        ></el-input>
                   </el-form-item>
                </el-col> -->

                <el-col :span="12">
                    <el-form-item 
                        class="select" 
                        label="性别" 
                        prop="sexTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.sexValue }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.sexTypes"
                            placeholder="请选择性别"
                            style="width:100%;"
                        >
                            <el-option
                                v-for="(item) in sexTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item
                            class="input" 
                            label="手机号" 
                            prop="phone"
                        >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.phone }}
                        </span>
                        <el-input 
                            v-else
                            v-model="ruleForm.phone"
                            placeholder="手机号"
                            clearable  
                            :readonly="type == 'info'"
                        ></el-input>
                        </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item 
                        class="upload"
                        v-if="type!='info' && !formVal.photo" 
                        label="照片" 
                        prop="photo"
                     >
                        <file-upload
                            action="file/upload"
                            :limit="1"
                            :multiple="true"
                            :fileUrls="ruleForm.photo ? ruleForm.photo : ''"
                            @change="onUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.photo" 
                            label="照片" 
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
    export default {
        data() {
            return {
                addEditForm: null,
                id: '',
                type: '',
                formVal:{
                    username : false,
                    password : false,
                    role : false,
                    sexTypes: false,
                    phone: false,
                    photo: false,
                },
                ruleForm: {
                    username: '',
                    password: '123456',
                    sexTypes: '',
                    phone: '',
                    photo: '',
                },
                rules: {
                    username: [
                            { required: true, message: '用户名不能为空', trigger: 'blur' },
                    ],
                    // password: [
                    //         { required: true, message: '密码不能为空', trigger: 'blur' },
                    // ],
                    role: [
                    ],
                    sexTypes: [
                              { required: true, message: '性别不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                    phone: [
                              {  required: true, message: '手机号不能为空', trigger: 'blur' },
                              {  pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                                 message: '手机号格式不对',
                                 trigger: 'blur'
                              }
                          ],
                          photo: [
                              { required: true, message: '照片不能为空', trigger: 'blur' },
                          ],
                },
                sexTypesOptions: []
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
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=pet_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.petTypesOptions = data.data.list;
                    }
                });

                //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.sexTypesOptions = data.data.list;
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

                if(this.type=='info'){
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
                    url: `admin/info/${id}`,
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
                    this.$http({
                        url: `admin/${!this.ruleForm.id ? "save" : "update"}`,
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
             onUploadChange(fileUrls){
                this.ruleForm.photo = fileUrls;
            },
        }
    };
</script>

<style lang="scss">

    
</style>


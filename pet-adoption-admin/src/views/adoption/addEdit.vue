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
                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="宠物名称" 
                        prop="petName"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.petName }}
                        </span>
                       <el-input 
                            v-else
                            v-model="ruleForm.petName"
                            placeholder="宠物名称"
                            clearable
                        ></el-input>
                   </el-form-item>
                   
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        class="select" 
                        label="宠物类型" 
                        prop="petTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.petValue }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.petTypes"
                            placeholder="请选择宠物类型"
                        >
                            <el-option
                                v-for="(item) in petTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex"
                                :disabled="type == 'info'"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="12">
                    <el-form-item 
                        class="select" 
                        label="宠物性别" 
                        prop="petGenderTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.petGenderValue }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.petGenderTypes"
                            placeholder="请选择宠物性别"
                        >
                            <el-option
                                v-for="(item) in petGenderTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item 
                        class="select" 
                        label="宠物生日" 
                        prop="petBirthday"
                    >
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.petBirthday }}
                        </span>
                        <el-date-picker
                            v-else
                            v-model="ruleForm.petBirthday"
                            type="date"
                            placeholder="请选择宠物生日日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                        
                    </el-form-item>
                </el-col>


                <el-col :span="24">
                    <el-form-item 
                        class="upload"
                        v-if="type!='info' && !formVal.photo" 
                        label="宠物图片" 
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
                            label="宠物图片" 
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
                        label="宠物详情" 
                        prop="content"
                    >
                    <el-input 
                            type="textarea"  
                            v-model="ruleForm.content"
                            :autosize="{ minRows: 5}"
                            placeholder="请输入内容"
                        >
                        </el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item 
                            v-if="ruleForm.content" 
                            label="宠物详情" 
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
                    petName: false,
                    petTypes: false,
                    photo: false,
                    content: false,
                    petGenderTypes: false,
                    petBirthday: false,
                    adoptStatusTypes: 2, // 宠物的领养状态-默认未领养
                },
                ruleForm: {
                    petName: '',
                    petTypes: '',
                    photo: '',
                    content: '',
                    petGenderTypes: '',
                    petBirthday: '',
                    adoptStatusTypes: 2, // 宠物的领养状态-默认未领养
                },
                petTypesOptions : [],
                petGenderTypesOptions : [],
                rules: {
                    petName: [
                        { required: true, message: '宠物名称不能为空', trigger: 'blur' },
                    ],
                    petTypes: [
                        { required: true, message: '宠物类型不能为空', trigger: 'blur' },
                        {  
                            pattern: /^[1-9][0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    petGenderTypes: [
                        { required: true, message: '宠物性别不能为空', trigger: 'blur' },
                        {  
                            pattern: /^[1-9][0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    petBirthday: [
                        { required: true, message: '宠物生日日期不能为空', trigger: 'blur' },
                    ],
                    photo: [
                              { required: true, message: '宠物图片不能为空', trigger: 'blur' },
                          ],
                    content: [
                        { required: true, message: '宠物详情不能为空', trigger: 'blur' },
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
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=pet_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.petTypesOptions = data.data.list;
                    }
                });

            //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=pet_gender_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.petGenderTypesOptions = data.data.list;
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
                    url: `adopt/info/${id}`,
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
                            url:`adopt/${!this.ruleForm.id ? "save" : "update"}`,
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
                this.ruleForm.photo = fileUrls;
            },
            
            
           
        }
    };
</script>

<style lang="scss">

    
</style>


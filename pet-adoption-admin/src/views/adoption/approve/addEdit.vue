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
                <el-col :span="12">
                    <el-form-item class="select" label="宠物名称" prop="adoptId">
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.petName }}
                        </span>
                        <el-select 
                            v-else
                            v-model="ruleForm.adoptId" 
                            filterable 
                            placeholder="请选择宠物" 
                            @change="onAdoptChange"
                        >
                            <el-option
                                    v-for="(item) in adoptOptions"
                                    v-bind:key="item.id"
                                    :label="item.petName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="input" label="宠物类型" prop="petTypes">
                        <span v-if="this.type == 'info'">
                            {{ adoptForm.petValue }}
                        </span>
                        <el-input 
                            v-else
                            v-model="adoptForm.petValue"
                            placeholder="宠物类型" 
                            clearable 
                            readonly
                        ></el-input>
                    </el-form-item>
                   
                </el-col>
                <el-col :span="24">
                    <el-form-item class="upload" v-if="!ro.photo" label="宠物图片" prop="photo">
                        <img 
                            style="margin-right:20px;" 
                            :key="index" 
                            v-for="(item,index) in (adoptForm.photo || '').split(',')" 
                            :src="item" 
                            width="100" 
                            height="100"
                        />
                    </el-form-item>
                </el-col>
                
                <el-col :span="12"  v-if="sessionTable !='user'">
                    <el-form-item class="select" label="用户" prop="userId">
                        <span v-if="this.type == 'info'">
                            {{ userForm.account }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.userId" 
                            filterable 
                            placeholder="请选择用户" 
                            @change="userChange"
                        >
                            <el-option
                                    v-for="(item) in userOptions"
                                    v-bind:key="item.id"
                                    :label="item.username"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12"  v-if="sessionTable !='user' ">
                    <el-form-item class="input"  label="用户姓名" prop="username">
                        <span v-if="this.type == 'info'">
                            {{ userForm.username }}
                        </span>
                        <el-input 
                            v-else
                            v-model="userForm.username"
                            placeholder="用户姓名" 
                            clearable
                            readonly
                        ></el-input>
                    </el-form-item>
                   
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='user' ">
                    <el-form-item class="input" label="身份证号" prop="idCardNumber">
                        <span v-if="this.type == 'info'">
                            {{ userForm.idCardNumber }}
                        </span>
                        <el-input 
                            v-else
                            v-model="userForm.idCardNumber"
                            placeholder="身份证号" 
                            clearable
                            readonly
                        ></el-input>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='user' ">
                    <el-form-item class="input" v-if="type!='info'"  label="手机号" prop="phone">
                        <span v-if="this.type == 'info'">
                            {{ userForm.phone }}
                        </span>
                        <el-input 
                            v-else
                            v-model="userForm.phone"
                            placeholder="手机号" 
                            clearable
                            readonly
                        ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12"  v-if="sessionTable !='user' ">
                    <el-form-item class="input" label="个人地址" prop="address">
                        <span v-if="this.type == 'info'">
                            {{ userForm.address }}
                        </span>
                        <el-input 
                            v-else
                            v-model="userForm.address"
                            placeholder="个人地址" 
                            clearable 
                            readonly
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="sessionTable !='user' ">
                    <el-form-item class="upload" label="照片" prop="photo">
                        <img 
                            style="margin-right:20px;"
                            :key="index" 
                            v-for="(item,index) in (userForm.photo || '').split(',')" 
                            :src="item" 
                            width="100" 
                            height="100"
                        >
                    </el-form-item>
                    
                </el-col>
                <input id="updateId" name="id" type="hidden">
            <input id="adoptId" name="adoptId" type="hidden">
            <input id="userId" name="userId" type="hidden">
                <el-col :span="24">
                    <el-form-item label="领养理由" prop="reason">
                        <span v-if="this.type == 'info'">
                            {{ ruleForm.reason }}
                        </span>
                        <el-input 
                            v-else
                            type="textarea" 
                            :autosize="{ minRows: 5}" 
                            :readonly="type==='info'"
                            v-model="ruleForm.reason" 
                            placeholder="领养理由"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button v-if="type!='info'" type="primary" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" type="primary"  @click="back()">取消</el-button>
                <el-button v-if="type=='info'" type="primary"  @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                id: '',
                type: '',
                sessionTable : "",//登录账户所在表名
                role : "",//权限
                adoptForm: {},
                userForm: {},
                ro:{
                    adoptId: false,
                    userId: false,
                    reason: false,
                    approvalStatusTypes: false,
                },
                ruleForm: {
                    adoptId: '',
                    userId: '',
                    reason: '',
                    approvalStatusTypes: '',
                },
                approvalStatusTypesOptions : [],
                adoptOptions : [],
                userOptions : [],
                rules: {
                    adoptId: [
                              { required: true, message: '宠物不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                    userId: [
                              { required: true, message: '领养用户不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                          reason: [
                              { required: true, message: '领养理由不能为空', trigger: 'blur' },
                          ],
                          approvalStatusTypes: [
                              { required: true, message: '申请状态不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                },
            };
        },
        props: ["parent"],
        computed: {
        },
        created() {
            this.init();

            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");

            console.log(this.sessionTable, 'this.sessionTable');
            this.role = this.$storage.get("role");

            if (this.role != "管理员"){
            }
            
            //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=approval_status_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.approvalStatusTypesOptions = data.data.list;
                    }
                });

         this.$http({
             url: `adopt/page?page=1&limit=100`,
             method: "get"
         }).then(({ data }) => {
             if (data && data.code === 0) {
                this.adoptOptions = data.data.list;
            }
         });
         this.$http({
             url: `user/page?page=1&limit=100`,
             method: "get"
         }).then(({ data }) => {
             if (data && data.code === 0) {
                this.userOptions = data.data.list;
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
            onAdoptChange(id){
                this.$http({
                    url: `adopt/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.adoptForm = data.data;
                    }
                });
            },
            userChange(id){
                this.$http({
                    url: `user/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.userForm = data.data;
                    }
                });
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `adoptApproval/info/${id}`,
                    method: 'get'
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.ruleForm = data.data;
                        this.onAdoptChange(data.data.adoptId)
                        this.userChange(data.data.userId)
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
                            url:`adoptApproval/${!this.ruleForm.id ? "save" : "update"}`,
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
            }
        }
    };
</script>
<style lang="scss">
    .editor{
        height: 500px;
    }
</style>


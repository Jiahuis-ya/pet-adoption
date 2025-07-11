<template>
    <div>
        <div class="container">
            <div 
                class="login-form" 
                style="backgroundColor:#fff;"
            >
                <h1 
                    class="h1" 
                    style="color:#000;fontSize:28px;"
                >注册</h1>
                <el-form 
                    ref="formRef" 
                    class="rgs-form" 
                    :model="rgsForm" 
                    label-width="100px"
                >
                    <el-form-item 
                        label="账号" 
                        class="input" 
                        prop="account"
                    >
                        <el-input 
                            v-model="ruleForm.account" 
                            autocomplete="off" 
                            placeholder="账号"  
                        />
                    </el-form-item>
                    <el-form-item 
                        label="密码"
                        class="input"
                        prop="password"
                     >
                        <el-input 
                            type="password" 
                            v-model="ruleForm.password" 
                            autocomplete="off"
                            placeholder="请输入密码"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item 
                        label="再次密码"
                        class="input"
                        prop="repetitionPassword"
                     >
                        <el-input 
                            type="password" 
                            v-model="ruleForm.repetitionPassword" 
                            autocomplete="off" 
                            placeholder="再次输入密码"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item
                        label="用户姓名"
                        class="input"
                        prop="username"
                     >
                        <el-input 
                            v-model="ruleForm.username"
                            autocomplete="off" 
                            placeholder="用户姓名"
                        />
                    </el-form-item>
                    <el-form-item 
                        label="身份证号" 
                        class="input"
                        v-if="tableName=='user'"
                        prop="idCardNumber"
                     >
                        <el-input 
                            v-model="ruleForm.idCardNumber" 
                            autocomplete="off" 
                            placeholder="身份证号"  
                        />
                    </el-form-item>
                    <el-form-item
                        label="手机号" 
                        class="input"
                        v-if="tableName=='user'"
                        prop="phone"
                    >
                        <el-input 
                            v-model="ruleForm.phone" 
                            autocomplete="off" 
                            placeholder="手机号"
                        />
                    </el-form-item>
                    <el-button 
                        class="submit_btn" 
                        type="primary"
                        @click="login()"
                    >立即注册</el-button>
                    <span 
                        class="login_text"
                        @click="gotoLogin()"
                    >
                    ← 已有账号点此登录
                   </span>
                    
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            let repetitionPasswordRule = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
            }
        };
            
            return {
                ruleForm: {
                },
                rules: {},
                tableName: 'user',
                sexTypesOptions : [],
                ruleAdmin: {
                    account: [
                              { required: true, message: '账户不能为空', trigger: 'blur' },
                          ],
                    password: [
                              { required: true, message: '密码不能为空', trigger: 'blur' },
                          ],
                    repetitionPassword:[
                        {required: true, validator: repetitionPasswordRule, trigger: 'blur' }
                    ],
                },
                rulesUser: {
                    account: [
                              { required: true, message: '账户不能为空', trigger: 'blur' },
                          ],
                    password: [
                              { required: true, message: '密码不能为空', trigger: 'blur' },
                          ],
                    repetitionPassword:[
                        {required: true, validator: repetitionPasswordRule, trigger: 'blur' }
                    ],
                    username: [
                              { required: true, message: '用户姓名不能为空', trigger: 'blur' },
                          ],
                   sexTypes:  [
                              { required: true, message: '性别不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                    idCardNumber: [
                        { required: true, message: '身份证号不能为空', trigger: 'blur' },
                        { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '身份证号格式有误！',
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
                }
            };
        },

      
        created() {
            
        },
        mounted(){
            let table = this.$storage.get("loginTable");
            this.tableName = table;
           
            // }

            console.log(this.tableName ,this.tableName == 'user', "this.tableName ")
        },
       
        methods: {
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            close(){
                this.$router.push({ path: "/login" });
            },
            gotoLogin() {
                this.$router.replace({ path: "/login" });

            },
            // 注册
            login() {

                // this.$refs["formRef"].validate(valid => {
                //     if (valid) {

                //     }
                // })

                        

                

                if((!this.ruleForm.account)){
                    this.$message.error('账号不能为空');
                    return
                }
                if((!this.ruleForm.password)){
                    this.$message.error('密码不能为空');
                    return
                }
                if((!this.ruleForm.repetitionPassword)){
                    this.$message.error('再次密码不能为空');
                    return
                }
                if(this.ruleForm.repetitionPassword != this.ruleForm.password){
                    this.$message.error('密码和再次密码不一致');
                    return
                }
                if((!this.ruleForm.username)&& 'user'==this.tableName){
                    this.$message.error('用户姓名不能为空');
                    return
                }
                if((!this.ruleForm.idCardNumber)&& 'user'==this.tableName){
                    this.$message.error('身份证号不能为空');
                    return
                }
                if('user' == this.tableName && this.ruleForm.phone&&(!this.$validate.isMobile(this.ruleForm.phone))){
                    this.$message.error('手机应输入手机格式');
                    return
                }

                this.$http({
                    url: `${this.tableName}/register`,
                    method: "post",
                    data:this.ruleForm
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: "注册成功,请登录后在个人中心页面补充个人数据",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.gotoLogin();
                            }
                        });
                    } else {
                        this.$message.error(data.msg);
                    }
                });
                
            }
        }
    };
</script>
<style lang="scss" scoped>
    .h1 {
        margin-top: 10px;
    }

    body {
        padding: 0;
        margin: 0;
    }

    .nk-navigation {
        margin-top: 15px;

    a {
        display: inline-block;
        color: #fff;
        background: rgba(255, 255, 255, .2);
        width: 100px;
        height: 50px;
        border-radius: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;
        padding: 0 20px;
    }

    .icon {
        margin-left: 10px;
        width: 30px;
        height: 30px;
    }
    }

    .register-container {
        margin-top: 10px;

    a {
        display: inline-block;
        color: #fff;
        max-width: 500px;
        height: 50px;
        border-radius: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;
        padding: 0 20px;

    div {
        margin-left: 10px;
    }
    }
    }

    .container {
        background-image: url("/petadoption/img/bg-back.png");
        height: 100vh;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;

    .login-form {
        position: absolute;
        right: 50%;
        top: 50%;
        height: auto;
        transform: translate3d(50%, -50%, 0);
        border-radius: 10px;
        background-color: rgba(255,255,255,.5);
        width: 420px;
        padding: 30px 30px 40px 30px;
        font-size: 14px;
        font-weight: 500;

    .h1 {
        margin: 0;
        text-align: center;
        line-height: 54px;
        font-size: 24px;
        color: #000;
    }

    .rgs-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    .input {
        width: 100%;

    & /deep/ .el-form-item__label {
          line-height: 40px;
          color: rgba(17, 16, 16, 1);
          font-size: #606266;
      }

    & /deep/ .el-input__inner {
          height: 40px;
          color: rgba(23, 24, 26, 1);
          font-size: 14px;
          border-width: 1px;
          border-style: solid;
          border-radius: 8px;
          background-color: #fff;
      }
    }

    .btn {
        margin: 0 10px;
        width: 88px;
        height: 44px;
        color: #fff;
        font-size: 14px;
        border-width: 1px;
        border-style: solid;
        border-color: #409EFF;
        border-radius: 22px;
        background-color: #409EFF;
    }

   

    }
    }
    }

    .login_text {
        text-align: center;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        color:#409EFF;
        font-weight: bold;
    }

    .submit_btn {
        width: 100%;
    }
</style>

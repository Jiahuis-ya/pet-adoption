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
                        prop="username"
                    >
                        <el-input 
                            v-model="ruleForm.username" 
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
                        label="手机号" 
                        class="input"
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
                tableName: 'admin',
                sexTypesOptions : [],
                ruleAdmin: {
                    username: [
                              { required: true, message: '账户不能为空', trigger: 'blur' },
                          ],
                    password: [
                              { required: true, message: '密码不能为空', trigger: 'blur' },
                          ],
                    repetitionPassword:[
                        {required: true, validator: repetitionPasswordRule, trigger: 'blur' }
                    ],
                },
            };
        },

      
        created() {
            
        },
        mounted(){
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

                        

                

                if((!this.ruleForm.username)){
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
               
                if(this.ruleForm.phone&&(!this.$validate.isMobile(this.ruleForm.phone))){
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

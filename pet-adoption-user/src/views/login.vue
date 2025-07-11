<template>
    <div>
        <div 
            class="container loginIn" 
            style="backgroundImage: url(/petadoption/img/bg-back.png)"
        >
            <div class="left center" style="backgroundColor: #FFF">
                <el-form class="login-form" label-position="left" >
                    <div class="title-container">
                        <h3 class="title">登录</h3>
                    </div>
                    <el-form-item label="" >
                        <el-input 
                            prefix-icon="el-icon-user-solid" 
                            placeholder="请输入用户名" 
                            name="username" 
                            type="text" 
                            v-model="rulesForm.username"
                            class="my_input"
                        />
                    </el-form-item>

                    <el-form-item label="">
                        <el-input 
                            prefix-icon="el-icon-unlock" 
                            placeholder="请输入密码" 
                            name="password" 
                            type="password" 
                            v-model="rulesForm.password" 
                            class="my_input"
                        />
                    </el-form-item>

                    <!-- <el-form-item label="" class="code_box code">
                        <el-input 
                            placeholder="请输入验证码"
                            name="code" 
                            type="text" 
                            v-model="rulesForm.code"
                            class="my_input"
                        />
                        <div 
                            class="getCodeBt"
                            @click="getRandCode(4)" 
                            style="height:46px;line-height:46px"
                         >
                            <span 
                                v-for="(item, index) in codes" 
                                :key="index" 
                                :style="{
                                    color:item.color,
                                    transform:item.rotate,
                                    fontSize:item.size
                                }"
                            >
                                {{ item.num }}
                            </span>
                        </div>
                    </el-form-item> -->

                    <!-- <el-form-item label="角色" prop="loginInRole" class="role">
                        <el-radio
                                v-for="item in menus"
                                v-if="item.hasBackLogin=='是'"
                                v-bind:key="item.roleName"
                                v-model="rulesForm.role"
                                :label="item.roleName"
                        >{{item.roleName}}</el-radio>
                    </el-form-item> -->
                    <el-button 
                        type="primary"
                        @click="login()"
                        class="loginInBt"
                    >
                        {{'1' == '1' ? '登录' : 'login'}}
                    </el-button>
                    <div class="btn_wrapper">
                        <span class="register_account">还没有账号？</span>
                        <span
                            class="register_text"
                            @click="register('user')"
                        >
                        先去注册 →
                    </span>
                    </div>
                    
                </el-form>
            </div>

        </div>
    </div>
</template>
<script>
    import menu from "@/utils/menu";
    export default {
        data() {
            return {
                rulesForm: {
                    username: "",
                    password: "",
                    role: "",
                    code: '',
                },
                menus: [],
                tableName: 'user',
                codes: [{
                    num: 1,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 2,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 3,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                },{
                    num: 4,
                    color: '#000',
                    rotate: '10deg',
                    size: '16px'
                }],
            };
        },
        mounted() {
            let menus = menu.list();
            this.menus = menus;
        },
        computed: {
            redirect() {
                return this.$route.query.redirect
            }
        },
        created() {
            this.getRandCode()
        },
        methods: {
            register(tableName){
                this.$storage.set("loginTable", tableName);
                this.$router.push({path:'/register'})
            },
            // 登陆
            login() {
                let code = ''
                for(let i in this.codes) {
                    code += this.codes[i].num
                }
                // if (!this.rulesForm.code) {
                //     this.$message.error("请输入验证码");
                //     return;
                // }
                // if (this.rulesForm.code.toLowerCase() != code.toLowerCase()) {
                //     this.$message.error("验证码输入有误");
                //     this.getRandCode()
                //     return;
                // }
                if (!this.rulesForm.username) {
                    this.$message.error("请输入用户名");
                    return;
                }
                if (!this.rulesForm.password) {
                    this.$message.error("请输入密码");
                    return;
                }
                // if (!this.rulesForm.role) {
                //     this.$message.error("请选择角色");
                //     return;
                // }
                // let menus = this.menus;
                // for (let i = 0; i < menus.length; i++) {
                //     if (menus[i].roleName == this.rulesForm.role) {
                //         this.tableName = menus[i].tableName;
                //     }
                // }

                this.$http({
                    url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
                    method: "post"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.$storage.set("userId", data.userId);
                    this.$storage.set("Token", data.token);
                    this.$storage.set("role", this.rulesForm.role);
                    this.$storage.set("sessionTable", this.tableName);
                    this.$storage.set("adminName", this.rulesForm.username);
					this.$store.commit('global/setUserInfo', {
                        userId: data.userId,
                        role: this.rulesForm.role,
                        adminName: this.rulesForm.username,
                    })

                    if (this.redirect) {
                        this.$router.replace({
                            path: this.redirect,
                            query: {
                                isRedirect: true
                            }
                        })
                    } else {
                        this.$router.replace({ path: "/index" });
                    }

                    
                } else {
                    this.$message.error(data.msg);
                }
            });
            },
            getRandCode(len = 4){
                this.randomString(len)
            },
            randomString(len = 4) {
                let chars = [
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                    "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",
                    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
                    "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",
                    "3", "4", "5", "6", "7", "8", "9"
                ]
                let colors = ["0", "1", "2","3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
                let sizes = ['14', '15', '16', '17', '18']

                let output = [];
                for (let i = 0; i < len; i++) {
                    // 随机验证码
                    let key = Math.floor(Math.random()*chars.length)
                    this.codes[i].num = chars[key]
                    // 随机验证码颜色
                    let code = '#'
                    for (let j = 0; j < 6; j++) {
                        let key = Math.floor(Math.random()*colors.length)
                        code += colors[key]
                    }
                    this.codes[i].color = code
                    // 随机验证码方向
                    let rotate = Math.floor(Math.random()*60)
                    let plus = Math.floor(Math.random()*2)
                    if(plus == 1) rotate = '-'+rotate
                    this.codes[i].rotate = 'rotate('+rotate+'deg)'
                    // 随机验证码字体大小
                    let size = Math.floor(Math.random()*sizes.length)
                    this.codes[i].size = sizes[size]+'px'
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
    .loginIn {
        min-height: 100vh;
        position: relative;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;

    .left {
        position: absolute;
        left: 0;
        top: 0;
        width: 460px;
        height: 100%;

    .login-form {
        width: 100%;
        right: inherit;
        padding: 0 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .title-container {
        text-align: center;
        font-size: 24px;

    .title {
        margin: 20px 0;
    }
    }

    .el-form-item {
        position: relative;

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: #889aa4;
        vertical-align: middle;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        padding: 0;
        line-height: 40px;
        width: 30px;
        text-align: center;
    }

    // .el-input {
    //     display: inline-block;
    //     height: 40px;
    //     width: 100%;

    //     & /deep/ input {
    //       border: 0px;
    //       -webkit-appearance: none;
    //       padding: 0 15px 0 30px;
    //       color: #fff;
    //       height: 40px;
    //     }
    // }

    }


    }

    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 480px;
        transform: translate3d(-50%,-50%,0);
        height: 320px;
        border-radius: 8px;
        padding: 10px 0 0 0;
    }
    

    .right {
        position: absolute;
        left: inherit;
        right: 0;
        top: 0;
        width: 360px;
        height: 100%;
    }

    .code {
    .el-form-item__content {
        position: relative;

    .getCodeBt {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 40px;
        width: 100px;
        // background-color: rgba(51,51,51,0.4);
        color: #fff;
        text-align: center;
        border-radius: 0 4px 4px 0;
        height: 50px;
        overflow: hidden;
        display: inline-block;

    span {
        padding: 0 5px;
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
    }
    }

    .el-input {
    & /deep/ input {
          padding: 0 130px 0 30px;
      }
    }
    }
    }

    .setting {
    & /deep/ .el-form-item__content {
          padding: 0 15px;
          box-sizing: border-box;
          line-height: 50px;
          height: 50px;
          font-size: 14px;
          color: #999;
          margin: 0 !important;

   

    .reset {
        float: right;
        width: 50%;
        text-align: right;
    }
    }
    }

    .style2 {
        padding-left: 30px;

    .svg-container {
        left: -30px !important;
    }

    .el-input {
    & /deep/ input {
          padding: 0 15px !important;
      }
    }
    }

    .code.style2, .code.style3 {
    .el-input {
    & /deep/ input {
          padding: 0 115px 0 15px;
      }
    }
    }

    .style3 {
    & /deep/ .el-form-item__label {
          padding-right: 6px;
      }

    .el-input {
    & /deep/ input {
          padding: 0 15px !important;
          
      }
    }
    }

    .role {
    & /deep/ .el-form-item__label {
          width: 56px !important;
      }

    & /deep/ .el-radio {
          margin-right: 12px;
      }
    }

    }

    .code_box {
        display: flex;
        & /deep/ .el-form-item__content {
          flex:1 !important;
        }
        
    }

    .my_input {
       height: 50px;
       & /deep/ .el-input__inner {
        height: 50px;
        }
    }

    .btn_wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        .register_account {
            color: #999;
            font-weight: 400;
            font-size: 14px;
        }

        .register_text {
            text-align: center;
            cursor: pointer;
            color:#409EFF;
            font-size: 14px;
            height: 50px;
            line-height: 50px;
        }
    }

   
</style>

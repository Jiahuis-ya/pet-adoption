<template>
  <div class="center_password_page">
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="80px"
      label-position="top" 
    >
      <el-form-item label="原密码" prop="password">
        <el-input 
          v-model="ruleForm.password" 
          show-password
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input 
          type="password" 
          v-model="ruleForm.newpassword"
          show-password
          placeholder="请输入6-20位新密码"
         ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="repassword">
        <el-input 
          type="password" 
          v-model="ruleForm.repassword" 
          show-password
          placeholder="请再次输入6-20位新密码"
        ></el-input>
      </el-form-item>

     <el-form-item>
        <p class="password_tip">
          密码必须是6-20个英文字母、数字或符号(除空格)，且字母、数字和标点符号至少包含两种。
        </p>
     </el-form-item>

      <el-form-item>
        <el-button 
          type="primary"
          @click="onUpdateHandler"
         >
          确 定
         </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import { validatePassword } from "@/utils/validate";

  export default {
    name: "center-password",
    data() {

      let passwordRule = (rule, value, callback) => {
        if(!validatePassword(value)) {
            callback(new Error('密码格式错误!'));
          } else {
            callback();
          }
      }
      let repetitionPasswordRule = (rule, value, callback) => {
          if (!value) {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.newpassword) {
              callback(new Error('两次输入密码不一致!'));
          } else if(!validatePassword(value)) {
            callback(new Error('密码格式错误!'));
          } else {
            callback();
          }
      };
      return {
        dialogVisible: false,
        ruleForm: {},
        user: {},
        rules: {
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { required: true, validator: passwordRule, trigger: 'blur' }
          ],
          newpassword: [
            { required: true, message: "新密码不能为空", trigger: "blur" },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { required: true, validator: passwordRule, trigger: 'blur' }
          ],
          repassword: [
            { required: true, message: "确认密码不能为空", trigger: "blur" },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            { required: true, validator: repetitionPasswordRule, trigger: 'blur' }
          ]
        }
      };
    },
    activated() {
      this.ruleForm = {};
      this.$refs['ruleForm'].clearValidate();
    },
    mounted() {
      
      this.$http({
        url: `${this.$storage.get("sessionTable")}/session`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.user = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    methods: {
      onLogout() {
        this.$storage.remove("Token");
        this.$router.replace({ name: "login" });
      },
      // 修改密码
      onUpdateHandler() {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            console.log('success')
            var password = "";
            if (this.user.mima) {
              password = this.user.mima;
            } else if (this.user.password) {
              password = this.user.password;
            }
            // if (this.ruleForm.password != password) {
            //   this.$message.error("原密码错误");
            //   return;
            // }
            if (this.ruleForm.newpassword != this.ruleForm.repassword) {
              this.$message.error("两次密码输入不一致");
              return;
            }
            this.user.password = this.ruleForm.newpassword;
            this.user.mima = this.ruleForm.newpassword;

            const params = new URLSearchParams()
            const data = {
              username: this.$storage.get('adminName'),
              old_pwd: this.ruleForm.password,
              new_pwd: this.ruleForm.newpassword,
              re_pwd: this.ruleForm.repassword,
            }
            for(let key in data){
                params.append(key,data[key]);
            }


            this.$http({
              url: `${this.$storage.get("sessionTable")}/resetPassword`,
              method: "patch",
              params
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "修改密码成功,下次登录系统生效",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
.center_password_page {
  padding-left: 15px;
}
  .password_tip {
    color: #A2ABB6;
    font-size: 14px;
  }
</style>

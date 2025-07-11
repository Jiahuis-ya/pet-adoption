<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="80px"
    >  
     <el-row>
              <el-form-item v-if="flag=='user'"  label='用户姓名' prop="username">
                  <el-input v-model="ruleForm.username"  placeholder='用户姓名' clearable></el-input>
              </el-form-item>

              <el-form-item v-if="flag=='user'"  label='身份证号' prop="idCardNumber">
                  <el-input v-model="ruleForm.idCardNumber"  placeholder='身份证号' clearable></el-input>
              </el-form-item>

              <el-form-item label='手机号' prop="phone">
                  <el-input v-model="ruleForm.phone"  placeholder='手机号' clearable></el-input>
              </el-form-item>

              <el-form-item v-if="flag=='user'"  label='个人地址' prop="address">
                  <el-input v-model="ruleForm.address"  placeholder='个人地址' clearable></el-input>
              </el-form-item>

            <el-form-item label='照片' prop="photo">
                <file-upload
                    tip="点击上传照片"
                    action="file/upload"
                    :limit="1"
                    :multiple="true"
                    :fileUrls="ruleForm.photo?ruleForm.photo:''"
                    @change="photoUploadChange"
                ></file-upload>
            </el-form-item>
         <el-form-item v-if="flag=='users'" label="用户名" prop="username">
             <el-input v-model="ruleForm.username"
                       placeholder="用户名"></el-input>
         </el-form-item>
             <el-form-item v-if="flag!='users'"  label="性别" prop="sexTypes">
                 <el-select v-model="ruleForm.sexTypes" placeholder="请选择性别">
                     <el-option
                             v-for="(item,index) in sexTypesOptions"
                             v-bind:key="item.codeIndex"
                             :label="item.indexName"
                             :value="item.codeIndex">
                     </el-option>
                 </el-select>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="onUpdateHandler">更新</el-button>
             </el-form-item>
     </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  name: "center-message",
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
      sexTypesOptions : [],
    };
  },
  mounted() {
    //获取当前登录用户的信息
    var table = this.$storage.get("sessionTable");
    this.sessionTable = this.$storage.get("sessionTable");
    this.role = this.$storage.get("role");
    if (this.role != "管理员"){
    }

    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
      this.$http({
          url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
          method: "get"
      }).then(({ data }) => {
          if (data && data.code === 0) {
          this.sexTypesOptions = data.data.list;
      } else {
          this.$message.error(data.msg);
      }
  });

  },
  methods: {
    photoUploadChange(fileUrls){
          this.ruleForm.photo = fileUrls;
          this.addEditUploadStyleChange()
      },


    onUpdateHandler() {
      if((!this.ruleForm.username)&& 'user'==this.flag){
          this.$message.error('用户姓名不能为空');
          return
      }

      if((!this.ruleForm.idCardNumber)&& 'user' == this.flag){
          this.$message.error('身份证号不能为空');
          return
      }

          if( 'user' == this.flag && this.ruleForm.phone && (!isMobile(this.ruleForm.phone))){
              this.$message.error(`手机应输入手机格式`);
              return
          }
      if((!this.ruleForm.address)&& 'user'==this.flag){
          this.$message.error('个人地址不能为空');
          return
      }

      if((!this.ruleForm.photo) && 'user' == this.flag){
          this.$message.error('照片不能为空');
          return
      }

        if((!this.ruleForm.sexTypes)&& this.flag !='users'){
            this.$message.error('性别不能为空');
            return
        }
      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
        this.$message.error(`用户名不能为空`);
        return	
      }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$store.commit('global/setUserInfo', { userImg: this.ruleForm.photo });
          this.$message({
            message: "修改信息成功",
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
  }
};
</script>
<style lang="scss" scoped>
</style>

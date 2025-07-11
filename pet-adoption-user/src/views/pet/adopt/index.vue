<template>
  <div class="wrapper">
    <div class="back">
      <span @click="back" class="iconfont">&#xe607;</span>
      <span @click="back">返回</span>
    </div>
    <PetDetail :dataInfo="petInfo" />
    <div class="divider_box">
      <el-divider
        content-position="center"
        class="divider"
      >
      <div class="title_box">
        <span class="divider_title">提交领养申请</span>
      </div>
        
      </el-divider>
    </div>
    

      <el-form
        class="el_form"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
      >
          
          <el-form-item label="领养理由" prop="reason">
              <el-input
                  type="textarea" 
                  :autosize="{ minRows: 5}"
                  v-model="ruleForm.reason" 
                  placeholder="领养理由"
              ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="default" @click="back">取消</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
import PetDetail from "./pet-detail";

export default {
  name: "pet-index",
  components: {
    PetDetail
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      dataListLoading: false,
      petList: [],
      petTypesSelectSearch: [],
      adoptStatusSelectSearch: [],
      adoptId: '',
      petInfo: {},
      userInfo: {},
      ruleForm: {
          adoptId: '',
          userId: '',
          reason: '',
      },
      rules: {
        reason: [
          { required: true, message: '领养理由不能为空', trigger: 'blur' },
        ],
      },
    };
  }, 
   mounted() {

  },
 
  created() {
    this.init();

  },
  
  methods: {
    
    init() {
        // 获取用户信息
        this.$http({
            url:`${this.$storage.get("sessionTable")}/session`,
            method: "get"
        }).then(({ data }) => {
          if(data.code === 401) {
            this.$router.push({
              
              name: "login",
              query: {
                redirect: this.$route.path
              }
    
            })
          }
            if (data && data.code === 0) {
                this.userInfo = data.data;
            } else {
                this.$message.error(data.msg);
            }
        });

      this.adoptId = this.$route.params.id;
      
      this.$http({
          url: `adopt/info/${this.adoptId}`,
          method: 'get'
      }).then(({ data }) => {
          if (data && data.code === 0) {
              this.petInfo = data.data;
          } else {
              this.$message.error(data.msg);
          }
      });
    },

    // 返回
    back() {
      this.$router.go(-1);
    },
    // 提交
    onSubmit() {
        this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              const params = {
                adoptId: this.adoptId,
                userId: this.userInfo.id,
                reason: this.ruleForm.reason,
              }
                this.$http({
                    url:`adoptApproval/save`,
                    method: "post",
                    data: params
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
 
  }
};
</script>
<style lang="scss" scoped>

.divider_box {
  display: flex;
  justify-content: center;
  width: 100%;
}
  .back {
    display: inline-block;
    color: #409EFF;
    text-align: left;
    span {
      cursor: pointer;
    }
    .iconfont {
      margin-right: 5px;
    }
  }


.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;

}
.divider {
  width: 90%;
}

.el_form {
  width: 90%;
  margin-top: 12px;
}
</style>

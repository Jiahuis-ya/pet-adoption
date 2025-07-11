<template>
    <div class="addEdit-block">
        <el-form
            class="detail-form-content"
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
        >
            <el-row>
                <input id="updateId" name="id" type="hidden">
                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="知识标题" 
                        prop="knowledgeId"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.knowledgeTitle }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.knowledgeId" 
                            filterable 
                            placeholder="请选择知识标题" 
                            @change="knowledgeChange"
                        >
                            <el-option
                                v-for="(item) in knowledgeOptions"
                                v-bind:key="item.id"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                   </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="知识类型"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.knowledgeValue }}
                        </span>
                       <el-input 
                            v-else
                            v-model="infoView.knowledgeValue"
                            clearable  
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="赞"
                    >
                         <span v-if="this.type == 'info'">
                            {{ infoView.likeCount }}
                        </span>
                       <el-input 
                            v-else
                            v-model="infoView.likeCount"
                            type="number"
                            :min="0"
                            :max="999"
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="踩"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.dislikeCount }}
                        </span>
                       <el-input 
                            v-else
                            v-model="infoView.dislikeCount"
                            type="number"
                            :min="0"
                            :max="999"
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        class="input" 
                        label="收藏"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.collectCount }}
                        </span>
                       <el-input  
                            v-else
                            v-model="infoView.collectCount"
                            type="number"
                            :min="0"
                            :max="999"
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>
                <el-col :span="24">
                    <div>
                        <el-form-item
                            label="知识封面" 
                        >
                        <template v-if="infoView.knowledgePhoto">
                            <img 
                                style="margin-right:20px;" 
                                v-bind:key="index" 
                                v-for="(item,index) in (infoView.knowledgePhoto || '').split(',')" 
                                :src="item" width="100" 
                                height="100"
                            >
                        </template>
                            
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="24">
                    <div>
                        <el-form-item 
                            label="知识内容" 
                        >
                            <span v-html="infoView.knowledgeContent"></span>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="用户" 
                        prop="userId"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.username }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.userId" 
                            filterable 
                            placeholder="请选择用户" 
                            @change="userChange"
                            :disabled="type == 'info'"
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

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="身份证"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.userIdCardNumber }}
                        </span>
                       <el-input 
                            v-else
                            v-model="infoView.userIdCardNumber"
                            clearable  
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="手机号"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.userPhone }}
                        </span>
                       <el-input 
                            v-else
                            v-model="infoView.userPhone"
                            clearable  
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="用户地址"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.userAddress }}
                        </span>
                       <el-input
                            v-else
                            v-model="infoView.userAddress"
                            clearable  
                            readonly
                        ></el-input>
                   </el-form-item>
                </el-col>

                <el-col :span="24">
                    <div>
                        <el-form-item
                            label="照片"
                        >
                        <template v-if="infoView.userPhoto">
                            <img
                                style="margin-right:20px;" 
                                v-bind:key="index" 
                                v-for="(item,index) in (infoView.userPhoto || '').split(',')" 
                                :src="item" width="100" 
                                height="100"
                            >
                        </template>
                            
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="12">
                    <el-form-item
                        class="input" 
                        label="互动类型" 
                        prop="knowledgeInteractionsTypes"
                    >
                        <span v-if="this.type == 'info'">
                            {{ infoView.knowledgeInteractionsValue }}
                        </span>
                        <el-select
                            v-else
                            v-model="ruleForm.knowledgeInteractionsTypes" 
                            filterable 
                            placeholder="请选择互动类型"
                            :disabled="type == 'info'"
                        >
                            <el-option
                                    v-for="(item, index) in knowledgeInteractionsTypesOptions"
                                    v-bind:key="index"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                            </el-option>
                        </el-select>
                       
                   </el-form-item>
                   
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
                id: '',
                type: '',
                formVal:{
                    
                },
                ruleForm: {
                   
                },
                rules: {
                    knowledgeId: [
                        { required: true, message: '请选择知识', trigger: 'blur' },
                    ],
                    userId: [
                        { required: true, message: '请选择用户', trigger: 'blur' },
                    ]
                },
                knowledgeOptions: [],
                currentKnowledge: {},
                userOptions: [],
                currentUser: {},
                knowledgeInteractionsTypesOptions: [],
                infoView: {},
                originData: {},
            };
        },
        computed: {
        },
        created() {
            this.init();
            this.ruleForm.shenqingriqi = this.getCurDate();
            
            // 知识 下拉框选项
            this.$http({
                url: `knowledge/page?page=1&limit=100`,
                method: "get"
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.knowledgeOptions = data.data.list;
                }
            });

            // 用户 下拉框选项
            this.$http({
                url: `user/page?page=1&limit=100`,
                method: "get"
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.userOptions = data.data.list;
                }
            });
            
            // 知识互动类型 下拉框选项
            this.$http({
                    url: "dictionary/page?dicCode=knowledge_interactions_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.knowledgeInteractionsTypesOptions = data.data.list;
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
              
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `knowledgeInteractions/info/${id}`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.ruleForm = data.data;
                    this.infoView = data.data;
                    this.originData = {
                        knowledgeId: data.data.knowledgeId,
                        userId: data.data.userId,
                        knowledgeInteractionsTypes: data.data.knowledgeInteractionsTypes,
                    }
                    //解决前台上传图片后台不显示的问题
                    let reg=new RegExp('../../../upload','g')//g代表全部


                    // this.$http({
                    //     url: `knowledgeInteractions/interactionsCount/${data.data.knowledgeId}`,
                    //     method: "get"
                    // }).then(({data}) => {
                    //     console.log("interactionsCount", data)
                    // })
                    
                } else {
                    this.$message.error(data.msg);
                }
                });
            },
            // 提交
            onSubmit() {
                if(
                    this.originData.knowledgeId === this.ruleForm.knowledgeId &&
                    this.originData.userId === this.ruleForm.userId &&
                    this.originData.knowledgeInteractionsTypes === this.ruleForm.knowledgeInteractionsTypes
                ){
                    this.$message.error('请勿重复提交');
                    return
                }


                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url: `knowledgeInteractions/${!this.ruleForm.id ? "save" : "update"}`,
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
            // 返回
            back() {
                this.$router.go(-1);
            },

            knowledgeChange(index) {
                this.currentKnowledge = this.knowledgeOptions.find(item => item.id === index) || {};

                this.infoView = {
                    ...this.infoView,
                    knowledgeValue: this.currentKnowledge?.knowledgeValue,
                    likeCount: this.currentKnowledge?.likeCount,
                    dislikeCount: this.currentKnowledge?.dislikeCount,
                    collectCount: this.currentKnowledge?.collectCount,
                    knowledgePhoto: this.currentKnowledge?.photo,
                    knowledgeContent: this.currentKnowledge?.content,
                }
            },

            userChange(index) {
                this.currentUser = this.userOptions.find(item => item.id === index) || {};
            
                this.infoView = {
                    ...this.infoView,
                    username: this.currentUser?.username,
                    userIdCardNumber: this.currentUser?.idCardNumber,
                    userPhone: this.currentUser?.phone,
                    userAddress: this.currentUser?.address,
                    userPhoto: this.currentUser?.photo,
                }
            }
           
        }
    };
</script>

<style lang="scss">

    
</style>


<template>
    <div class="main-content">
        <el-dialog title="审核" :visible.sync="adoptStatusTypesVisible">
            <el-form 
            :model="ruleForm"
            ref="formRef"
            :rules="rules"
            >
                <input type="hidden" v-model="ruleForm.id">
                <el-form-item label="审核" prop="approvalStatusTypes">
                    <el-select 
                        v-model="ruleForm.approvalStatusTypes" 
                        placeholder="请选择审核类型"
                    >
                        <el-option label="通过" value="2"></el-option>
                        <el-option label="拒绝" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adoptStatusTypesVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleApprove">提 交</el-button>
            </div>
        </el-dialog>
        <div>
            <el-form 
                :inline="true" 
                :model="searchForm" 
                class="form-content" 
                ref="searchFormRef" 
            >
                <el-row 
                    :gutter="20" 
                    class="slt" 
                    :style="{justifyContent: 'flex-start'}"
                >
                     <el-form-item label="宠物名称" prop="petName" class="form_item">
                         <el-input v-model="searchForm.petName" placeholder="请输入" clearable></el-input>
                     </el-form-item>
         
                     <el-form-item label="宠物类型" prop="petTypes" class="form_item">
                        <el-select
                            v-model="searchForm.petTypes"
                            placeholder="请选择类型"
                            clearable
                        >
                            <el-option
                               v-for="(item,index) in petTypesSelectSearch"
                               v-bind:key="index"
                               :label="item.indexName"
                               :value="item.codeIndex">
                            </el-option>
                        </el-select>
                     </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="search()">
                            搜索
                        </el-button>
                        <el-button @click="resetForm('searchFormRef')">重置</el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <router-link :to="'/adoption/approval/detail/'+ 0 + '/add'">
                            <el-button
                                v-if="isAuth('adoption/approval','新增')"
                                type="success"
                                icon="el-icon-plus"
                                style="margin-right: 20px;"
                            >
                            新增
                            </el-button>
                        </router-link>
                        <el-button
                                v-if="isAuth('adoption/approval','删除')"
                                :disabled="dataListSelections.length <= 0"
                                type="danger"
                                icon="el-icon-delete"
                                @click="deleteHandler()"
                        >删除</el-button>
                        
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="table-content">
                <el-table
                    :data="dataList"
                    v-loading="dataListLoading"
                    @selection-change="selectionChangeHandler"
                >
                    <el-table-column
                        v-if="isAuth('adoption/approval','删除')"
                        type="selection"
                        header-align="center"
                        align="center"
                        width="50"
                    >
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="50" />

                    <el-table-column
                        align="center"
                        sortable
                        prop="petName"
                        label="宠物名称"
                    >
                        <template slot-scope="scope">
                            {{scope.row.petName}}
                        </template>
                    </el-table-column>
                    <el-table-column 
                        align="center"
                        width="200"
                        label="宠物图片"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.petPhoto">
                                <img 
                                    :src="scope.row.petPhoto" 
                                    width="100" 
                                    height="100"
                                >
                            </div>
                            <div v-else>无图片</div>
                        </template>
                    </el-table-column>


                    <el-table-column
                        align="center"
                        sortable
                        prop="username"
                        label="用户姓名"
                    >
                        <template slot-scope="scope">
                            {{scope.row.username}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="userPhone"
                        label="手机号"
                    >
                        <template slot-scope="scope">
                            {{scope.row.userPhone}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="userAddress"
                        label="用户地址"
                    >
                        <template slot-scope="scope">
                            {{scope.row.userAddress}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="reason"
                        label="领养理由"
                    >
                        <template slot-scope="scope">
                            
                            <div v-html="scope.row.reason"></div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="adoptStatusValue"
                        label="申请状态"
                    >
                        <template slot-scope="scope">
                            <el-tag 
                                type="danger" 
                                v-if="scope.row.approvalStatusValue === '拒绝'"
                            >拒绝</el-tag>
                            <el-tag 
                                type="success" 
                                v-else-if="scope.row.approvalStatusValue === '通过'"
                            >通过</el-tag>
                            <el-tag
                                v-else
                            >{{ scope.row.approvalStatusValue }}</el-tag>
                        </template>
                    </el-table-column>


                    <el-table-column 
                        width="150" 
                        align="center"
                        label="操作"
                        fixed="right"
                    >
                        <template slot-scope="scope">

                            <router-link
                                :to="{
                                    path: '/adoption/approval/detail/' + scope.row.id + '/info',
                                }"
                            >
                                <el-button 
                                    v-if="isAuth('adoption/approval','查看')"
                                    type="text"
                                >
                                    详情
                                </el-button>
                            </router-link>
                            

                            <el-button 
                                v-if="isAuth('adoption/approval','删除')" 
                                type="text"
                                style="margin-left: 10px; color: #f00;"
                                @click="deleteHandler(scope.row.id)"
                            >
                                删除
                            </el-button>

                                <el-button 
                                    v-if="isAuth('adoption/approval','审核') 
                                        && scope.row.approvalStatusTypes === 1"
                                    type="text"
                                    style="margin-left: 10px;"
                                     @click="openYesnoTypes(scope.row.id, scope.row.adoptId)"
                                >
                                审核
                                </el-button>
                            
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage"
                    background
                >
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchForm: {
                    key: ""
                },
                sessionTable : "",//登录账户所在表名
                role : "",//权限
                petTypesSelectSearch : [],
                ruleForm:{
                    id : null,
                    adoptId : null,
                    userId : null,
                    reason : null,
                    approvalStatusTypes : null,
                    createTime : null,
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                adoptStatusTypesVisible : false,
                rules: {
                    adoptStatusTypes: [
                        { required: true, message: '选择不能为空', trigger: 'blur' },
                    ],
                }
            };
        },
        created() {
            this.getDataList();
        },
        mounted() {
            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");

        },
        computed: {
        },
        methods: {
            resetForm(formName) {
                // this.$refs[formName].resetFields();
                this.searchForm = {
                    key: ""
                };
            },
           
            search() {
                this.pageIndex = 1;
                this.getDataList();
            },
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                let params = {
                    page: this.pageIndex,
                    limit: this.pageSize,
                    sort: 'id',
                }

                                         
                if (this.searchForm.petName!= '' && this.searchForm.petName!= undefined) {
                    params['petName'] = '%' + this.searchForm.petName + '%'
                }
                     
                if (this.searchForm.petTypes!= '' && this.searchForm.petTypes!= undefined) {
                    params['petTypes'] = this.searchForm.petTypes
                }
                                                                                                                         
                if (this.searchForm.username!= '' && this.searchForm.username!= undefined) {
                    params['username'] = '%' + this.searchForm.username + '%'
                }
                                                                                                                                                    
                params['adoptApprovalDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


                this.$http({
                    url: "adoptApproval/page",
                    method: "get",
                    params: params
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.dataList = data.data.list;
                        this.totalPage = data.data.total;
                    }else{
                        this.dataList = [];
                        this.totalPage = 0;
                    }
                    this.dataListLoading = false;
                });

                //查询级联表搜索条件所有列表
                this.$http({
                    url: "dictionary/page?dicCode=pet_types&page=1&limit=100",
                    method: "get",
                    page: 1,
                    limit: 100,
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.petTypesSelectSearch = data.data.list;
                    }
                });
                //查询当前表搜索条件所有列表
            },
            //每页数
            sizeChangeHandle(val) {
                this.pageSize = val;
                this.pageIndex = 1;
                this.getDataList();
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val;
                this.getDataList();
            },
            // 多选
            selectionChangeHandler(val) {
                this.dataListSelections = val;
            },
            
            // 删除
            deleteHandler(id) {
                var ids = id ? [Number(id)] : this.dataListSelections.map(item => {
                    return Number(item.id);
                });

                this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: "adoptApproval/delete",
                        method: "post",
                        data: ids
                    }).then(({data}) => {
                        if(data && data.code === 0){
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.search();
                                }
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                });
            },

            openYesnoTypes(approveId, adoptId) {
                let _this = this;
                _this.ruleForm.id = approveId;
				_this.ruleForm.adoptId= adoptId;

                this.$http({
                    url: `adoptApproval/approvalBtnIfShow`,
                    method: 'get',
                    params: {
                        adoptId
                    }
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        const res = data.data;
                        if(!res) {
                            this.$message.error("该宠物已领养");
                        } else{
                          _this.adoptStatusTypesVisible = true;  
                        }
                    } 
                });

                
            },

            handleApprove() {
                if(!this.ruleForm.approvalStatusTypes){
                    this.$message.warning("审核类型不能为空");
				    return;
                }
                    this.$http({
                        url:`adoptApproval/update`,
                        method: "post",
                        data: this.ruleForm
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: "审核成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.adoptStatusTypesVisible = false;
                                    this.search();
                                }
                            });
                        } else {
                            this.$message.error(data.msg);
                            this.adoptStatusTypes = undefined;
                        }
                    });
            },
        }
    };
</script>
<style lang="scss" scoped>
    .form-content {
        padding: 20px 0 0 20px;
    }

    .table-content {
        ::v-deep {
            .el-pagination {
                padding: 32px 16px;
            }
        }
    }

    .form_item{
        margin-right: 24px!important;
    }
    
</style>



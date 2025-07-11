<template>
    <div class="main-content">
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
                     <el-form-item label="用户名" prop="username" class="form_item">
                         <el-input v-model="searchForm.username" placeholder="请输入" clearable></el-input>
                     </el-form-item>

                     <el-form-item label="手机号" prop="userPhone" class="form_item">
                         <el-input v-model="searchForm.userPhone" placeholder="请输入" clearable></el-input>
                     </el-form-item>
         
                     <el-form-item label="反馈类型" prop="feedbackTypes" class="form_item">
                        <el-select
                            v-model="searchForm.feedbackTypes"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                               v-for="(item,index) in feedbackTypesSelectSearch"
                               v-bind:key="index"
                               :label="item.indexName"
                               :value="item.codeIndex">
                            </el-option>
                        </el-select>
                     </el-form-item>

                                
                    <el-form-item label="账号问题类型" prop="feedbackQuestionTypes" class="form_item">
                        <el-select
                            v-model="searchForm.feedbackQuestionTypes"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                               v-for="(item,index) in feedbackQuestionTypesSelectSearch"
                               v-bind:key="index"
                               :label="item.indexName"
                               :value="item.codeIndex">
                            </el-option>
                        </el-select>
                     </el-form-item>

                    <el-form-item style="float: right;margin-right: 30px;">
                        <el-button type="primary" @click="search()">
                            搜索
                        </el-button>
                        <el-button @click="resetForm('searchFormRef')">重置</el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <router-link :to="'/feedback/add'">
                            <el-button
                                v-if="isAuth('feedback/list','新增')"
                                type="success"
                                icon="el-icon-plus"
                                style="margin-right: 20px;"
                            >
                            新增
                            </el-button>
                        </router-link>
                        <el-button
                                v-if="isAuth('feedback/list','删除')"
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
                        v-if="isAuth('feedback/list','删除')"
                        type="selection"
                        header-align="center"
                        align="center"
                        width="50"
                    >
                    </el-table-column>
                    <!-- <el-table-column label="序号" type="index" width="50" /> -->
                    <el-table-column
                        align="center"
                        sortable
                        prop="originalRecordId"
                        label="反馈编号"
                    >
                        <template slot-scope="scope">
                            {{scope.row.originalRecordId}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="username"
                        label="用户名"
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
                        prop="feedbackValue"
                        label="反馈类型"
                    >
                        <template slot-scope="scope">
                            {{scope.row.feedbackValue}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        sortable
                        prop="feedbackQuestionValue"
                        label="账号问题类型"
                    >
                        <template slot-scope="scope">
                            {{scope.row.feedbackQuestionValue}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="adviceTitle"
                        label="建议标题"
                    >
                        <template slot-scope="scope">
                            {{scope.row.adviceTitle}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="feedbackContent"
                        label="描述"
                        width="200"
                    >
                        <template slot-scope="scope">
                            <div class="clamp_lines">
                                {{scope.row.feedbackContent}}
                            </div>
                        </template>
                    </el-table-column>
                    
                   
                    <el-table-column
                        align="center"
                        sortable
                        prop="createTime"
                        label="反馈时间"
                    >
                        <template slot-scope="scope">
                            {{scope.row.createTime}}
                        </template>
                    </el-table-column>


                    <el-table-column 
                        width="140" 
                        align="center"
                        label="操作"
                        fixed="right"
                    >
                        <template slot-scope="scope">

                            <!-- <router-link :to="'/feedback/detail/' + scope.row.originalRecordId + `/${scope.row.userId}` +  '/info'">
                                <el-button 
                                    v-if="isAuth('feedback/list','查看')"
                                    type="text"
                                >
                                    详情
                                </el-button>
                            </router-link> -->
                            <router-link :to="'/feedback/detail/' + scope.row.originalRecordId + `/${scope.row.userId}` + '/else'">
                                <el-button 
                                    v-if="isAuth('feedback/list','修改')"
                                    type="text"
                                    style="margin-left: 10px;"
                                >
                                查看
                                </el-button>
                            </router-link>

                            <el-button 
                                v-if="isAuth('feedback/list','删除')" 
                                type="text"
                                style="margin-left: 10px; color: #f00;"
                                @click="deleteHandler(scope.row.originalRecordId)"
                            >
                                删除
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
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->



      

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
            feedbackTypesSelectSearch : [],
            feedbackQuestionTypes : [],
            feedbackQuestionTypesSelectSearch: [],
            form:{
                id : null,
                title : null,
                feedbackTypes : null,
                photo : null,
                content : null,
                createTime : null,
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 5,
            totalPage: 0,
            dataListLoading: false,
            dataListSelections: [],
           

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

                 
                if (this.searchForm.username!= '' && this.searchForm.username!= undefined) {
                    params['username'] = '%' + this.searchForm.username + '%'
                }

                 
                if (this.searchForm.userPhone!= '' && this.searchForm.userPhone!= undefined) {
                    params['userPhone'] = '%' + this.searchForm.userPhone + '%'
                }

                if (this.searchForm.feedbackTypes!= '' && this.searchForm.feedbackTypes!= undefined) {
                    params['feedbackTypes'] = this.searchForm.feedbackTypes
                }
         
                if (this.searchForm.feedbackQuestionTypes!= '' && this.searchForm.feedbackQuestionTypes!= undefined) {
                    params['feedbackQuestionTypes'] = this.searchForm.feedbackQuestionTypes
                }
                                
                params['feedbackDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


                this.$http({
                    url: "feedback/page",
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

               
                this.$http({
                    url: "dictionary/page?dicCode=feedback_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.feedbackTypesSelectSearch = data.data.list;
                    }
                });

                this.$http({
                    url: "dictionary/page?dicCode=feedback_question_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.feedbackQuestionTypesSelectSearch = data.data.list;
                    }
                });


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
                var ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.originalRecordId;
                });

                this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: "feedback/delete",
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
        }
    };
</script>
<style lang="scss" scoped>
    .form-content {
        padding: 20px 0 0 20px;

        // & /deep/ el-select {
        //     & /deep/ el-select--medium {
        //         width: 150px;
        //     }
            
        // }

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

    .clamp_lines {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal; /* 或者使用 'nowrap' 根据你的需求调整 */
    }



</style>



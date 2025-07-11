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
                     <el-form-item label="宠物类型名称" prop="indexNameSearch" class="form_item">
                         <el-input v-model="searchForm.indexNameSearch" placeholder="请输入" clearable></el-input>
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
                        <router-link :to="'/adoption/petType/detail/'+ 0 + '/add'">
                            <el-button
                                v-if="isAuth('adoption/list','新增')"
                                type="success"
                                icon="el-icon-plus"
                                style="margin-right: 20px;"
                            >
                            新增
                            </el-button>
                        </router-link>
                        <el-button
                                v-if="isAuth('adoption/list','删除')"
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
                    v-if="isAuth('adoption/list','查看')"
                    :data="dataList"
                    v-loading="dataListLoading"
                    @selection-change="selectionChangeHandler"
                >
                    <el-table-column
                        v-if="isAuth('adoption/petType','删除')"
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
                        prop="codeIndex"
                        label="宠物类型编码"
                    >
                        <template slot-scope="scope">
                            {{scope.row.codeIndex}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        sortable
                        prop="indexName"
                        label="宠物类型名称"
                    >
                        <template slot-scope="scope">
                            {{scope.row.indexName}}
                        </template>
                    </el-table-column>
                   
                    <el-table-column 
                        width="300" 
                        align="center"
                        label="操作"
                        fixed="right"
                    >
                        <template slot-scope="scope">

                            <router-link :to="'/adoption/petType/detail/'+scope.row.id + '/info'">
                                <el-button 
                                    v-if="isAuth('adoption/list','查看')"
                                    type="text"
                                >
                                    详情
                                </el-button>
                            </router-link>
                            <router-link :to="'/adoption/petType/detail/'+scope.row.id + '/else'">
                                <el-button 
                                    v-if="isAuth('adoption/list','修改')"
                                    type="text"
                                    style="margin-left: 10px;"
                                >
                                修改
                                </el-button>
                            </router-link>

                            <el-button 
                                v-if="isAuth('adoption/list','删除')" 
                                type="text"
                                style="margin-left: 10px; color: #f00;"
                                @click="deleteHandler(scope.row.id)"
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
                petTypesSelectSearch : [],
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
                if(this.searchForm.indexNameSearch!='' && this.searchForm.indexNameSearch!=undefined){
                    params['indexName'] = this.searchForm.indexNameSearch
                }
                //本表的
                params['dicCode'] = "pet_types"//编码名字
                params['dicName'] = "宠物类型名称",//汉字名字
                this.$http({
                    url: "dictionary/page",
                    method: "get",
                    params: params
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.dataList = data.data.list;
                    this.totalPage = data.data.total;
                } else {
                    this.dataList = [];
                    this.totalPage = 0;
                }
                this.dataListLoading = false;
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
                var ids = id
                        ? [Number(id)]
                        : this.dataListSelections.map(item => {
                    return Number(item.id);
            });
                this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                    url: "dictionary/delete",
                    method: "post",
                    data: ids
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: "操作成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        this.search();
                }
                });
                } else {
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



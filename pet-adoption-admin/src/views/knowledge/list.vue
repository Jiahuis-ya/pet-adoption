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
                     <el-form-item label="知识标题" prop="title" class="form_item">
                         <el-input v-model="searchForm.title" placeholder="请输入" clearable></el-input>
                     </el-form-item>
         
                     <el-form-item label="知识类型" prop="knowledgeTypes" class="form_item">
                        <el-select
                            v-model="searchForm.knowledgeTypes"
                            placeholder="请选择知识类型"
                            clearable
                        >
                            <el-option
                               v-for="(item,index) in knowledgeTypesOptions"
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
                        <router-link :to="'/knowledge/detail/'+ 0 + '/add'">
                            <el-button
                                v-if="isAuth('knowledge/list','新增')"
                                type="success"
                                icon="el-icon-plus"
                                style="margin-right: 20px;"
                            >
                            新增
                            </el-button>
                        </router-link>
                        <el-button
                                v-if="isAuth('knowledge/list','删除')"
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
                        v-if="isAuth('knowledge/list','删除')"
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
                        prop="title"
                        label="知识标题"
                    >
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        sortable
                        prop="knowledgeTypes"
                        label="知识类型"
                    >
                        <template slot-scope="scope">
                            {{scope.row.knowledgeValue}}
                        </template>
                    </el-table-column>
                    <el-table-column 
                        align="center"
                        width="200"
                        label="知识封面"
                        prop="photo"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.photo">
                                <img 
                                    :src="scope.row.photo" 
                                    width="100" 
                                    height="100"
                                >
                            </div>
                            <div v-else>无图片</div>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column
                        align="center"
                        sortable
                        width="150"
                        prop="content"
                        label="知识内容"
                    >
                        <template slot-scope="scope">
                            <div
                                class="desc clamp_lines"
                                v-html="scope.row.content"
                                style="text-align: left;"
                            ></div>
                        </template>
                    </el-table-column> -->

                    <el-table-column
                        align="center"
                        sortable
                        prop="likeCount"
                        label="赞"
                    >
                        <template slot-scope="scope">
                            {{scope.row.likeCount || 0}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="dislikeCount"
                        label="踩"
                    >
                        <template slot-scope="scope">
                            {{scope.row.dislikeCount || 0}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        sortable
                        prop="collectCount"
                        label="收藏"
                    >
                        <template slot-scope="scope">
                            {{scope.row.collectCount || 0}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column 
                        width="300" 
                        align="center"
                        label="操作"
                        fixed="right"
                    >
                        <template slot-scope="scope">

                            <router-link :to="'/knowledge/detail/'+scope.row.id + '/info'">
                                <el-button 
                                    v-if="isAuth('knowledge/list','查看')"
                                    type="text"
                                >
                                    详情
                                </el-button>
                            </router-link>
                            <router-link :to="'/knowledge/detail/'+scope.row.id + '/else'">
                                <el-button 
                                    v-if="isAuth('knowledge/list','修改')"
                                    type="text"
                                    style="margin-left: 10px;"
                                >
                                修改
                                </el-button>
                            </router-link>

                            <el-button 
                                v-if="isAuth('knowledge/list','删除')" 
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
    //级联表下拉框搜索条件
    //当前表下拉框搜索条件
    knowledgeTypesOptions : [],
            form:{
                id : null,
                title : null,
                knowledgeTypes : null,
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
            sfshVisiable: false,
            shForm: {},
            chartVisiable: false,
            layouts: '',

            echartsDate: new Date(),//echarts的时间查询字段

            //导出excel
            json_fields: {
                //级联表字段
                //本表字段
                     '标题': "title",
                     '知识类型': "knowledgeTypes",
                     '知识图片': "photo",
            },

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

                 
                if (this.searchForm.title!= '' && this.searchForm.title!= undefined) {
                    params['title'] = '%' + this.searchForm.title + '%'
                }
         
                if (this.searchForm.knowledgeTypes!= '' && this.searchForm.knowledgeTypes!= undefined) {
                    params['knowledgeTypes'] = this.searchForm.knowledgeTypes
                }
                                
                params['knowledgeDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


                this.$http({
                    url: "knowledge/page",
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
                //查询当前表搜索条件所有列表
                //填充下拉框选项
                this.$http({
                    url: "dictionary/page?dicCode=knowledge_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.knowledgeTypesOptions = data.data.list;
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
                var ids = id ? [Number(id)] : this.dataListSelections.map(item => {
                    return Number(item.id);
                });

                this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: "knowledge/delete",
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
        /* 设置固定高度或最大高度 */
        max-height: 5em; /* 根据需要调整高度 */
        /* 设置溢出隐藏 */
        overflow: hidden;
        /* 显示文本为块级，并设置换行 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /* 设置显示的行数 */
        -webkit-line-clamp: 3; /* 这里设置为3行，根据需要调整 */
        /* 强制文本在一行内不换行（可选，用于单行文本） */
        /* white-space: nowrap; */
        /* 文本溢出时显示省略号 */
        text-overflow: ellipsis;
        /* 可选：设置字体、颜色等样式 */
        font-size: 14px;
        line-height: 1.5em; /* 确保行高与max-height相匹配，避免最后一行显示不全 */
        // padding: 0.5em; /* 可选：设置内边距 */
//   border: 1px solid #ccc; /* 可选：设置边框 */
    }
    
</style>



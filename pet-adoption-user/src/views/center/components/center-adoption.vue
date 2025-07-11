<template>
	<div class="cener_adoption_wrapper">
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
							<el-form-item label="" prop="petName" class="form_item">
									<el-input v-model="searchForm.petName" placeholder="输入宠物名称" clearable></el-input>
							</el-form-item>
	
							<el-form-item label="" prop="petTypes" class="form_item">
							<el-select
									v-model="searchForm.petTypes"
									placeholder="选择宠物类型"
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
		</el-form>
		<div class="table-content">
				<el-table
						:data="dataList"
						v-loading="dataListLoading"
				>
						<el-table-column
								align="center"
								prop="petName"
								label="宠物名称"
						>
								<template slot-scope="scope">
										{{scope.row.petName}}
								</template>
						</el-table-column>
						<el-table-column 
								align="center"
								label="宠物图片"
						>
							<template slot-scope="scope">
								<div v-if="scope.row.petPhoto">
									<img 
										:src="scope.row.petPhoto" 
										width="50" 
										height="50"
									>
								</div>
								<div v-else>无图片</div>
							</template>
						</el-table-column>


						<el-table-column
								align="center"
								prop="username"
								label="领养人姓名"
						>
								<template slot-scope="scope">
										{{scope.row.username}}
								</template>
						</el-table-column>

						<el-table-column
								align="center"
								prop="userPhone"
								label="电话"
						>
								<template slot-scope="scope">
										{{scope.row.userPhone}}
								</template>
						</el-table-column>

						<el-table-column
								align="center"
								prop="userAddress"
								label="地址"
						>
								<template slot-scope="scope">
										{{scope.row.userAddress}}
								</template>
						</el-table-column>

						<el-table-column
								align="center"
								prop="reason"
								label="领养理由"
						>
								<template slot-scope="scope">
										<div v-html="scope.row.reason"></div>
								</template>
						</el-table-column>

						<el-table-column
								align="center"
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
								align="center"
								label="操作"
						>
						<template slot-scope="scope">
										<el-button type="text" @click="gotoDetail(scope.row.id)">详情</el-button>
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
</template>

<script>


export default {
  name: "center-adoption",
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
			gotoDetail(id) {
				this.$router.push('/pet/adopt/' + id);
			},
      resetForm(formName) {
          this.$refs[formName].resetFields();
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
            
    }
  };
</script>
<style lang="scss" scoped>
 .form-content {
        padding: 20px 0 0 20px;
    }

    .table-content {
        margin-left: 15px;
        padding-right: 15px;
        margin-right: 15px;

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

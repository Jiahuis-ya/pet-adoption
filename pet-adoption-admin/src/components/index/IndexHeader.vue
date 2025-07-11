<template>
	<!-- <el-header>
		<el-menu background-color="#00c292" text-color="#FFFFFF" active-text-color="#FFFFFF" mode="horizontal">
			<div class="fl title">{{this.$project.projectName}}</div>
			<div class="fr logout" style="display:flex;">
				<el-menu-item index="3">
					<div>{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}</div>
				</el-menu-item>
				<el-menu-item @click="onLogout" index="2">
					<div>退出登录</div>
				</el-menu-item>
			</div>
		</el-menu>
	</el-header> -->
	<div class="navbar" 
	:style="{
		backgroundColor: '#fff',
		height:heads.headHeight,
		boxShadow:heads.headBoxShadow,
		lineHeight:heads.headHeight
		}"
		>
		<!-- <div class="title-menu" :style="{
			justifyContent: heads.headTitleStyle=='1' ? 'flex-start' : 'center'
			}">
			<el-image v-if="heads.headTitleImg" class="title-img" :style="{width:heads.headTitleImgWidth,height:heads.headTitleImgHeight,boxShadow:heads.headTitleImgBoxShadow,borderRadius:heads.headTitleImgBorderRadius}" :src="heads.headTitleImgUrl" fit="cover"></el-image>
			<div class="title-name" :style="{color:heads.headFontColor,fontSize:heads.headFontSize}">{{this.$project.projectName}}</div>
		</div> -->
		<bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs>
		
		<div class="right-menu">
			<!-- <el-button type="text" @click="onIndexTap">网站访问</el-button> -->

			<div class="user-info" :style="{color:heads.headUserInfoFontColor,fontSize:heads.headUserInfoFontSize}">
				{{this.$storage.get('role')}} {{this.$storage.get('adminName')}}
				<!-- {{this.$store.state.global.userInfo.role}} {{this.$store.state.global.userInfo.adminName}} -->
				</div>
		
			<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
					<!-- <el-avatar :src="avatarImg"></el-avatar> -->

          <img :src="this.$store.state.global.userInfo ? this.$store.state.global.userInfo.userImg : '@/assets/img/avatar-default.gif'" class="user-avatar">
          <!-- <img :src="this.userImg || '@/assets/img/avatar-default.gif'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="() => handleCommand('/updatePassword')">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
					<el-dropdown-item @click.native="() => handleCommand('/center')">
            <span style="display:block;">个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="onLogout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
			</div>
		</div>
</template>

<script>

	export default {
		data() {
			return {
				dialogVisible: false,
				ruleForm: {},
				user: {},
				heads: {
					"headLogoutFontHoverColor":"#fff",
					"headFontSize":"20px",
					"headUserInfoFontColor":"rgba(162, 171, 182, 1)",
					"headBoxShadow":"",
					"headTitleImgHeight":"44px",
					"headLogoutFontHoverBgColor":"#333",
					"headFontColor":"rgba(162, 171, 182, 1)",
					"headTitleImg":false,
					"headHeight":"50px",
					"headTitleImgBorderRadius":"22px",
					"headTitleImgUrl":"http://codegen.caihongy.cn/20201021/cc7d45d9c8164b58b18351764eba9be1.jpg",
					"headBgColor":"#35404D",
					"headTitleImgBoxShadow":"0 1px 6px #444",
					"headLogoutFontColor":"rgba(162, 171, 182, 1)",
					"headUserInfoFontSize":"16px",
					"headTitleImgWidth":"44px",
					"headTitleStyle":"1",
					"headLogoutFontSize":"16px"
				},
				userImg: "",
				title: "",
			};
		},
		created() {

		},
		mounted() {
			let sessionTable = this.$storage.get("sessionTable")
			this.$http({
				url: sessionTable + '/session',
				method: "get"
			}).then(({
				data
			}) => {
				if (data && data.code === 0) {
					this.user = data.data;
					this.userImg = this.user.photo;
					this.$store.commit('global/setUserInfo', { userImg: this.user.photo })
				} else {
					let message = this.$message;
					message.error(data.msg);
				}
			});
		},
		methods: {
			onLogout() {
				let storage = this.$storage
				let router = this.$router
				storage.clear()
				router.replace({
					name: "login"
				});
			},
				onIndexTap(){
					// console.log('this.$base.indexUrl',this.$base.indexUrl, 222, process.env.SYSTEM_INDEX_URL, process.env.VUE_APP_BASE_API);
					window.open(`${this.$base.indexUrl}`)
			},
			handleCommand(route) {
				this.$router.push(route);
			}
			
		}
	};
</script>


<style lang="scss" scoped>
	.navbar {
		height: 60px;
		line-height: 60px;
		width: calc(100vw - 210px);
		right: -210px;
		padding: 0 34px 0 0;
		box-sizing: border-box;
		background-color: #ff00ff;
		position: relative;
		z-index: 111;
		
		.right-menu {
			position: absolute;
			right: 34px;
			top: 0;
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			z-index: 111;
			
			.user-info {
				font-size: 16px;
				color: red;
				padding: 0 12px;
				margin-right: 45px;
			}
			
		
			
		}
		
		.title-menu {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			height: 100%;
			
			.title-img {
				width: 44px;
				height: 44px;
				border-radius: 22px;
				box-shadow: 0 1px 6px #444;
				margin-right: 16px;
			}
			
			.title-name {
				width: 210px;
				padding-left: 34px;
				background: rgb(42, 53, 66);
				font-size: 24px;
				color: #fff;
				font-weight: 700;
				box-sizing: border-box;
			}
		}
	}
	// .el-header .fr {
	// 	float: right;
	// }

	// .el-header .fl {
	// 	float: left;
	// }

	// .el-header {
	// 	width: 100%;
	// 	color: #333;
	// 	text-align: center;
	// 	line-height: 60px;
	// 	padding: 0;
	// 	z-index: 99;
	// }

	// .logo {
	// 	width: 60px;
	// 	height: 60px;
	// 	margin-left: 70px;
	// }

	// .avator {
	// 	width: 40px;
	// 	height: 40px;
	// 	background: #ffffff;
	// 	border-radius: 50%;
	// }

	// .title {
	// 	color: #ffffff;
	// 	font-size: 20px;
	// 	font-weight: bold;
	// 	margin-left: 20px;
	// }

	.avatar-wrapper {
		position: relative;
	}

	.user-avatar {
		cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    position: absolute;
    right: 16px;
    top: 6px;
	}
</style>

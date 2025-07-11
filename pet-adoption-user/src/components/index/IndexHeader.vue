<template>
	<div class="navbar">
		<!-- <bread-crumbs :title="title" class="bread-crumbs"></bread-crumbs> -->
		<div class="system_name">
			宠物领养平台
		</div>
		<div class="right-menu">
			<index-menu></index-menu>

			<!-- <el-button type="text" @click="onIndexTap">后台系统入口</el-button> -->


			<div class="user-info" :style="{color:heads.headUserInfoFontColor,fontSize:heads.headUserInfoFontSize}">
				{{this.$storage.get('adminName')}}
			</div>
		
			<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
					<!-- <el-avatar :src="avatarImg"></el-avatar> -->

          <img :src="this.$store.state.global.userInfo ? this.$store.state.global.userInfo.userImg : '@/assets/img/avatar-default.gif'" class="user-avatar">
          <!-- <img :src="this.userImg || '@/assets/img/avatar-default.gif'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
					<!-- <el-dropdown-item @click.native="() => handleCommand('/updatePassword')">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
					<el-dropdown-item @click.native="() => handleCommand('/center')">
            <span style="display:block;">个人信息</span>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="onLogout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
			</div>
		</div>
</template>

<script>
import IndexMenu from "./IndexMenu.vue";

	export default {
		components: {
			IndexMenu
		},
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
			};
		},
		created() {

		},
		mounted() {
			let sessionTable = this.$storage.get("sessionTable") || 'user'
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
					// message.error(data.msg);
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
		position: fixed;
		height: 60px;
		line-height: 60px;
		width: 100%;
		padding: 0 34px;
		box-sizing: border-box;
		background-color: #fff;
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

	.system_name {
		font-size: 24px;
		font-weight: bold;
	}
</style>

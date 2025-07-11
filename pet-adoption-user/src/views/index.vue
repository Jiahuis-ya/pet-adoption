<template>
	<el-container class="container" ref="scrollableDiv">
		<index-header></index-header>
		<div class="container_wrapper">
			<index-main></index-main>
		</div>
	</el-container>
</template>
<script>
	import IndexHeader from '@/components/index/IndexHeader'
	import IndexHome from '@/views/home'
	import IndexMain from '@/components/index/IndexMain'

	export default {
		components: {
			IndexHeader,
			IndexMain
		},
		mounted() {
		
		},
		methods: {
			
		},
		
	}
</script>

<style lang="scss" scoped>
	// 铺满全屏
	.container {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.container_wrapper {
		position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
		background: #fff;
		margin-top: 84px;
		margin-bottom: 100px;
	}
</style>

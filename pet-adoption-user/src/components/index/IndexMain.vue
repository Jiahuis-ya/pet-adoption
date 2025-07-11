<template>
	<div class="main-container">
		<transition name="fade-transform" mode="out-in">
			<!-- <keep-alive exclude="classified-goods,all-goods,goods-detail"> -->
				<keep-alive :include="cachedViews">
					<router-view class="router-view"></router-view>
      	</keep-alive>
		</transition>
	</div>
</template>
<script>
	import menu from "@/utils/menu";
	export default {
		data() {
			return {
				menuList: [],
				role: "",
				currentIndex: -2,
				itemMenu: [],
				title: ''
			};
		},
    computed: {
      cachedViews () {
				// console.log("cachedViews", this.$store.state.cachedViews.cachedViews)
        return this.$store.state.cachedViews.cachedViews
      }
    },
		mounted() {
		
			this.role = this.$storage.get("role");
		},
		methods: {
		
		
		}
	};
</script>
<style lang="scss" scoped>
.main-container {
	padding: 20px;
}

</style>

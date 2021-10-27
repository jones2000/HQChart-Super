<template>
	<scroll-view scroll-x="true" class="tab_list" :class="boxClassName"
		style="{backgroundColor: '#fff', color: '#868d9f', fontSize: '30rpx'}">
	  <view class="tab_item" :class="{active:currentIndex === index}" @click="changeTab(index)" v-for="(tab,index) in tabList" :key="tab">
	    {{tab}}
	    <view class="bottomLine"></view>
	  </view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default: []
			},
			currentIndex: {
				type: Number,
				default: 0
			},
			boxClassName: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			changeTab(index) {
				this.$emit('changetab', index)
			}
		}
	}
</script>

<style>
	.tab_list {
	  width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		white-space: nowrap;
		padding-left: 30rpx;
		padding-right: 30rpx;
		touch-action: none;
		box-sizing: border-box;
	}
	.tab_list .tab_item {
	  position: relative;
	  display: inline-block;
	  margin-right: 70rpx;
	}
	.tab_item .bottomLine {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  bottom: 0;
	  width: 20rpx;
		height: 8rpx;
	  background-color: #fff;
		/* background-color: #4275e7;
		box-shadow: 0px 3px 6px 0px 
			rgba(66, 117, 231, 0.71); */
		border-radius: 8rpx;
	}
	
	.tab_item.active {
	  color: #4275e7;
	  /* font-size: 32rpx; */
	}
	
	.tab_item.active .bottomLine{
	  background-color: #4275e7;
		box-shadow: 0 6rpx 12rpx 0 
			rgba(66, 117, 231, 0.71);
	}
	
	/*白色底样式*/
	.tab_list.whiteBg .tab_item{
	  font-size: 26rpx;
	}
	
	.whiteBg .tab_item .bottomLine {
	  width: 40rpx;
	}
	
	.whiteBg .tab_item.active {
	  color: #ff1f32;
	}
	
	.whiteBg .tab_item .bottomLine{
	  background-color: #fff;
	}
	
	.whiteBg .tab_item.active .bottomLine{
	  background-color: #ff1f32;
	}
	
	.tab_list ::-webkit-scrollbar{
	  width: 0;
	  height: 0;
	  color: transparent;
	}
	
	.indexTab .tab_item{
	  margin-right: 50rpx;
	}
</style>

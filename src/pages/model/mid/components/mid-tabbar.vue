<template>
  <su-fixed bottom placeholder bg="bg-white">
    <view class="ui-tabbar-box ss-flex ss-col-center ss-row-right">
      <!-- 待定 -->
      <view class="go-box ss-flex ss-col-center ss-p-r-20">
        <button class="ss-reset-button add-btn ui-Shadow-Main" @tap="showShareModal">
          分享模型
        </button>
        <button class="ss-reset-button go-btn ui-Shadow-Main" @tap="$emit('showCell')">
          使用模型
        </button>
      </view>
    </view>
  </su-fixed>
</template>

<script setup>
/* 底部导航 */
import { showShareModal } from '@yu/hooks/useModal'

// 接收参数
defineEmits(['showCell'])

</script>

<style lang="scss" scoped>
  .ui-tabbar-box {
    display: flex;
    height: 50px;
    background: #fff;
    box-shadow: 0px -6px 10px 0px rgba(51, 51, 51, 0.2);
  }
  .go-box {
    .add-btn {
			width: 214rpx;
			height: 72rpx;
			font-weight: 500;
			font-size: 28rpx;
			border-radius: 40rpx 0 0 40rpx;
			background-color: var(--ui-BG-Main-light);
			color: var(--ui-BG-Main);
		}
		.go-btn {
			width: 214rpx;
			height: 72rpx;
			font-weight: 500;
			font-size: 28rpx;
			border-radius: 0 40rpx 40rpx 0;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: $white;
		}
	}
</style>

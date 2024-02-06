<template>
  <view class="bg-white ss-m-x-20 ss-p-t-20">
    <view class="card-header ss-flex ss-col-center ss-m-b-30 ss-m-l-20">
      <view class="line"></view>
      <view class="title ss-m-l-20 ss-m-r-20">详情</view>
    </view>
    <view class="card-content">
      <mp-html :content="content" />
    </view>
  </view>
</template>

<script setup>
/* 模型详情 */
defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
  .card-header {
    .line {
      width: 6rpx;
      height: 30rpx;
      background: linear-gradient(180deg, var(--ui-BG-Main) 0%, var(--ui-BG-Main-gradient) 100%);
      border-radius: 3rpx;
    }

    .title {
      font-size: 30rpx;
      font-weight: bold;
    }
  }
</style>

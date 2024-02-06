<template>
  <!-- 已调用 + 标题 + 介绍 + 引用链接-->
  <!-- 点击文字跳转详情 点击链接跳转 -->
  <view class="title-card ss-p-y-20 ss-p-x-20">
    <view class="title-text ss-line-2 ss-m-b-12">{{ modelInfo.name }}</view>
    <view class="subtitle-text ss-line-3 ss-m-b-18" @tap="$emit('onClickSubtitle')" >{{ modelInfo.introduction }}</view>
    <view class="ss-flex ss-row-between ss-col-center">
      <button class="paper-text ss-reset-button " @tap="onGoCite">
        <view>来源：</view>
        <view  >{{ modelInfo.paperText }}</view>
      </button>
      <view class="call-count-text">{{ callCountText }}</view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import yu from '@yu'

const props = defineProps({
  modelInfo: {
    type: Object,
    default: () => {}
  }
})
defineEmits(['onClickSubtitle'])
const callCountText = computed(() => yu.$utils.formatNum('已调用', null, props.modelInfo.callCount))
const onGoCite = () => { }
// const onGoCite = () => { yu.$router.go(yu.$url.cdn(props.modelInfo.cite)) }

</script>

<style lang="scss" scoped>
	.title-card {
    .title-text {
      font-size: 30rpx;
      font-weight: bold;
      line-height: 42rpx;
    }
    .subtitle-text {
      font-size: 26rpx;
      font-weight: 400;
      color: $dark-7;
      line-height: 42rpx;
    }
    .paper-text {
      justify-content: start;
      width: 75%;
      line-height: 26rpx;
      font-size: 26rpx;
      font-weight: 500;
      color: $gray-b;
    }
    .call-count-text {
      font-size: 26rpx;
      font-weight: 500;
      color: var(--ui-BG-Main);
    }
  }
</style>

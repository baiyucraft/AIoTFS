<template>
  <view class="model-card ss-flex ss-col-stretch" :style="styles">
    <!-- tag -->
    <view v-if="tagShow" class="tag-box ss-flex ss-row-center">
      <view>置顶</view>
    </view>

    <!-- 图片 -->
    <image class="img-box" :src="yu.$url.cdn(data.picUrl)" mode="aspectFill"></image>
    <view class="ss-flex-1 ss-flex-col ss-row-between ss-p-y-10" >
      <view>
        <view class="model-title ss-line-1">{{ data.name }}</view>
        <view class="model-subtitle ss-m-t-10 ss-line-4">{{data.introduction }}</view>
      </view>

      <view class="ss-flex ss-row-between ss-col-center ss-flex-wrap ss-m-t-8">
        <view class="time-text">{{ createdTimeText }}</view>
        <view class="go-box ss-flex ss-col-center ss-row-center ss-m-r-20" @tap="emits('click')">去使用</view>
      </view>
    </view>

  </view>
</template>

<script setup>
import { computed } from 'vue'
import yu from '@yu'

// 接收参数
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  styles: {
    type: Object,
    default: () => {}
  },
  tagShow: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['click'])

const createdTimeText = computed(() => '创建时间：' + props.data.createTime)
</script>

<style lang="scss" scoped>
.model-card {
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: $white;
  height: 280rpx;
  .tag-box {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 68rpx;
    height: 38rpx;
    background: linear-gradient(90deg, #eb6f52, #ff3000);
    border-radius: 10rpx 0px 10rpx 0px;
    font-size: 24rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 32rpx;
  }
  .time-text {
    font-size: 20rpx;
    color: #c4c4c4;
  }

  .img-box {
    width: 280rpx;
    height: 280rpx;
    margin-right: 20rpx;
  }

  .model-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;
  }
  .model-subtitle {
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
  }

  .go-box {
    z-index: 2;
    width: 120rpx;
    height: 50rpx;
    background: linear-gradient(90deg, var(--ui-BG-Main-gradient), var(--ui-BG-Main));
    border-radius: 25rpx;
    font-size: 24rpx;
    color: #ffffff;
  }
}

</style>

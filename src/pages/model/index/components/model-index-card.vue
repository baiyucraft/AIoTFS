<template>
  <view class="card-box ss-flex ss-col-stretch ss-row-between"
        :style="[{ borderRadius: styles.radius + 'rpx', marginBottom: styles.marginBottom + 'rpx' }]"
  >
    <view class="img-box ss-m-r-24">
      <image class="order-img" :src="yu.$url.cdn(data.image)" mode="aspectFill"></image>
    </view>
    <view class="box-right ss-flex-col ss-row-between">
      <view class="title-text ss-line-2">{{ data.name }}</view>
      <view class="spec-text ss-m-t-8 ss-m-b-12 ss-line-3">{{ data.introduction }}</view>
      <view class="author-text ss-flex ss-col-center">{{ authorText }}</view>
    </view>
  </view>
</template>

<script setup>
import yu from '@yu'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  styles: {
    type: Object,
    default: () => {
      return {
        radius: 0,
        marginBottom: 0,
        nameWidth: 0,
        callCountColor: ''
      }
    }
  }
})

const authorText = computed(() => '作者：' + props.data.author)
</script>

<style lang="scss" scoped>
  .card-box {
    padding: 20rpx;

    .img-box {
      width: 164rpx;
      height: 164rpx;
      border-radius: 10rpx;
      overflow: hidden;

      .order-img {
        width: 164rpx;
        height: 164rpx;
      }
    }

    .box-right {
      flex: 1;
      width: 400rpx;
      position: relative;

    }

    .title-text {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 40rpx;
    }

    .spec-text {
      font-size: 24rpx;
      font-weight: 400;
      color: $dark-9;
    }

    .author-text {
      font-size: 24rpx;
      font-weight: 500;
      color: var(--ui-BG-Main);
      font-family: OPPOSANS;
    }
  }
</style>

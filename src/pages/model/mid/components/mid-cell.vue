<template>
  <view class="cell-wrap ss-flex ss-col-center ss-row-between" @tap="emits('click')">
    <view class="label-text">选择</view>
    <view class="cell-content ss-line-1 ss-flex-1">{{ value }}</view>
    <button class="ss-reset-button">
      <text class="_icon-forward right-forwrad-icon"></text>
    </button>
  </view>
</template>

<script setup>
/* 模型选择组件 */
import { computed } from 'vue'

const props = defineProps({
  selectedModel: {
    type: Object,
    default: () => {}
  }
})
const value = computed(() => {
  if (!props.selectedModel.id) return '请选择模型'
  return props.selectedModel.properties.reduce((prev, next) => {
    return prev + next.propertyName + ': ' + next.valueName + ', '
  }, '').slice(0, -2)
})

const emits = defineEmits(['click'])

</script>

<style lang="scss" scoped>
  .cell-wrap {
    padding: 10rpx 20rpx;

    .label-text {
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-9;
      margin-right: 38rpx;
    }

    .cell-content {
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-6;
    }

    .right-forwrad-icon {
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-9;
    }
  }
</style>

<template>
  <y-layout title="使用模型">
    <view class="img-card bg-white ss-m-x-20 ss-p-t-10">
      <view class="card-header ss-flex ss-col-center ss-m-l-20">
        <view class="line"></view>
        <view class="title ss-m-x-20">上传</view>
      </view>
      <view class="ss-p-20">
        <uni-file-picker
          ref = "fileInputer"
          limit="1"
          return-type="object"
          :image-styles="pickerStyles"
          @select="onSelectAndUpdate">
        </uni-file-picker>
      </view>
    </view>
    <view class="img-card bg-white ss-m-x-20">
      <view class="card-header ss-flex ss-col-center ss-m-l-20">
        <view class="line"></view>
        <view class="title ss-m-x-20">回传</view>
      </view>
      <view class="ss-p-20">
        <uni-file-picker
          ref = "fileOutputer"
          limit="1"
          disabled
          :image-styles="pickerStyles">
        </uni-file-picker>
      </view>
    </view>
    <!-- 底部 -->
    <su-fixed bottom placeholder bg="bg-white">
      <view class="tabbar-box ss-flex ss-col-center ss-row-center">
        <button class="ss-reset-button predict-btn ui-Shadow-Main" @tap="predict">
          预测
        </button>
      </view>
    </su-fixed>
  </y-layout>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import yu from '@yu'

defineProps({
  id: {
    type: String,
    default: ''
  }
})

const state = ref({
  modelInput: '',
  modelOutput: ''
})
const fileInputer = ref(null)
const fileOutputer = ref(null)
const usePredictModelStore = yu.$store.usePredictModelStore()

const pickerStyles = ref({
  width: 200,
  height: 200,
  border: {
    color: '#333',		// 边框颜色
    width: '1px',		// 边框宽度
    style: 'dashed' 	// 边框样式
  }
})

/* 上传 */
const onSelectAndUpdate = async(updateRes) => {
  fileInputer.value.files.forEach(file => { file.progress = null })
  state.value.modelInput = await usePredictModelStore.uploadImage(updateRes.tempFilePaths[0])
}

/* 预测 */
const predict = async() => {
  uni.showLoading({ title: '模型预测中...', mask: true })
  state.value.modelOutput = await usePredictModelStore.predict(state.value.modelInput)
  fileOutputer.value.files = [{ url: state.value.modelOutput }]
  uni.hideLoading()
}

onLoad(async(options) => {
  if (!options.id) return
  await usePredictModelStore.getPredictModelLinkInfo(options.id)
})

onReady(() => {
  // 设置上传框宽高
  uni.createSelectorQuery()
    .select('.uni-file-picker')
    .boundingClientRect((data) => {
      if (data) {
        pickerStyles.value.width = data.width + 10
        pickerStyles.value.height = data.width + 10
      }
    })
    .exec()
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
  .tabbar-box {
    height: 50px;
    background: #fff;
    box-shadow: 0px -6px 10px 0px rgba(51, 51, 51, 0.2);
		.predict-btn {
			width: 214rpx;
			height: 72rpx;
			font-weight: 500;
			font-size: 28rpx;
			border-radius: 40rpx;
      text-indent: 1rem;
      letter-spacing: 1rem;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: $white;
		}
  }
</style>

<!-- 海报弹窗 -->
<template>
  <su-popup :show="show" round="10" @close="onClosePoster" type="center" class="popup-box">
    <view class="ss-flex-col ss-col-center ss-row-center">
      <view
        v-if="poster.src === ''"
        class="poster-title ss-flex ss-row-center"
        :style="{
          height: poster.height + 'px',
          width: poster.width + 'px',
        }"
      >
        海报加载中...
      </view>
      <image
        v-else
        class="poster-img"
        :src="poster.src"
        :style="{
          height: poster.height + 'px',
          width: poster.width + 'px',
        }"
        :show-menu-by-longpress="true"
      />
      <canvas
        class="hideCanvas"
        :canvas-id="poster.canvasId"
        :id="poster.canvasId"
        :style="{
          height: poster.height + 'px',
          width: poster.width + 'px',
        }"
      />
      <view
        class="poster-btn-box ss-m-t-20 ss-flex ss-row-between ss-col-center"
        v-if="poster.src !== ''"
      >
        <button class="cancel-btn ss-reset-button" @tap="onClosePoster">取消</button>
        <button class="save-btn ss-reset-button ui-BG-Main" @tap="onSavePoster">
          {{
            ['wechatOfficialAccount', 'H5'].includes(yu.$platform.name)
              ? '长按图片保存'
              : '保存图片'
          }}
        </button>
      </view>
    </view>
  </su-popup>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import yu from '@yu'
import useCanvas from './useCanvas'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  shareInfo: {
    type: Object,
    default() {}
  }
})

const poster = reactive({
  canvasId: 'canvasId',
  width: yu.$platform.device.windowWidth * 0.9,
  height: 600,
  src: ''
})

const emits = defineEmits(['success', 'close'])
const vm = getCurrentInstance()

const onClosePoster = () => {
  emits('close')
}

// 保存海报图片
const onSavePoster = () => {
  if (['WechatOfficialAccount', 'H5'].includes(yu.$platform.name)) {
    yu.$helper.toast('请长按图片保存')
    return
  }

  uni.saveImageToPhotosAlbum({
    filePath: poster.src,
    success: (res) => {
      onClosePoster()
      yu.$helper.toast('保存成功')
    },
    fail: (err) => {
      yu.$helper.toast('保存失败')
      console.log('图片保存失败:', err)
    }
  })
}

// 使用 canvas 生成海报
async function getPoster(params) {
  poster.src = ''

  poster.shareInfo = props.shareInfo
  // #ifdef APP-PLUS
  poster.canvasId = 'canvasId-' + new Date().getTime()
  // #endif
  const canvas = await useCanvas(poster, vm)
  return canvas
}

defineExpose({
  getPoster
})
</script>

<style lang="scss" scoped>
  .popup-box {
    position: relative;
  }
  .poster-title {
    color: #999;
  }
  // 分享海报
  .poster-btn-box {
    width: 600rpx;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -80rpx;
    .cancel-btn {
      width: 240rpx;
      height: 70rpx;
      line-height: 70rpx;
      background: $white;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: $dark-9;
    }
    .save-btn {
      width: 240rpx;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 35rpx;
      font-size: 28rpx;
      font-weight: 500;
    }
  }

  .poster-img {
    border-radius: 20rpx;
  }
  .hideCanvas {
    position: fixed;
    top: -99999rpx;
    left: -99999rpx;
    z-index: -99999;
  }
</style>

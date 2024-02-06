
<template>
  <su-fixed alway :bgStyles="{ background: '#fff' }" :val="0" noNav opacity :placeholder="false">
    <view class="ss-flex ss-col-center ss-row-between ss-p-x-20" :style="navBarStyle">
      <!-- 左 -->
      <view class="icon-box ss-flex">
        <view class="icon-button ss-flex ss-row-center" @tap="onClickLeft">
          <text class="sicon-back" v-if="state.hasHistory" />
          <text class="sicon-home" v-else />
        </view>
        <view class="line"></view>
        <view class="icon-button ss-flex ss-row-center" @tap="onClickRight">
          <text class="sicon-more" />
        </view>
      </view>

      <!-- 中 -->
      <view class="content-tab-card ss-flex-1" :style="[{ opacity: state.navTabOpacityVal }]">
        <view class="ss-flex ss-col-center ss-row-around">
          <view
            class="tab-item ss-flex-1 ss-flex ss-row-center ss-col-center"
            v-for="item in tabList"
            :key="item.value"
            @tap="onTab(item)"
          >
            <view class="tab-title" :class="state.curTab === item.value ? 'cur-tab-title' : ''">
              {{ item.label }}
            </view>
            <view v-show="state.curTab === item.value" class="tab-line"></view>
          </view>
        </view>
      </view>

      <!-- #ifdef MP -->
      <view :style="capsuleStyle"></view>
      <!-- #endif -->
    </view>
  </su-fixed>
</template>

<script setup>
/* 模型详情：模型/详情的 nav --> */

import { ref, computed } from 'vue'
import yu from '@yu'
import { onPageScroll } from '@dcloudio/uni-app'
import { showMenuTools } from '@yu/hooks/useModal'

/* 全局设置 */
const props = defineProps({
  contentNodeTop: {
    type: Number,
    default: 0
  },
  tabList: {
    type: Array,
    default: () => []
  }
})
const app = yu.$store.useAppStore()
const sysStatusBar = ref(yu.$platform.device.statusBarHeight)
const sysNavBar = ref(yu.$platform.navbar)
const navBarStyle = computed(() => ({ height: `${sysNavBar.value - sysStatusBar.value}px` }))

// 小程序中的导航栏的最右边空白
const capsuleStyle = computed(() => ({
  width: `${yu.$platform.capsule.width}px`,
  height: `${yu.$platform.capsule.height}px`
}))

const state = ref({
  navTabOpacityVal: 0,
  curTab: props.tabList?.[0].value || '',
  hasHistory: yu.$router.hasHistory()
})

/* 返回 和 菜单的实现 */
const onClickLeft = () => {
  if (state.value.hasHistory) {
    yu.$router.back()
  } else {
    yu.$router.go(app.info.indexPage)
  }
}
const onClickRight = () => {
  showMenuTools()
}

/* 右侧 Tab 栏的相关实现 */
// 切换 Tab
const onTab = (tab) => {
  let scrollTop = 0

  if (tab.value === 'content') {
    scrollTop = props.contentNodeTop - sysNavBar.value
  }
  uni.pageScrollTo({
    scrollTop,
    duration: 200
  })
}

onPageScroll((e) => {
  // 设置导航栏透明度
  state.value.navTabOpacityVal = e.scrollTop > sysNavBar.value ? 1 : e.scrollTop * (1 / sysNavBar.value)
  // console.log('e.scrollTop: ', e.scrollTop)

  // 切换
  if (e.scrollTop < props.contentNodeTop - sysNavBar.value - 1) {
    state.value.curTab = props.tabList?.[0].value
  } else {
    state.value.curTab = props.tabList?.[1].value
  }
})
// 暴露onTap
defineExpose({ onTab })
</script>

<style lang="scss" scoped>
  .icon-box {
    box-shadow: 0px 0px 4rpx rgba(51, 51, 51, 0.08), 0px 4rpx 6rpx 2rpx rgba(102, 102, 102, 0.12);
    border-radius: 30rpx;
    width: 134rpx;
    height: 56rpx;
    margin-left: 8rpx;
    border: 1px solid rgba(#fff, 0.4);
    .line {
      width: 2rpx;
      height: 24rpx;
      background: #e5e5e7;
    }
    .sicon-back {
      font-size: 32rpx;
      color: #000;
    }
    .sicon-home {
      font-size: 32rpx;
      color: #000;
    }
    .sicon-more {
      font-size: 32rpx;
      color: #000;
    }
    .icon-button {
      width: 67rpx;
      height: 56rpx;
      &-left:hover {
        background: rgba(0, 0, 0, 0.16);
        border-radius: 30rpx 0px 0px 30rpx;
      }
      &-right:hover {
        background: rgba(0, 0, 0, 0.16);
        border-radius: 0px 30rpx 30rpx 0px;
      }
    }
  }
  .content-tab-card {
    width: 50%;
    .tab-item {
      height: 80rpx;
      position: relative;
      z-index: 11;

      .tab-title {
        font-size: 30rpx;
      }

      .cur-tab-title {
        font-weight: $font-weight-bold;
      }

      .tab-line {
        width: 60rpx;
        height: 6rpx;
        border-radius: 6rpx;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10rpx;
        background-color: var(--ui-BG-Main);
        z-index: 12;
      }
    }
  }
</style>

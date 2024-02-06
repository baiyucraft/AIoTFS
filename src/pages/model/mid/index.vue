<template>
  <y-layout :onShareAppMessage="shareInfo" navbar="models">
    <!-- 标题栏 -->
    <MidNavbar ref="navRef" :content-node-top="contentNodeTop" :tab-list="state.tabList"/>
    <template v-if="!isEmpty(state.modelInfo)">
      <view class="mid-swiper-selector">
        <!-- 轮播图 -->
        <MidSwiper :img-list="imgList"/>
        <!-- 基本信息 -->
        <MidInfo
          class="mid-card"
          :model-info="state.modelInfo"
          @on-click-subtitle="onTabTap" />
        <!-- 模型选择 -->
        <MidCell
          class="mid-card"
          :selected-model="state.selectedModel"
          @tap="state.showSelectModel = true" />
        <MidCellSelected
          :model-info="state.modelInfo"
          :show="state.showSelectModel"
          @selected-model-change="onSelectedModelChange"
          @on-go-model="onGoModel"
          @close="state.showSelectModel = false" />
      </view>
      <!-- 详情 -->
      <MidContent class="mid-content-selector" :content="state.modelInfo.description" />
      <!-- 分享 + 使用模型 -->
      <MidTabbar @show-cell="state.showSelectModel = true" />
    </template>

    <s-empty
      v-else-if="!state.modelLoading"
      text="模型不存在"
      icon="/static/soldout-empty.png"
      show-action
      action-text="返回模型列表"
      action-url="/mapp/pages/model/index/index" />
  </y-layout>
</template>
<script setup>
import { ref, computed } from 'vue'
import { onLoad, onReady, onPageScroll } from '@dcloudio/uni-app'
import yu from '@yu'

import { isEmpty } from 'lodash'
import MidNavbar from './components/mid-navbar.vue'
import MidSwiper from './components/mid-swiper.vue'
import MidInfo from './components/mid-info.vue'
import MidCell from './components/mid-cell.vue'
import MidCellSelected from './components/mid-cell-selected.vue'
import MidContent from './components/mid-content.vue'
import MidTabbar from './components/mid-tabbar.vue'

defineProps({
  id: {
    type: String,
    default: ''
  }
})

const state = ref({
  tabList: [
    { label: '模型', value: 'models' },
    { label: '详情', value: 'content' }
  ],
  modelLoading: true, // 骨架屏
  modelInfo: {}, // 模型信息
  showSelectModel: false, // 是否展示模型选择弹窗
  selectedModel: {} // 选中的模型
})
const imgList = computed(() => state.value.modelInfo.imgList.map(url => ({
  type: 'image',
  src: yu.$url.cdn(url) })
))

// 跳转详情
const navRef = ref(null)
const onTabTap = (e) => { navRef.value.onTab(state.value.tabList[1]) }
// 获取详情节点的位置
const contentNodeTop = ref(0)
const getContentNodeTop = () => {
  uni.createSelectorQuery().in(this)
    .select('.mid-content-selector')
    .boundingClientRect(data => data && (contentNodeTop.value = data.top))
    .exec()
}

// 选择变更
const onSelectedModelChange = (e) => {
  state.value.selectedModel = e
  getContentNodeTop()
}

// 立即购买
const onGoModel = () => {
  yu.$router.go('/pages/model/usemodel/index', {
    id: state.value.selectedModel.id
  })
}

//  TODO H: 后续添加
const shareInfo = computed(() => {
  if (isEmpty(state.value.goodsInfo)) return {}
  return yu.$platform.share.getShareInfo({
    title: state.value.goodsInfo.name,
    image: yu.$url.cdn(state.value.goodsInfo.image),
    desc: state.value.goodsInfo.subtitle,
    params: {
      page: '2',
      query: state.value.goodsInfo.id
    }
  }, {
    type: 'goods', // 商品海报
    title: state.value.goodsInfo.name, // 商品标题
    image: yu.$url.cdn(state.value.goodsInfo.picUrl), // 商品主图
    price: state.value.goodsInfo.price, // 商品价格
    original_price: state.value.goodsInfo.original_price // 商品原价
  })
})

onLoad(async(options) => {
  if (!options.id) return
  const res = await yu.$api.model.getPredictModelInfo(options.id)
  state.value.modelLoading = false
  state.value.modelInfo = res
})

onReady(() => {
  // 由于v-if的原因，需要延迟获取节点位置
  setTimeout(() => {
    getContentNodeTop()
  }, 100)
})

onPageScroll(() => {})
</script>

<style lang="scss" scoped>
	.mid-card {
		background-color: #ffff;
		margin: 14rpx 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}
</style>

<template>
  <y-layout
    title="首页"
    navbar="custom"
    tabbar="/pages/index/index"
    onShareAppMessage>
    <IndexHeader/>
    <IndexSwiper :items="data.swiperItems" :style="swiperStyle"/>
    <IndexMenu :items="data.menuItems" :style="cardStyle"/>
    <IndexCard :modelList="data.cardItems" :style="cardStyle"/>
  </y-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onPageScroll, onPullDownRefresh } from '@dcloudio/uni-app'
import yu from '@yu'
import IndexHeader from './components/index-header.vue'
import IndexSwiper from './components/index-swiper.vue'
import IndexMenu from './components/index-menu.vue'
import IndexCard from './components/index-card.vue'

// data
const data = ref({
  swiperItems: [
    {
      src: '/static/carousel/banner01.jpg',
      url: ''
    },
    {
      src: '/static/carousel/banner02.jpg',
      url: ''
    }
  ],
  menuItems: [{
    title: '模型预测',
    iconUrl: '/static/icon/ModelPrediction.png',
    url: '/pages/model/index/index'
  },
  {
    title: '视频监控',
    iconUrl: '/static/icon/VideoSurveillance.png',
    url: '/pages/index/user'
  },
  {
    title: '环境监测',
    iconUrl: '/static/icon/EnvironmentalMonitoring.png',
    url: ''
  },
  {
    title: '设备控制',
    iconUrl: '/static/icon/DeviceControl.png',
    url: ''
  }],
  cardItems: []
})

// style
const style = ref({
  background: '#fff',
  marginBottom: '8px'
})
const swiperStyle = computed(() => ({ ...style.value }))
const cardStyle = computed(() => ({
  ...style.value,
  marginLeft: '8px',
  marginRight: '8px',
  padding: '8px',
  borderRadius: '8px',
  overflow: 'hidden'
}))

onLoad(async(options) => {
  // #ifdef MP
  // 小程序识别二维码
  if (options.scene) {
    const sceneParams = decodeURIComponent(options.scene).split('=')
    options[sceneParams[0]] = sceneParams[1]
  }
  // #endif

  const { result } = await yu.$api.model.getAllPredictModel()
  data.value.cardItems = result
})

// 下拉刷新
onPullDownRefresh(() => {
  yu.$store.useAppStore().init()
  setTimeout(function() {
    uni.stopPullDownRefresh()
  }, 800)
})

onPageScroll(() => {})
</script>

<style lang="scss" scoped>

</style>

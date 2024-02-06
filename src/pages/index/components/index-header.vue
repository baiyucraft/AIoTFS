<template>
  <!-- 头顶大模块 -->
  <view :style="parsebgStyle">
    <view class="_text_area">
      <view class="_time">
        <text>{{ date }}</text>
        <text>农历</text>
      </view>
      <IndexHeaderCity class="_city"  :city="locationInfo.city"/>
      <view class="_weather">
        <text>{{ locationInfo.weather }}{{ locationInfo.temperature }}℃</text>
        <text>{{ locationInfo.winddirection }}风</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import yu from '@yu'
import IndexHeaderCity from './index-header-city.vue'

const bgStyle = ref({
  image: '/static/v2_qmpuuf.png',
  marginLeft: 0,
  marginRight: 0,
  padding: 10,
  textHeight: 20 + 28 + 25
})
// 获取当前时间
// TODO H: 后期增加农历
const date = ref(yu.$utils.formatDate(new Date(), 'YYYY年MM月DD日 '))
// 获取当前地区天气
const locationInfo = ref({
  latitude: '',
  longitude: '',
  province: '广东',
  city: '广州市天河区',
  adcode: '440106',
  weather: '',
  temperature: ''
})
// 计算背景
const windowWidth = yu.$platform.device.windowWidth
const bgWidth = computed(() => windowWidth - ((bgStyle.value.marginLeft || 0) + (bgStyle.value.marginRight || 0) + (bgStyle.value.padding || 0) * 2)
)
const bgHeight = computed(() => (windowWidth * 145) / 375 - (bgStyle.value.padding || 0) * 2)
// 获取背景图片大小
const parsebgStyle = computed(() => {
  return {
    color: '#fff',
    width: bgWidth.value + 'px',
    height: bgHeight.value + 'px',
    marginLeft: bgStyle.value.marginLeft + 'px',
    marginRight: bgStyle.value.marginRight + 'px',
    padding: bgStyle.value.padding + 'px',
    backgroundImage: `url(${yu.$url.cdn(bgStyle.value.image)})`,
    backgroundSize: 'contain'
  }
})

onMounted(() => {
  // 获取当前地区
  uni.getLocation({
    type: 'wgs84',
    success: (res) => {
      locationInfo.value.latitude = res.latitude
      locationInfo.value.longitude = res.longitude
      // 待定
      // uni.request({
      // 	url: 'https://restapi.amap.com/v3/geocode/geo',
      // 	method: 'GET',
      // 	data: {
      // 		latitude: res.latitude,
      // 		longitude: res.longitude
      // 	},
      // 	success: (res) => {
      // 		locationInfo.value.loc = res.data.regeocode.addressComponent.city;
      // 	},
      // 	fail: (err) => {},
      // })
    },
    fail: (err) => {
      console.log(err)
    },
    complete: () => {}
  })
  // 获取当前天气
  uni.request({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    method: 'GET',
    data: {
      key: 'b968ec5aabcd90dbb0294268fe78a84b',
      city: locationInfo.value.adcode
    },
    success: (res) => {
      locationInfo.value.weather = res.data.lives[0].weather
      locationInfo.value.temperature = res.data.lives[0].temperature_float
      locationInfo.value.winddirection = res.data.lives[0].winddirection
    },
    fail: (err) => { console.log(err) }
  })
})

</script>

<style lang="scss" scoped>
  ._text_area {
    margin-top: v-bind("bgHeight - bgStyle.textHeight + 'px'");

    > *{
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      letter-spacing: 2px;
    }
    ._weather {
      display: flex;
      justify-content: space-between;
    }
  }
</style>

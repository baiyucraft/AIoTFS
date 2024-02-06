<template>
  <view ref="cityWrapper" :style="parseCityStyle" class="city-wrapper">
    <uni-icons type="location-filled" size="22" color="#fff"></uni-icons>
    <text>{{ city }}</text>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cityWrapper = ref(null)
defineProps({
  city: {
    type: String,
    default: ''
  }
})
const cityStyle = ref({
  // 由大变小
  width: 400,
  height: 0,
  padding: 5
})

const parseCityStyle = computed(() => {
  return {
    lineHeight: cityStyle.value.height + 'px',
    width: cityStyle.value.width + 'px',
    height: cityStyle.value.height + 'px',
    paddingLeft: cityStyle.value.padding + 'px',
    paddingRight: cityStyle.value.padding + 'px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '10px'
  }
})

// TODO H: 研究为啥初始的时候icon获取的不对
onMounted(() => {
  // 暂时使用定时器解决
  setTimeout(() => {
    const cityText = cityWrapper.value?.$el?.children
    if (!cityText) return
    const { width, height } = Array.prototype.reduce.call(cityText, (pre, cur) => {
      // console.log(cur.offsetWidth, cur.offsetHeight)
      return {
        width: pre.width + cur.offsetWidth,
        height: Math.max(pre.height, cur.offsetHeight) }
    }, {
      width: 0,
      height: 0
    })
    cityStyle.value.width = width + 1
    cityStyle.value.height = height + 6
  }, 100)
})

</script>

<style lang="scss" scoped>
  .city-wrapper text{
    line-height: 24px;
    vertical-align: middle;
  }
</style>

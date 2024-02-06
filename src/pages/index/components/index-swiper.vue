<template>
  <su-swiper
    :list="imgList"
    :autoplay=true
    dotStyle="tag"
    dotCur="bg-mask-40"
    :seizeHeight=300
    :interval="interval * 1000"
    :mode="type"
    :style="style"
  />
</template>

<script setup>
import { computed } from 'vue'
import yu from '@yu'

const props = defineProps({
  type: {
    type: String,
    default: 'card'
  },
  interval: {
    type: Number,
    default: 3
  },
  style: {
    type: Object,
    default: () => {}
  },
  items: {
    type: Array,
    default: () => []
  }
})

const imgList = computed(() =>
  props.items.map((item) => {
    return {
      url: item.url,
      type: 'image',
      src: yu.$url.cdn(item.src)
    }
  })
)
</script>

<style lang="scss" scoped>
</style>

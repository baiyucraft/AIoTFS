<template>
  <view>
    <view class="goods-box" v-for="item in modelStyleList" :key="item.id">
      <IndexCardItem
        :data="item"
        :styles="item.styles"
        :tag-show="item.tagShow"
        @tap="yu.$router.go('/pages/model/mid/index', { id: item.id })"
      />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import yu from '@yu'
import IndexCardItem from './index-card-item.vue'

const props = defineProps({
  style: {
    type: Object,
    default: () => {}
  },
  modelList: {
    type: Array,
    default: () => []
  }
})

const modelStyleList = computed(() =>
  props.modelList.map(({ id, name, introduction, teacherId, isTop, pic, createdAt }) =>
    ({
      id,
      name,
      introduction,
      teacherId,
      tagShow: isTop,
      picUrl: pic,
      createTime: yu.$utils.formatDate(createdAt, 'YYYY.MM.DD '),
      styles: props.style
    })
  )
)

</script>

<style lang="scss" scoped>
  .goods-box {
    margin-bottom: 8rpx;
  }
</style>

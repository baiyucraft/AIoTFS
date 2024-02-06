<template>
  <!-- 商品轮播图 -> 模型图+论文图+专利图+演示示例图  -->
  <su-swiper
    class="ss-m-b-14"
    is-preview
    :list=imgList
    ot-style="tag"
    image-mode="widthFix"
    dot-cur="bg-mask-40"
    :seize-height="750" />
</template>

<script setup>
/**
 * mid 的轮播组件，一般由 模型图 + 论文图（专利图） + 演示示例图
 *
 * */

defineProps({
  imgList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
</style>

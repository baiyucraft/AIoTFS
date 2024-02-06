<template>
  <view :style="style">
    <uni-grid :showBorder="false" :column="column">
      <uni-grid-item
        v-for="(item, index) in items"
        :key="index"
        @tap="yu.$router.go(item.url)"
      >
        <view class="grid-item-box ss-flex ss-flex-col ss-row-center ss-col-center">
          <view class="img-box">
            <image class="menu-image" :src="yu.$url.cdn(item.iconUrl)"></image>
          </view>
          <view class="title-box ss-flex ss-flex-col ss-row-center">
            <view>{{ item.title }}</view>
          </view>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup>
import yu from '@yu'

defineProps({
  column: {
    type: Number,
    default: 4
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

</script>

<style lang="scss" scoped>
  .menu-image {
    width: 24px;
    height: 24px;
  }
  .grid-item-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #333;
  }
  .title-box {
    margin-top: 5px;
  }
</style>

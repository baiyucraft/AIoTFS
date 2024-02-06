<template>
  <y-layout title="模型列表" tabbar="/pages/model/index/index">
    <view class="ss-flex ss-flex-col ss-row-between">
      <!-- 头部 -->
      <view class="header ss-flex ss-col-center ss-row-between ss-p-x-30">
        <view class="ss-flex ss-col-center ss-font-26">
          共<text class="ui-TC-Main ss-flex ss-p-x-10">{{ pagination.total }}</text>个模型
        </view>
      </view>
      <!-- 内容 -->
      <view class="content">
        <view class="cards-box ss-r-10 ss-m-b-14" v-for="item in data" :key="item.id">
          <ModelIndexCard
            :data="item"
            :styles="cardStyle"
            @tap="yu.$router.go('/pages/model/mid/index', {id: item.id,})"
          />
        </view>
      </view>
    </view>
    <uni-load-more
      v-if="pagination.total > 0"
      :status="loadStatus"
      :content-text="{
        contentdown: '上拉加载更多',sysNavBar
      }"
      @tap="loadmore"
    />
  </y-layout>
</template>

<script setup>
import yu from '@yu'
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { concat } from 'lodash'
import ModelIndexCard from './components/model-index-card.vue'

const sysNavBar = yu.$platform.navbar

const data = ref([])
const pagination = ref({
  totalPage: 0,
  pageIndex: 1,
  pageSize: 10
})
const loadStatus = ref('loading')
const cardStyle = ref({
  radius: 8,
  marginBottom: 14,
  nameWidth: 400,
  callCountColor: '#FF3000'
})

const getData = async() => {
  loadStatus.value = 'loading'
  const res = await yu.$api.model.getAllPredictModel({
    pageIndex: pagination.value.pageIndex,
    pageSize: pagination.value.pageSize
  })

  pagination.value.total = res.pagination.total
  data.value = concat(data.value, res.result.map((item) => {
    return {
      id: item.id,
      name: item.name,
      author: item.author,
      introduction: item.introduction,
      image: item.pic
    }
  }))
  if (data.value.length < pagination.value.totalPage) {
    loadStatus.value = 'more'
  } else {
    loadStatus.value = 'noMore'
  }
}

// 加载更多
const loadmore = async() => {
  if (loadStatus.value !== 'noMore') {
    await getData(pagination.value.current_page + 1)
  }
}
onReachBottom(async() => {
  await loadmore()
})
onLoad(async() => {
  await getData()
})
</script>

<style lang="scss" scoped>
  .header {
    height: 70rpx;
    background-color: #f6f6f6;
    width: 100%;
    position: fixed;
    left: 0;
    top: v-bind('sysNavBar') rpx;
    z-index: 1000;
    box-sizing: border-box;
  }
  .content {
    width: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
    margin-top: 70rpx;
    .cards-box {
      background-color: #fff;
      &:last-child {
        margin-bottom: 40rpx;
      }
    }
  }
</style>

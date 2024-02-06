import { ref } from 'vue'
import {	defineStore } from 'pinia'
// import userApi from '@/sheep/api/user';
import $share from '@yu/platform/share'
import {	isEmpty,	cloneDeep,	clone } from 'lodash'
import $store from '.'
import {	showAuthModal } from '@yu/hooks/useModal'
// TODO H: API
import UserApi from '@/sheep/api/member/user'
import PayWalletApi from '@/sheep/api/pay/wallet'
import OrderApi from '@/sheep/api/trade/order'
import CouponApi from '@/sheep/api/promotion/coupon'

// 默认用户信息
const defaultUserInfo = {
  avatar: '', // 头像
  nickname: '', // 昵称
  gender: 0, // 性别
  mobile: '', // 手机号
  point: 0 // 积分
}

// 默认钱包信息
const defaultUserWallet = {
  balance: 0 // 余额
}

// 默认订单、优惠券等其他资产信息
const defaultNumData = {
  unusedCouponCount: 0,
  orderCount: {
    allCount: 0,
    unpaidCount: 0,
    undeliveredCount: 0,
    deliveredCount: 0,
    uncommentedCount: 0,
    afterSaleCount: 0
  }
}

const useUserStore = defineStore(
  'user',
  () => {
    // state
    const state = ref({
      userInfo: clone(defaultUserInfo), // 用户信息
      userWallet: clone(defaultUserWallet), // 用户钱包信息
      isLogin: !!uni.getStorageSync('token'), // 登录状态
      numData: cloneDeep(defaultNumData), // 用户其他数据
      lastUpdateTime: 0 // 上次更新时间
    })
    // actions
    // 获取用户信息
    const getInfo = async() => {
      const { code, data } = await UserApi.getUserInfo()
      if (code !== 0) {
        return
      }
      state.value.userInfo = data
      return Promise.resolve(data)
    }

    // 获得用户钱包
    const getWallet = async() => {
      const { code, data } = await PayWalletApi.getPayWallet()
      if (code !== 0) {
        return
      }
      state.value.userWallet = data
    }

    // 获取订单、优惠券等其他资产信息
    const getNumData = () => {
      OrderApi.getOrderCount().then(res => {
        if (res.code === 0) {
          state.value.numData.orderCount = res.data
        }
      })
      CouponApi.getUnusedCouponCount().then(res => {
        if (res.code === 0) {
          state.value.numData.unusedCouponCount = res.data
        }
      })
    }

    // 添加分享记录
    const addShareLog = async(params) => {
      const { error } = await UserApi.addShareLog(params)
      if (error === 0) uni.removeStorageSync('shareLog')
    }

    // 设置 token
    const setToken = (token = '', refreshToken = '') => {
      if (token === '') {
        state.value.isLogin = false
        uni.removeStorageSync('token')
        uni.removeStorageSync('refresh-token')
      } else {
        state.value.isLogin = true
        uni.setStorageSync('token', token)
        uni.setStorageSync('refresh-token', refreshToken)
        loginAfter()
      }
      return state.value.isLogin
    }

    // 更新用户相关信息 (手动限流，5 秒之内不刷新)
    const updateUserData = async() => {
      if (!state.value.isLogin) {
        resetUserData()
        return
      }
      // 防抖，5 秒之内不刷新
      const nowTime = new Date().getTime()
      if (state.value.lastUpdateTime + 5000 > nowTime) {
        return
      }
      state.value.lastUpdateTime = nowTime

      // 获取最新信息
      await getInfo()
      getWallet()
      getNumData()
      return state.value.userInfo
    }

    // 重置用户默认数据
    const resetUserData = () => {
      // 清空 token
      setToken()
      // 清空用户相关的缓存
      state.value.userInfo = clone(defaultUserInfo)
      state.value.userWallet = clone(defaultUserWallet)
      state.value.numData = cloneDeep(defaultNumData)
      // 清空购物车的缓存
      const CartStore = $store.useCartStore()
      CartStore.emptyList()
    }

    // 登录后，加载各种信息
    const loginAfter = async() => {
      await updateUserData()

      // 加载购物车
      const CartStore = $store.useCartStore()
      CartStore.getList()
      // 登录后设置全局分享参数
      $share.getShareInfo()

      // 提醒绑定手机号
      const app = $store.useAppStore()
      if (app.platform.bind_mobile && !state.value.userInfo.mobile) {
        showAuthModal('changeMobile')
      }

      // 添加分享记录
      const shareLog = uni.getStorageSync('shareLog')
      if (!isEmpty(shareLog)) {
        addShareLog({
          ...shareLog
        })
      }
    }

    // 登出系统
    const logout = async() => {
      resetUserData()
      return !state.value.isLogin
    }

    return {
      state,
      getInfo,
      getWallet,
      getNumData,
      addShareLog,
      setToken,
      updateUserData,
      resetUserData,
      loginAfter,
      logout
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{
        key: 'user-store'
      }]
    }
  }
)

export default useUserStore

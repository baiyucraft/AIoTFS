import { ref } from 'vue'
import { defineStore } from 'pinia'
// TODO H: API
import CartApi from '@/sheep/api/trade/cart'

const useCartStore = defineStore(
  'cart',
  () => {
    // state
    const state = ref({
      list: [], // 购物车列表
      selectedIds: [], // 已选列表
      isAllSelected: false, // 是否全选
      totalPriceSelected: 0 // 选中项总金额
    })
    // actions
    // 获取购物车列表
    const getList = async() => {
      const { data, code } = await CartApi.getCartList()
      if (code === 0) {
        state.value.list = data.validList

        // 计算各种关联属性
        state.value.selectedIds = []
        state.value.isAllSelected = true
        state.value.totalPriceSelected = 0
        state.value.list.forEach((item) => {
          if (item.selected) {
            state.value.selectedIds.push(item.id)
            state.value.totalPriceSelected += item.count * item.sku.price
          } else {
            state.value.isAllSelected = false
          }
        })
      }
    }

    // 添加购物车
    const add = async(goodsInfo) => {
      const { code } = await CartApi.addCart({
        skuId: goodsInfo.id,
        count: goodsInfo.goods_num
      })
      if (code === 0) {
        await getList()
      }
    }

    // 更新购物车
    const update = async(goodsInfo) => {
      const { code } = await CartApi.updateCartCount({
        id: goodsInfo.goods_id,
        count: goodsInfo.goods_num
      })
      if (code === 0) {
        await getList()
      }
    }

    // 移除购物车
    const deleteCart = async(ids) => {
      const { code } = await CartApi.deleteCart(ids.join(','))
      if (code === 0) {
        await getList()
      }
    }

    // 单选购物车商品
    const selectSingle = async(goodsId) => {
      const { code } = await CartApi.updateCartSelected({
        ids: [goodsId],
        selected: !state.value.selectedIds.includes(goodsId) // 取反
      })
      if (code === 0) {
        await getList()
      }
    }

    // 全选购物车商品
    const selectAll = async(flag) => {
      const { code } = await CartApi.updateCartSelected({
        ids: state.value.list.map((item) => item.id),
        selected: flag
      })
      if (code === 0) {
        await getList()
      }
    }

    // 清空购物车。注意，仅用于用户退出时，重置数据
    const emptyList = () => {
      state.value.list = []
      state.value.selectedIds = []
      state.value.isAllSelected = true
      state.value.totalPriceSelected = 0
    }

    return {
      state,
      getList,
      add,
      update,
      deleteCart,
      selectSingle,
      selectAll,
      emptyList
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'cart-store'
        }
      ]
    }
  }
)

export default useCartStore

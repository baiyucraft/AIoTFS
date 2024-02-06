import { defineStore } from 'pinia'
import $store from '.'

const useSysStore = defineStore(
  'sys',
  () => {
    // state
    const state = {
      theme: '', // 主题,
      mode: 'light', // 明亮模式、暗黑模式（暂未支持）
      modeAuto: false, // 跟随系统
      fontSize: 1 // 设置默认字号等级(0-4)
    }
    // getters

    // actions
    const setTheme = (theme = '') => {
      const app = $store.useAppStore()
      state.theme = theme || app.basic.theme || 'green'
    }
    return {
      state,
      setTheme
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'sys-store'
        }
      ]
    }
  }
)

export default useSysStore

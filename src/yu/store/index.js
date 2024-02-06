import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

export const setupPinia = (app) => {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
}

import useAppStore from './app'
import useUserStore from './user'
import useCartStore from './cart'
import useModalStore from './modal'
import useSysStore from './sys'
import usePredictModelStore from './predictModel'

const $store = {
  useAppStore,
  useUserStore,
  useCartStore,
  useModalStore,
  useSysStore,
  usePredictModelStore
}
export default $store

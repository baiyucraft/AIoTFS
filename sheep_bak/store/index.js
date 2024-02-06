import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

// TODO H: 后期重做pinia逻辑
// 自动注入所有pinia模块
const files = import.meta.globEager('./*.js')
const modules = {}
Object.keys(files).forEach((key) => {
  modules[key.replace(/(.*\/)*([^.]+).*/gi, '$2')] = files[key].default
})

export const setupPinia = (app) => {
  const pinia = createPinia()
  pinia.use(piniaPersist)

  app.use(pinia)
}

// console.log('modules', modules);
export default (name) => {
  return modules[name]()
}

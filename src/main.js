import App from './App.vue'
import { createSSRApp } from 'vue'
import { setupPinia } from '@yu/store'

export function createApp() {
  const app = createSSRApp(App)

  setupPinia(app)

  return {
    app
  }
}

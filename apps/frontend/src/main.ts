import router from '@/app/router/index'
import App from './App.vue'
import store from './store/index'
import { setupLoading } from './plugins'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import '@/app/styles/scss/global.scss'
import '@/app/styles/css/global.css'
import 'virtual:svg-icons-register'

async function setupApp() {
  setupLoading()

  // setupNProgress()

  // setupIconifyOffline()

  // setupDayjs()

  const app = createApp(App)

  // setupStore(app)

  // await setupRouter(app)
  app.use(router)

  // setupI18n(app)

  // setupAppVersionNotification()
  app.use(store)
  app.mount('#app')
  // setTimeout(() => app.mount('#app'), 100000)
}

setupApp()

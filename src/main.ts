import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from '@/global'
import './index.css'
import { aaaaa } from './service/test'

const app = createApp(App)
app.use(store)
app.use(router)
globalRegister(app)
app.mount('#app')

async function aaaa() {
  const res = await aaaaa('哈哈哈哈哈', '300')
  console.log(res)
}

aaaa()

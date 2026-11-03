import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/index.scss'
import icons from './global/register-icon.ts'
import 'element-plus/dist/index.css'
import store from './stores/main/index.ts'

const app = createApp(App)

app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')

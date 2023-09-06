import { createApp } from 'vue'
import 'tools-javascript'
import App from './App.vue'
import localcom from './components'
import { router } from './router'
import './styles/index.less'
import 'tools-css/index.css'

const app = createApp(App)
app.use(localcom).use(router)

app.mount('#app')

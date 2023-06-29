import './assets/bootstrap.min.css'
//import './assets/bootstrap.bundle.min.js'
import { router } from './routes.js'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount('#app')

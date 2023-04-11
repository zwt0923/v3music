import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import {router} from './router/index'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './style.css'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
  // 5. 创建并挂载根实例
app.use(router)
app.use(Antd)
app.mount('#app')

  



  
  // 现在，应用已经启动了！
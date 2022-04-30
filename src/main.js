import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import {router} from "./config/RouteConfig";
// 引入样式
import 'uno.css'
import 'element-plus/dist/index.css'


createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')



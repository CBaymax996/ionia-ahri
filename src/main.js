import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import {setupLayouts} from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
// 引入样式
import 'uno.css'
import 'element-plus/dist/index.css'

// 扫描路径生成路由
const router = createRouter({
    history: createWebHistory(),
    routes: setupLayouts(generatedRoutes)
});


 createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')



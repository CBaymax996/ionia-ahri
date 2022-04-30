import {createRouter, createWebHistory} from 'vue-router'
import {setupLayouts} from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import {useCookies} from '@vueuse/integrations/useCookies'
import {LoginCookieKey} from './LoginConfig'

// 扫描路径生成路由
const router = createRouter({
    history: createWebHistory(),
    routes: setupLayouts(generatedRoutes)
});
// 登录拦截
router.beforeEach(((to, from, next) => {
    let cookies = useCookies();
    if (to.path === '/login') {
        next()
    }
    if (cookies.get(LoginCookieKey) === undefined) {
        next("/login")
    }
    next()
}))

export {router}

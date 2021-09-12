import { createRouter, createWebHistory } from 'vue-router'
import Blog from "../components/Blog.vue";
const routes = [
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: () => import('../components/BlogDetail')
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
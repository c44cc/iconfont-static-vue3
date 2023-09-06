export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        meta: {
            title: '首页',
            show: true
        },
        component: () => import('~/views/home/index.vue')
    }
]

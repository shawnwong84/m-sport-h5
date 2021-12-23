import Vue from 'vue';
import Router from 'vue-router';
import { Cookie } from '../api/cookie';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: () => import('@/pages/index.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/pages/home/index.vue'),
                    meta: {
                        footShow: true,
                        requiresAuth: false,
                    },
                },
                {
                    path: '/match',
                    name: 'match',
                    component: () => import('@/pages/match/index.vue'),
                    meta: {
                        footShow: true,
                        requiresAuth: false,
                    },
                },
                {
                    path: '/attention',
                    name: 'attention',
                    component: () => import('@/pages/attention/index.vue'),
                    meta: {
                        footShow: true,
                        requiresAuth: true,
                    },
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/pages/my/index.vue'),
                    meta: {
                        footShow: true,
                        requiresAuth: true,
                    },
                },
                {
                    path: '/new',
                    name: 'new',
                    component: () => import('@/pages/new/index.vue'),
                    meta: {
                        footShow: true,
                        requiresAuth: false,
                    },
                },
            ],
        },
        {
            path: '/hotBank',
            name: 'hotBank',
            component: () => import('@/pages/hotBank/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/newDeatils',
            name: 'newDeatils',
            component: () => import('@/pages/newDeatils/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/room',
            name: 'room',
            component: () => import('@/pages/room/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/basketDeatils',
            name: 'basketDeatils',
            component: () => import('@/pages/basketDeatils/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/deatils',
            name: 'deatils',
            component: () => import('@/pages/deatils/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/register/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/password',
            name: 'password',
            component: () => import('@/pages/password/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: () => import('@/pages/agreement/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('@/pages/privacy/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/myDetail',
            name: 'myDetail',
            component: () => import('@/pages/myDetail/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/about/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/feedbackList',
            name: 'feedbackList',
            component: () => import('@/pages/feedbackList/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/message',
            name: 'message',
            component: () => import('@/pages/message/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/pages/search/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('@/pages/account/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/accountChange',
            name: 'accountChange',
            component: () => import('@/pages/accountChange/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/featuredExperts',
            name: 'featuredExperts',
            component: () => import('@/pages/featuredExperts/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
        {
            path: '/down',
            name: 'down',
            component: () => import('@/pages/down/index.vue'),
            meta: {
                footShow: true,
                requiresAuth: false,
            },
        },
    ],
});

//登录拦截
router.beforeEach((to, from, next) => {
    const UserToken = Cookie.get('token') || '';
    if (to.meta.requiresAuth) {
        if (!UserToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

export default router;

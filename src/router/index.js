import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch((err) => err);
};
export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/home',
            component: () => import('@/pages/index.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/pages/home/index.vue'),
                },
                {
                    path: '/match',
                    name: 'match',
                    component: () => import('@/pages/match/index.vue'),
                },
                {
                    path: '/concern',
                    name: 'concern',
                    component: () => import('@/pages/concern/index.vue'),
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/pages/my/index.vue'),
                },
                {
                    path: '/new',
                    name: 'new',
                    component: () => import('@/pages/new/index.vue'),
                },
            ],
        },
        {
            path: '/hotBank',
            name: 'hotBank',
            component: () => import('@/pages/hotBank/index.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/index.vue'),
        },
        {
            path: '/newDeatils',
            name: 'newDeatils',
            component: () => import('@/pages/newDeatils/index.vue'),
        },
        {
            path: '/room',
            name: 'room',
            component: () => import('@/pages/room/index.vue'),
        },
        {
            path: '/basketDeatils',
            name: 'basketDeatils',
            component: () => import('@/pages/basketDeatils/index.vue'),
        },
        {
            path: '/deatils',
            name: 'deatils',
            component: () => import('@/pages/deatils/index.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/register/index.vue'),
        },
        {
            path: '/password',
            name: 'password',
            component: () => import('@/pages/password/index.vue'),
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: () => import('@/pages/agreement/index.vue'),
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('@/pages/privacy/index.vue'),
        },
        {
            path: '/myDetail',
            name: 'myDetail',
            component: () => import('@/pages/myDetail/index.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/pages/about/index.vue'),
        },
        {
            path: '/feedbackList',
            name: 'feedbackList',
            component: () => import('@/pages/feedbackList/index.vue'),
        },
        {
            path: '/message',
            name: 'message',
            component: () => import('@/pages/message/index.vue'),
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/pages/search/index.vue'),
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('@/pages/account/index.vue'),
        },
        {
            path: '/accountChange',
            name: 'accountChange',
            component: () => import('@/pages/accountChange/index.vue'),
        },
        {
            path: '/featuredExperts',
            name: 'featuredExperts',
            component: () => import('@/pages/featuredExperts/index.vue'),
        },
        {
            path: '/down',
            name: 'down',
            component: () => import('@/pages/down/index.vue'),
        },
    ],
});

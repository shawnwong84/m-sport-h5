<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="header-box">
        <div class="nav-list">
            <div
                class="nav-item"
                v-for="item in navList"
                :key="item.id"
                @click="toPage(item.path)"
            >
                <img
                    :src="
                        $route.path === item.path ? item.activeIcon : item.icon
                    "
                    alt=""
                />
                <span :class="{ active: $route.path === item.path }">{{
                    item.name
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            navList: [
                {
                    id: 1,
                    name: '直播',
                    path: '/home',
                    icon: require('../../assets/image/header/live-icon.png'),
                    activeIcon: require('../../assets/image/header/live-active-icon.png'),
                },
                {
                    id: 2,
                    name: '咨询',
                    path: '/new',
                    icon: require('../../assets/image/header/news-icon.png'),
                    activeIcon: require('../../assets/image/header/live-active-icon.png'),
                },
                {
                    id: 3,
                    name: '赛事',
                    path: '/match',
                    icon: require('../../assets/image/header/match-icon.png'),
                    activeIcon: require('../../assets/image/header/match-active-icon.png'),
                },
                {
                    id: 4,
                    name: '有料',
                    path: '/concern',
                    icon: require('../../assets/image/header/plants-icon.png'),
                    activeIcon: require('../../assets/image/header/plants-active-icon.png'),
                },
                {
                    id: 5,
                    name: '我的',
                    path: '/my',
                    icon: require('../../assets/image/header/me-icon.png'),
                    activeIcon: require('../../assets/image/header/me-active-icon.png'),
                },
            ],
        };
    },
    components: {},
    watch: {},
    mounted() {
        this.$utils.getDeviceId();
    },
    methods: {
        toPage(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="scss">
.header-box {
    width: 100%;
    height: 65px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    background: #fff;
    .nav-list {
        width: 100%;
        height: 100%;
        @include flexBetweenCenter();
        padding: 0 26px;
        .nav-item {
            width: 25px;
            @include flexColumnCenter();
            img {
                width: 23px;
                height: 23px;
                margin-bottom: 5px;
            }
            span {
                font-size: 12px;
                color: #989898;
                &.active {
                    color: $primary-color;
                }
            }
        }
    }
}
</style>

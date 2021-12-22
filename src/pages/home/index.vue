<template>
    <div class="home-box">
        <div class="top-nav-list">
            <div
                class="top-nav-item"
                v-for="item in navList"
                :key="item.id"
                :class="{ active: item.id == currentIndex }"
                @click="changeCuerrent(item)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="nav-conent">
            <component
                :is="componentId"
                @changeIndex="changeCuerrent"
            ></component>
        </div>
    </div>
</template>

<script>
import recommend from './recommend';
import allBall from './allBall';
import basketBall from './basketBall';
import footerBall from './footerBall';

export default {
    name: 'home',
    data() {
        return {
            navList: [
                {
                    id: 1,
                    name: '推荐',
                    component: 'recommend',
                },
                {
                    id: 2,
                    name: '全部',
                    component: 'allBall',
                },
                {
                    id: 3,
                    name: '足球',
                    component: 'footerBall',
                },
                {
                    id: 4,
                    name: '篮球',
                    component: 'basketBall',
                },
            ],
            currentIndex: 1,
            componentId: 'recommend',
        };
    },
    components: {
        recommend,
        allBall,
        basketBall,
        footerBall,
    },
    watch: {},
    mounted() {},
    methods: {
        changeCuerrent(val) {
            this.componentId = val.component;
            this.currentIndex = val.id;
        },
    },
};
</script>

<style scoped lang="scss">
.home-box {
    width: 100%;
    .top-nav-list {
        width: 100%;
        background: #fff;
        height: 46px;
        @include flexStartCenter();
        padding: 0 16px;
        .top-nav-item {
            font-size: 16px;

            color: #666666;
            @include flexColumnCenter();
            margin-right: 24px;
            &.active {
                color: #282828;

                &::after {
                    display: block;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background: linear-gradient(
                        180deg,
                        #ff8d86 0%,
                        #f8413d 100%
                    );
                    border-radius: 1px;
                    transform: translateY(5px);
                }
            }
        }
    }
    .nav-conent {
        width: 100%;
    }
}
</style>

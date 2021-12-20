<template>
    <div class="home-box">
        <div class="top-nav-list">
            <div
                class="top-nav-item"
                v-for="item in navList"
                :key="item.id"
                :class="{ active: item.id == currentIndex }"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="nav-conent">
            <Recommend></Recommend>
        </div>
    </div>
</template>

<script>
import Recommend from './recommend';
export default {
    name: 'home',
    data() {
        return {
            navList: [
                {
                    id: 1,
                    name: '推荐',
                },
                {
                    id: 2,
                    name: '足球',
                },
                {
                    id: 3,
                    name: '篮球',
                },
                {
                    id: 4,
                    name: '其他',
                },
            ],
            currentIndex: 1,
        };
    },
    components: {
        Recommend,
    },
    watch: {},
    mounted() {},
    methods: {},
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
    .nav-conent{
        width: 100%;
    }
}
</style>

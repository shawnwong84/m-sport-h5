<template>
    <div class="down-box">
        <div class="down-logo">
            <img src="../../assets/image/down/logo-icon.png" alt="" />
        </div>
        <div class="down-title">
            <span class="name">M体育</span>
            <span class="des">顶级体育赛事直播APP</span>
        </div>
        <div class="down-btn" @click="downApp">
            <img src="../../assets/image/down/down-top-btn.png" alt="" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { judgeClient } from '../../utils/tools';
export default {
    name: 'down',
    data() {
        return {
            iosUrl: '',
            androidUrl: '',
        };
    },
    components: {},
    watch: {
        getDownAddress(val) {
            this.iosUrl = val.ios;
            this.androidUrl = val.android;
        },
    },
    computed: {
        ...mapGetters({
            getDownAddress: 'getDownAddress',
        }),
    },
    mounted() {},
    methods: {
        downApp() {
            if (this.$route.path === '/down') {
                if (judgeClient() == 'IOS') {
                    window.location.href = this.iosUrl;
                } else if (judgeClient() == 'Android') {
                    window.location.href = this.androidUrl;
                }
            } else {
                this.$router.push('/down');
            }
        },
    },
};
</script>

<style scoped lang="scss">
.down-box {
    width: 100%;
    height: 57px;
    @include bgurl('../../assets/image/down/down-top-bg.png');
    @include flexBetweenCenter();
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .down-logo {
        width: 51px;
        height: 51px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .down-title {
        flex: 1;
        @include flexColumnStart2();
        margin-left: 5px;
        .name {
            font-size: 16px;
            display: block;
            margin-bottom: 5px;
            color: #ffffff;
        }
        .des {
            font-size: 12px;

            color: #ffffff;
        }
    }
    .down-btn {
        width: 98px;
        height: 33px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>

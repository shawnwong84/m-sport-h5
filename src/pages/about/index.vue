<template>
    <div class="about-box">
        <van-nav-bar title="关于" left-arrow @click-left="$router.back()" />
        <div class="about-content">
            <img src="../../assets/image/logo.png" alt="" class="logo" />
            <h2 class="title">M体育</h2>
            <p class="des">1.0</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {};
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="scss">
.about-box {
    width: 100%;

    .about-content {
        width: 100%;
        @include flexColumnStart();
        .logo {
            width: 142px;
            height: 142px;
            margin-top: 50px;
        }
        .title {
            font-size: 24px;
            color: #282828;
            margin: 5px 0;
        }
        .des {
            color: #646464;
            font-size: 18px;
        }
    }
}
</style>

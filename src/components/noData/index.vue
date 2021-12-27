<template>
    <div class="no-data-box">
        <img src="../../assets/image/no-data.png" alt="" />
        <span>暂无数据</span>
    </div>
</template>

<script>
export default {
    name: 'noData',
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
.no-data-box {
    width: 100%;
    padding: 20px 0;
    @include flexColumnCenter();
    img {
        width: 285px;
        height: 229px;
        margin-bottom: 36px;
    }
    span {
        color: #605656;
        font-size: 14px;
    }
}
</style>

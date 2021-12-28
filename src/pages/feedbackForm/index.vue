<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="feedback-form-box">
        <van-nav-bar
            title="我的反馈"
            left-arrow
            @click-left="$router.back()"
        ></van-nav-bar>
        <div class="feedback-form">
             
        </div>
    </div>
</template>

<script>
export default {
    name: 'feedbackForm',
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
.feedback-form-box {
    width: 100%;

}
</style>

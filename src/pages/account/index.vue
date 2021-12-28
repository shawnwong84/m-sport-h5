<template>
    <div class="account-box">
        <van-nav-bar title="账号绑定" left-arrow @click-left="$router.back()" />
        <div class="">
            <van-cell
                title="手机号"
                is-link
                to="/accountChange"
                :value="getUserInfo.phone"
            />
            <van-cell title="修改密码" is-link to="/password?type=2" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'account',
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapGetters({
            getUserInfo: 'getUserInfo',
        }),
    },
    watch: {},
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="scss">
.account-box {
    width: 100%;
}
</style>

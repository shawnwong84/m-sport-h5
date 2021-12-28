<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="setting-box">
        <van-nav-bar title="设置" left-arrow @click-left="$router.back()" />
        <div class="setting-nav">
            <van-cell title="账号绑定" is-link to="/account" />
            <van-cell title="关于" is-link to="/about" />
            <van-cell title="隐私协议" is-link to="/privacy" />
            <van-cell title="用户协议" is-link to="/agreement" />
        </div>
        <div class="loginout-btn" v-if="token">
            <van-button type="primary" block @click="loginOut">
                退出登录
            </van-button>
        </div>
    </div>
</template>

<script>
import Cookie from '../../api/cookie.js';
export default {
    name: 'setting',
    data() {
        return {
            token: Cookie.get('token'),
        };
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {
        loginOut() {
            this.$axios('post', '/user/loginOut').then((res) => {
                if (res.code === 200) {
                    this.$toast({ message: '退出登录成功' });
                    Cookie.remove('token');
                    this.$router.push('/');
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.setting-box {
    width: 100%;
    min-height: 100vh;
    position: relative;

    .setting-nav {
        margin-top: 5px;
        width: 100%;
    }
    .loginout-btn {
        position: absolute;
        z-index: 9;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
    }
}
</style>

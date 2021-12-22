<template>
    <div class="login">
        <div style="margin-left: -10px" @click="goBack">
            <img src="../../assets/image/back.png" width="20px" />
        </div>
        <div class="fs-30 fw-700">登录</div>
        <div class="user-agreement">
            <span>注册登录即代表你已同意</span>
            <span class="c-ff" @click="toPage('agreement')">《用户协议》</span
            ><span class="c-ff" @click="toPage('privacy')">《隐私协议》</span>
        </div>
        <div class="fx align-items input-mobile">
            <div class="fx">
                <div>+86</div>
                <div class="triangle"></div>
            </div>
            <div class="width-100">
                <input
                    type="text"
                    v-model="phone"
                    class="width-100"
                    placeholder="输入手机号码"
                />
            </div>
        </div>
        <div class="fx justify-between input-mobile">
            <div class="width-100">
                <input
                    type="password"
                    v-if="isEye === 1"
                    class="width-100"
                    v-model="password"
                    placeholder="输入6-24位登录密码"
                />
                <input
                    type="text"
                    v-if="isEye === 2"
                    class="width-100"
                    v-model="password"
                    placeholder="输入6-24位登录密码"
                />
            </div>
            <div class="fx align-items">
                <img
                    @click="clear()"
                    src="../../assets/image/input-close.png"
                    width="25px"
                />
                <img
                    class="ml-20"
                    v-if="isEye === 1"
                    src="../../assets/image/pwd-eye.png"
                    @click="checkEye"
                    width="20px"
                />
                <img
                    class="ml-20"
                    v-if="isEye === 2"
                    src="../../assets/image/pwd-eye-active.png"
                    @click="checkEye"
                    width="20px"
                />
            </div>
        </div>
        <div
            class="submit"
            :class="phone !== '' && password !== '' ? 'active' : ''"
            @click="loginH5"
        >
            登录
        </div>
        <div class="fx justify-between">
            <div @click="toPage('password')">忘记密码</div>
            <div @click="toPage('register')">快速注册</div>
        </div>
    </div>
</template>

<script>
import Cookie from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            isEye: 1,
            password: '',
            phone: '',
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        toPage(name) {
            this.$router.push({ name: name });
        },
        clear() {
            this.password = '';
        },
        checkEye() {
            if (this.isEye === 1) {
                this.isEye = 2;
            } else {
                this.isEye = 1;
            }
        },
        loginH5() {
            let param = {
                password: this.password,
                phone: this.phone,
            };
            this.$axios('post', '/user/loginByPc', param).then((res) => {
                if (res.code === 200) {
                    Cookie.set('token', res.data);
                    // sessionStorage.setItem('token', res.data)
                    // Cookie.set('token', res.data, '/', 'hszhibo.live')
                    this.$router.push({ name: 'home' });
                }
            });
        },
    },
};
</script>

<style scoped>
.login {
    padding: 10px 25px;
}
.fs-30 {
    font-size: 28px;
    margin-top: 50px;
    /*margin-left: 10px;*/
}
.user-agreement {
    font-size: 12px;
    color: #8f8f8f;
    /*margin-left: 10px;*/
}
.c-ff {
    color: #f8413d;
}
.input-mobile {
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    margin-top: 10px;
}
.triangle {
    border: 5px solid transparent;
    border-top-color: #f8413d;
    transform: translateY(49%);
    margin-left: 5px;
    margin-right: 10px;
}
.submit {
    width: 100%;
    line-height: 60px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 50px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #bcc7d4;
    background-color: #f2f4f7;
}
.active {
    color: white;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
}
.width-100 {
    width: 100%;
}
</style>

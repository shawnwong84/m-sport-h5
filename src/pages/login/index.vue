<template>
    <div class="login-box">
        <h2 class="title">登录</h2>
        <div class="user-agreement">
            <span>注册登录即代表你已同意</span>
            <span class="agreement-text" @click="toPage('/agreement')"
                >《用户协议》</span
            ><span class="agreement-text" @click="toPage('/privacy')"
                >《隐私协议》</span
            >
        </div>
        <div class="close-icon" @click="$router.back()">
            <img src="../../assets/image/login/close-icon.png" alt="" />
        </div>
        <div class="user-form">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="phone"
                    name="phone"
                    label="+86"
                    placeholder="请输入手机号"
                    :rules="[{ required: true, message: '请输入手机号' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                />
                <div class="sub-btn">
                    <van-button block type="primary" native-type="submit"
                        >确定</van-button
                    >
                </div>
            </van-form>
        </div>
        <div class="user-register" @click="toPage('/register')">快速注册</div>
    </div>
</template>

<script>
import Cookie from '../../api/cookie.js';
export default {
    name: 'login',
    data() {
        return {
            password: '',
            phone: '',
        };
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {
        onSubmit(values) {
            console.log('submit', values);
            this.$axios('post', '/user/loginByPc', values).then((res) => {
                if (res.code === 200) {
                    Cookie.set('token', res.data);
                    this.toPage('/');
                }
            });
        },
        toPage(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="scss">
.login-box {
    width: 100%;
    min-height: 100%;
    @include bgurl('../../assets/image/login/login-bg.png');
    background-attachment: fixed;
    position: relative;
    padding: 22px;
    .close-icon {
        position: absolute;
        top: 22px;
        left: 22px;
        z-index: 9;
        width: 16px;
        height: 16px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .title {
        margin-top: 64px;
        color: #333333;
        font-size: 20px;
    }
    .user-form {
        margin-top: 50px;
        ::v-deep .van-cell {
            background: none;
            padding: 12px 0;
        }
        ::v-deep .van-button--primary {
            background: linear-gradient(
                90deg,
                #ff8d86 0%,
                #f8413d 100%
            ) !important;
            border: none;
        }
        .sub-btn {
            margin-top: 50px;
        }
    }
    .user-agreement {
        width: 100%;
        margin: 20px 0;
        span {
            color: #aeaeae;
            font-size: 14px;
        }
        .agreement-text {
            color: $primary-color;
            display: inline-block;
        }
    }
    .user-register {
        width: 100%;
        @include flexEndCenter();
        margin-top: 40px;
        color: $primary-color;
        font-size: 14px;
        text-decoration: underline;
    }
}
</style>

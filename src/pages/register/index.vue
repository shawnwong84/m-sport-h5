<template>
    <div class="register-box">
        <h2 class="title">注册</h2>
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
                    v-model="smsCode"
                    center
                    clearable
                    label="验证码"
                    placeholder="请输入验证码"
                    :rules="[{ required: true, message: '请输入验证码' }]"
                >
                    <template #button>
                        <div class="sms-btn" @click="sendSms">
                            {{ codeMsg }}
                        </div>
                    </template>
                </van-field>
                <van-field
                    v-model="nickName"
                    name="nickName"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]"
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
        <div class="user-login" @click="toPage('/login')">快速登录</div>
    </div>
</template>

<script>
import Cookie from '../../api/cookie.js';
export default {
    name: 'login',
    data() {
        return {
            // 倒计时秒数
            countdown: 60,
            // 按钮上的文字
            codeMsg: '获取验证码',
            // 定时器
            timer: null,
            password: '',
            phone: '',
            smsCode: '',
            nickName: '',
        };
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {
        // 获取验证码
        getCode() {
            // 验证码60秒倒计时
            if (!this.timer) {
                this.timer = setInterval(() => {
                    if (this.countdown > 0 && this.countdown <= 60) {
                        this.countdown--;
                        if (this.countdown !== 0) {
                            this.codeMsg = this.countdown + 'S';
                        } else {
                            clearInterval(this.timer);
                            this.codeMsg = '获取验证码';
                            this.countdown = 60;
                            this.timer = null;
                        }
                    }
                }, 1000);
            }
        },
        sendSms() {
            if (!this.phone) {
                this.$toast({ message: '请输入手机号' });
                return;
            }
            let param = {
                phone: this.phone,
            };
            this.$axios('post', '/user/sendSms', param).then((res) => {
                if (res.code === 200) {
                    this.getCode();
                }
            });
        },
        onSubmit(values) {
            console.log('submit', values);
            this.$axios('post', '/user/registerByPc', values).then((res) => {
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
.register-box {
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
        .sms-btn {
            background: linear-gradient(
                90deg,
                #ff8d86 0%,
                #f8413d 100%
            ) !important;
            padding: 0 10px;
            height: 36px;
            border-radius: 2px;
            @include flexCenter();
            font-size: 12px;
            color: #fff;
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
    .user-login {
        width: 100%;
        @include flexEndCenter();
        margin-top: 40px;
        color: $primary-color;
        font-size: 14px;
        text-decoration: underline;
    }
}
</style>

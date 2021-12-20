<template>
    <div class="login">
        <div style="margin-left: -10px" class="fx justify-between">
            <div @click="$utils.goBack">
                <img src="../../assets/image/back.png" width="20px" />
            </div>
            <div class="fs-18 fw-700 c-ff" @click="toPage('login')">登录</div>
        </div>
        <div class="fs-30 fw-700">注册</div>
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
                    class="width-100"
                    v-model="phone"
                    placeholder="输入手机号码"
                />
            </div>
        </div>
        <div class="fx justify-between input-mobile">
            <div class="width-100">
                <input
                    type="text"
                    class="width-100"
                    v-model="smsCode"
                    placeholder="输入验证码"
                />
            </div>
            <div>
                <input
                    type="button"
                    class="getNumber"
                    v-model="codeMsg"
                    @click="sendSms"
                    :disabled="codeDisabled"
                />
            </div>
        </div>
        <div class="input-mobile width-100">
            <input
                type="text"
                class="width-100"
                v-model="nickName"
                placeholder="输入用户名"
            />
        </div>
        <div class="fx justify-between input-mobile">
            <div class="width-100">
                <input
                    type="password"
                    class="width-100"
                    v-if="isEye === 1"
                    v-model="password"
                    placeholder="输入6-24位登录密码"
                />
                <input
                    type="text"
                    class="width-100"
                    v-if="isEye === 2"
                    v-model="password"
                    placeholder="输入6-24位登录密码"
                />
            </div>
            <div class="fx align-items">
                <img
                    src="../../assets/image/input-close.png"
                    width="25px"
                    @click="clearPwd"
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
            :class="
                password !== '' && phone !== '' && smsCode !== ''
                    ? 'active'
                    : ''
            "
            @click="getReg"
        >
            注册
        </div>
    </div>
</template>

<script>
import { Cookie } from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            isEye: 1,
            // 是否禁用按钮
            codeDisabled: false,
            // 倒计时秒数
            countdown: 60,
            // 按钮上的文字
            codeMsg: '获取验证码',
            // 定时器
            timer: null,
            phone: '',
            smsCode: '',
            nickName: '',
            password: '',
        };
    },
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
                            this.codeDisabled = true;
                        } else {
                            clearInterval(this.timer);
                            this.codeMsg = '获取验证码';
                            this.countdown = 60;
                            this.timer = null;
                            this.codeDisabled = false;
                        }
                    }
                }, 1000);
            }
        },
        sendSms() {
            let param = {
                phone: this.phone,
            };
            this.$axios('post', '/user/sendSms', param).then((res) => {
                if (res.code === 200) {
                    this.getCode();
                    // this.matchList = res.data.matchLists
                }
            });
        },
        getReg() {
            let param = {
                channelId: 0,
                nickName: this.nickName,
                password: this.password,
                phone: this.phone,
                smsCode: this.smsCode,
            };
            this.$axios('post', '/user/registerByPc', param).then((res) => {
                if (res.code === 200) {
                    Cookie.set('token', res.data);
                    // // sessionStorage.setItem('token', res.data)
                    // Cookie.set('token', res.data, '/', 'hszhibo.live')
                    this.$router.push({ name: 'home' });
                }
            });
        },
        clearPwd() {
            this.password = '';
        },
        toPage(name) {
            this.$router.push({ name: name });
        },
        checkEye() {
            if (this.isEye === 1) {
                this.isEye = 2;
            } else {
                this.isEye = 1;
            }
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
    color: #dbb170;
}
.input-mobile {
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    margin-top: 10px;
}
.triangle {
    border: 5px solid transparent;
    border-top-color: #dbb170;
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
    color: #fff;
    background: linear-gradient(132deg, #ebcbab 0%, #dbb170 100%);
}
.width-100 {
    width: 100%;
}
</style>

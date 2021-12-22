<template>
    <div>
        <v-down></v-down>
        <div class="back" @click="$utils.goBack">
            <img src="../../assets/image/back.png" width="20px" />
        </div>
        <div class="fx align-items justify-center mt-10">
            <div class="fs-20 fw-700">{{ title }}</div>
        </div>
        <div class="phone-box" v-if="num === 1">
            <div class="c-9D">为了账户安全，我们需要验证身份</div>
            <div class="mt-5 fs-20 fw-700">+86 {{ phone }}</div>
            <div class="mt-20 fx justify-between nav-info">
                <div class="">
                    <input
                        type="text"
                        v-model="code"
                        placeholder="请输入验证码"
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
            <div class="mt-20 fw-700 nav-info" v-if="isShowPwd">
                <input
                    type="text"
                    class="ml-10"
                    v-model="pwd"
                    placeholder="请输入新密码"
                />
            </div>
            <div class="red">{{ erro }}</div>
            <div
                class="next-btn"
                v-if="pageType === 2 && !isShowPwd"
                :class="code !== '' ? 'active' : ''"
                @click="next"
            >
                下一步
            </div>
            <div
                class="next-btn"
                v-if="pageType === 1"
                :class="code !== '' ? 'active' : ''"
                @click="updatePhoneSt"
            >
                下一步
            </div>
            <div
                class="next-btn"
                v-if="pageType === 2 && isShowPwd"
                :class="code !== '' && pwd !== '' ? 'active' : ''"
                @click="forgotPassword"
            >
                提交
            </div>
        </div>
        <div class="phone-box" v-if="num === 2 && pageType === 1">
            <div class="mt-5 fw-700 nav-info">
                +86<input
                    type="text"
                    class="ml-10"
                    v-model="phone"
                    placeholder="请输入手机号"
                />
            </div>
            <div class="mt-20 fx justify-between nav-info">
                <div class="">
                    <input
                        type="text"
                        v-model="code"
                        placeholder="请输入验证码"
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
            <div class="red">{{ erro }}</div>
            <div
                class="next-btn"
                :class="code !== '' ? 'active' : ''"
                @click="updatePhoneNd"
            >
                提交
            </div>
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index';
import Cookie from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            phone: this.$route.query.phone,
            pageType: this.$route.query.pageType,
            title: '',
            pwd: '',
            erro: '',
            isShowPwd: false,
            num: 1,
            code: '',
            // 是否禁用按钮
            codeDisabled: false,
            // 倒计时秒数
            countdown: 60,
            // 按钮上的文字
            codeMsg: '获取验证码',
        };
    },
    components: { 'v-down': down },
    mounted() {
        if (this.pageType === 1) {
            this.title = '改绑手机';
        } else {
            this.title = '修改密码';
        }
    },
    methods: {
        // 修改密码
        forgotPassword() {
            let param = {
                password: this.pwd,
                phone: this.phone,
                smsCode: this.code,
            };
            this.$axios('post', '/user/forgotPassword', param).then((res) => {
                if (res.code === 200) {
                    this.$toast({
                        message: '修改密码成功，请重新登录！',
                    });
                    Cookie.remove('token');
                    this.$router.push({ name: 'login' });
                }
            });
        },
        next() {
            this.isShowPwd = true;
        },
        // 验证手机
        updatePhoneSt() {
            if (this.code === '') {
                this.erro = '请输入验证码';
            } else {
                let param = {
                    smsCode: this.code,
                };
                this.$axios('post', '/user/updatePhoneSt', param).then(
                    (res) => {
                        if (res.code === 200) {
                            this.erro = '';
                            this.num = 2;
                            this.code = '';
                            this.phone = '';
                            clearInterval(this.timer);
                            this.codeMsg = '获取验证码';
                            this.countdown = 60;
                            this.timer = null;
                            this.codeDisabled = false;
                        }
                    },
                );
            }
        },
        // 绑定手机
        updatePhoneNd() {
            if (this.phone === '') {
                this.erro = '请输入手机号';
            } else if (this.code === '') {
                this.erro = '请输入验证码';
            } else {
                let param = {
                    phone: this.phone,
                    smsCode: this.code,
                };
                this.$axios('post', '/user/updatePhoneByApp', param).then(
                    (res) => {
                        if (res.code === 200) {
                            this.erro = '';
                            this.$toast({
                                message: '修改手机号成功，请重新登录！',
                            });
                            Cookie.remove('token');
                            this.$router.push({ name: 'login' });
                        }
                    },
                );
            }
        },
        // 发送验证码
        sendSms() {
            let param = {
                phone: this.phone,
            };
            this.$axios('post', '/user/sendSms', param).then((res) => {
                if (res.code === 200) {
                    this.getCode();
                }
            });
        },
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
    },
};
</script>

<style scoped>
.back {
    position: absolute;
    top: 75px;
    left: 15px;
}
.red {
    color: red;
}
.nav-info {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.phone-box {
    padding: 20px;
}
.next-btn {
    width: 100%;
    line-height: 60px;
    border-radius: 50px;
    color: #bcc7d4;
    text-align: center;
    margin-top: 50px;
    background: rgb(242, 244, 247);
}
.active {
    background: linear-gradient(132deg, #ebcbab 0%, #dbb170 100%);
    color: white;
}
</style>

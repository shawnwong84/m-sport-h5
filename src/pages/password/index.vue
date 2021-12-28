<template>
    <div class="password-box">
        <van-nav-bar
            :title="$route.query.type == 1 ? '忘记密码' : '修改密码'"
            left-arrow
            @click-left="$router.back()"
        />
        <div class="password-form">
            <van-form @submit="forgotPassword">
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
                    name="smsCode"
                    :rules="[{ required: true, message: '请输入验证码' }]"
                    maxlength="8"
                >
                    <template #button>
                        <div class="sms-btn" @click="sendSms">
                            {{ codeMsg }}
                        </div>
                    </template>
                </van-field>
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px">
                    <van-button block type="primary" native-type="submit"
                        >确定</van-button
                    >
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'password',
    data() {
        return {
            phone: '',
            smsCode: '',
            password: '',
            codeMsg: '获取验证码',
            timer: null,
            countdown: 60,
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
                } else {
                    this.$toast({
                        message: res.msg,
                    });
                }
            });
        },
        // 修改密码
        forgotPassword() {
            let param = {
                password: this.pwd,
                phone: this.phone,
                smsCode: this.smsCode,
            };
            this.$axios('post', '/user/forgotPassword', param).then((res) => {
                if (res.code === 200) {
                    this.$toast({
                        message: '修改密码成功',
                    });
                    this.$router.push('/login');
                }
            });
        },
    },
    destroyed() {
        this.timer = null;
    },
};
</script>

<style scoped lang="scss">
.password-box {
    width: 100%;

    .password-form {
        width: 100%;
        margin-top: 5px;
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
}
</style>

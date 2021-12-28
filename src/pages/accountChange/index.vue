<template>
    <div class="account-change-box">
        <van-nav-bar
            title="修改绑定手机"
            left-arrow
            @click-left="$router.back()"
        />
        <div class="accpunt-change-form">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="getUserInfo.phone"
                    name="phone"
                    label="+86"
                    disabled
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
                <div class="sub-btn">
                    <van-button block type="primary" native-type="submit"
                        >确定</van-button
                    >
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'accountChange',
    data() {
        return {
            // 倒计时秒数
            countdown: 60,
            // 按钮上的文字
            codeMsg: '获取验证码',
            // 定时器
            timer: null,

            smsCode: '',
        };
    },
    components: {},
    computed: {
        ...mapGetters({
            getUserInfo: 'getUserInfo',
        }),
    },
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
            let param = {
                phone: this.getUserInfo.phone,
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

        onSubmit(values) {
            console.log('submit', values);
            let param = {
                phone: this.getUserInfo.phone,
                smsCode: this.smsCode,
            };
            this.$axios('post', '/user/updatePhoneByApp', param).then((res) => {
                if (res.code === 200) {
                    this.$toast({
                        message: '修改手机号成功，请重新登录！',
                    });
                    Cookie.remove('token');
                    this.$router.push('/login');
                } else {
                    this.$toast({
                        message: res.msg,
                    });
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.account-change-box {
    width: 100%;
    .accpunt-change-form {
        width: 100%;
        background: #fff;
        padding: 16px;
        .sub-btn {
            margin: 50px 0 20px;
            padding: 0 10px;
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
}
</style>

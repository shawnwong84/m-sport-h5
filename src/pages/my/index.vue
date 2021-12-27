<template>
    <div class="my-box">
        <div class="my-login">
            <div class="my-avatar">
                <img
                    :src="
                        token
                            ? infoData.avatarUrl
                            : require('../../assets/image/my/my-avatar.png')
                    "
                    alt=""
                />
            </div>
            <div class="to-login" v-if="!token">
                <div class="login-btn" @click="userlogin">登录/注册</div>
                <div class="login-des">登陆后获取更多精彩内容~</div>
            </div>
            <div class="login-info" v-if="token" @click="toPage('/myDetail')">
                <div class="name">{{ infoData.userName }}</div>
                <div class="level">
                    等级：<span>{{ infoData.level }}</span>
                </div>
            </div>
            <div class="right-icon" v-if="token">
                <img src="../../assets/image/my/right-icon.png" alt="" />
            </div>
        </div>
        <div class="gold-box">
            <div class="left">
                <img src="../../assets/image/my/gold-icon.png" alt="" />
                <span>{{ token ? infoData.gold : 0 }}</span>
            </div>
            <div class="right">
                <span>金币</span>
                <img src="../../assets/image/my/right-icon.png" alt="" />
            </div>
        </div>
        <div class="my-nav">
            <div
                class="nav-item"
                v-for="item in navList"
                :key="item.id"
                @click="toPage(item.path)"
            >
                <div class="left">
                    <img :src="item.icon" alt="" />
                    <span>{{ item.name }}</span>
                </div>
                <div class="right">
                    <img src="../../assets/image/my/right-icon.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Cookie } from '../../api/cookie';
export default {
    name: 'my',
    data() {
        return {
            navList: [
                {
                    id: 0,
                    name: '消息中心',
                    path: '/message',
                    icon: require('../../assets/image/my/follow-icon.png'),
                },
                {
                    id: 1,
                    name: '意见反馈',
                    path: '/feedbackList',
                    icon: require('../../assets/image/my/idea-icon.png'),
                },
                {
                    id: 2,
                    name: '设置',
                    path: '',
                    icon: require('../../assets/image/my/setting-icon.png'),
                },
            ],
            token: Cookie.get('token'),
            infoData: {},
        };
    },
    components: {},
    watch: {},
    mounted() {
        if (this.token) {
            this.getInfo();
        }
    },
    methods: {
        userlogin() {
            this.$router.push('/login');
        },
        getInfo() {
            this.$axios('post', '/user/userInfo').then((res) => {
                if (res.code === 200) {
                    this.infoData = res.data;
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
.my-box {
    width: 100%;
    height: 100%;
    background: url('../../assets/image//my/my-bg.png');
    background-position: top;
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 16px;
    .my-login {
        width: 100%;
        @include flexBetweenCenter();
        margin-top: 20px;
        .my-avatar {
            width: 62px;
            height: 62px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
        .to-login {
            flex: 1;
            margin-left: 22px;
            @include flexColumnStart2();
            .login-btn {
                width: 99px;
                height: 28px;
                background: #f8413d;
                border-radius: 14px;
                @include flexCenter();
                font-size: 16px;
                color: #fff;
            }
            .login-des {
                font-size: 12px;
                color: #666666;
                margin-top: 5px;
            }
        }
        .login-info {
            flex: 1;
            margin-left: 22px;
            @include flexColumnStart2();
            .name {
                font-weight: 500;
                color: #282828;
                font-size: 20px;
            }
            .level {
                font-size: 12px;
                color: #666666;
                margin-top: 5px;
            }
        }
        .right-icon {
            img {
                width: 12px;
                height: auto;
            }
        }
    }
    .gold-box {
        width: 100%;
        height: 56px;
        padding: 0 16px;
        margin: 27px 0 14px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #ffffff;
        @include flexBetweenCenter();
        .left {
            @include flexCenter();
            img {
                width: 21px;
                height: 21px;
                margin-right: 8px;
            }
            span {
                font-size: 18px;
                color: #282828;
            }
        }
        .right {
            @include flexCenter();
            img {
                width: 12px;
                height: 12px;
                margin-left: 5px;
            }
            span {
                font-size: 14px;
                color: #282828;
            }
        }
    }
    .my-nav {
        width: 100%;
        background: #ffffff;
        border-radius: 4px;
        .nav-item {
            width: 100%;
            height: 43px;
            padding: 0 16px;
            @include flexBetweenCenter();
            &:not(:last-child) {
                border-bottom: 1px solid #f1f1f1;
            }
        }
        .left {
            @include flexCenter();
            img {
                width: 20px;
                height: auto;
                margin-right: 8px;
            }
            span {
                font-size: 12px;
            }
        }
        .right {
            width: 12px;
            height: 12px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>

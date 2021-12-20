<template>
    <div class="main">
        <router-view class="content"></router-view>
        <!--      <div class="footer-wraper" v-if="isDown && $route.name === 'home'">-->
        <!--        <div class="fx align-items">-->
        <!--          <div @click="close"><img src="../assets/image/screen-close.png" width="40px"/></div>-->
        <!--          <div class="ml-10"><img src="../assets/image/logo1.png" width="120px"/></div>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <div class="btn-add-screen ml-10" @click="down">下载app</div>-->
        <!--        </div>-->
        <!--      </div>-->
        <div class="container-wrap">
            <div class="container fx justify-between">
                <div class="li" @click="toPage('match')">
                    <div>
                        <img
                            v-if="$route.name === 'match'"
                            src="../assets/image/1(2).png"
                        />
                        <img v-else src="../assets/image/1(6).png" />
                    </div>
                    <div :class="$route.name === 'match' ? 'c-de' : ''">
                        赛事
                    </div>
                </div>
                <div class="li" @click="toPage('new')">
                    <div>
                        <img
                            v-if="$route.name === 'new'"
                            src="../assets/image/2.png"
                        />
                        <img v-else src="../assets/image/2(1).png" />
                    </div>
                    <div :class="$route.name === 'new' ? 'c-de' : ''">资讯</div>
                </div>
                <div class="li" @click="toPage('home')">
                    <div>
                        <img
                            v-if="$route.name === 'home'"
                            src="../assets/image/1.png"
                        />
                        <img v-else src="../assets/image/1(4).png" />
                    </div>
                    <div :class="$route.name === 'home' ? 'c-de' : ''">
                        直播
                    </div>
                </div>
                <div class="li" @click="toPage('concern')">
                    <div>
                        <img
                            v-if="$route.name === 'concern'"
                            src="../assets/image/1(1).png"
                        />
                        <img v-else src="../assets/image/1(5).png" />
                    </div>
                    <div :class="$route.name === 'concern' ? 'c-de' : ''">
                        有料
                    </div>
                </div>
                <div class="li" @click="toPage('my')">
                    <div>
                        <img
                            v-if="$route.name === 'my'"
                            src="../assets/image/1(3).png"
                        />
                        <img v-else src="../assets/image/1(7).png" />
                    </div>
                    <div :class="$route.name === 'my' ? 'c-de' : ''">我的</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import down from '../components/down/index.vue';
import { Cookie } from '../api/cookie.js';
export default {
    name: 'index',
    components: { 'v-down': down },
    data() {
        return {
            isDown: true,
        };
    },
    mounted() {
        this.$utils.getDeviceId();
    },
    methods: {
        down() {
            window.open('http://dl.hszhibo.live');
        },
        close() {
            this.isDown = false;
        },
        toPage(name) {
            if (name === 'my') {
                if (!Cookie.get('token')) {
                    this.$router.push({ name: 'login' });
                } else {
                    this.$router.push({ name: name });
                }
            } else {
                this.$router.push({ name: name });
            }
        },
    },
};
</script>

<style scoped>
.main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
.content {
    flex: 1;
}
.li {
    color: #a8a9a9;
}
.li img {
    width: 28px;
    height: 28px;
}
.c-de {
    color: #deb579;
}
.footer-wraper {
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btn-add-screen {
    color: #fff;
    background: #f8c21b;
    line-height: 30px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 6px;
    padding: 0px 8px;
}
</style>
<style>
.container {
    padding: 0 !important;
}
</style>

<template>
    <div>
        <div
            class="fx align-items justify-between margin-15"
            @click="$utils.toPage('myDetail')"
        >
            <div>
                <img :src="infoData.avatarUrl" class="head-img" />
            </div>
            <div class="fx align-items">
                <div class="fs-24 fw-700">{{ infoData.userName }}</div>
                <div class="ml-5">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <div class="live fx justify-between">
            <div class="ta-c">
                <div class="fs-24 fw-700">Lv.{{ infoData.level }}</div>
                <div>等级</div>
            </div>
            <div class="top-down-center"></div>
            <div class="ta-c">
                <div class="fs-24 fw-700">{{ infoData.gold }}</div>
                <div>金币</div>
            </div>
        </div>
        <div class="border-gray"></div>
        <div
            class="fx align-items justify-between margin-15 border-bottom pb-15"
            @click="$utils.toPage('message')"
        >
            <div class="fx align-items">
                <div>
                    <img src="../../assets/image/xiaoxi.png" width="25px" />
                </div>
                <div class="ml-10">消息中心</div>
            </div>
            <div>
                <img src="../../assets/image/jiankuohao.png" width="10px" />
            </div>
        </div>
        <div
            class="fx align-items justify-between margin-15 border-bottom pb-15"
            @click="$utils.toPage('feedbackList')"
        >
            <div class="fx align-items">
                <div>
                    <img src="../../assets/image/fankui.png" width="25px" />
                </div>
                <div class="ml-10">我的反馈</div>
            </div>
            <div>
                <img src="../../assets/image/jiankuohao.png" width="10px" />
            </div>
        </div>
        <div
            class="fx align-items justify-between margin-15 border-bottom pb-15"
            @click="topPage(infoData.phone)"
        >
            <div class="fx align-items">
                <div>
                    <img src="../../assets/image/zhanghao.png" width="25px" />
                </div>
                <div class="ml-10">账号与绑定</div>
            </div>
            <div>
                <img src="../../assets/image/jiankuohao.png" width="10px" />
            </div>
        </div>
        <div
            class="fx align-items justify-between margin-15 border-bottom pb-15"
            @click="$utils.toPage('about')"
        >
            <div class="fx align-items">
                <div>
                    <img src="../../assets/image/guanyu.png" width="25px" />
                </div>
                <div class="ml-10">关于</div>
            </div>
            <div>
                <img src="../../assets/image/jiankuohao.png" width="10px" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            infoData: [],
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        topPage(phone) {
            this.$router.push({ name: 'account', query: { phone: phone } });
        },
        getInfo() {
            this.$axios('post', '/user/userInfo').then((res) => {
                if (res.code === 200) {
                    this.infoData = res.data;
                }
            });
        },
    },
};
</script>

<style scoped>
.head-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.fs-24 {
    font-size: 24px;
}
.margin-15 {
    margin: 15px;
}
.top-down-center {
    width: 1px;
    height: 50px;
    background: #ddd;
}
.live {
    margin-right: 20%;
    margin-left: 20%;
}
.border-gray {
    height: 10px;
    background: rgb(244, 244, 244);
    margin-top: 20px;
}
.border-bottom {
    border-bottom: 1px solid #ddd;
}
</style>

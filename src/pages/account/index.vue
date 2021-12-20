<template>
    <div>
        <v-down></v-down>
        <div class="back" @click="$utils.goBack">
            <img src="../../assets/image/back.png" width="20px" />
        </div>
        <div class="fx align-items justify-center mt-10">
            <div class="fs-20 fw-700">账号与绑定</div>
        </div>
        <div
            class="fx justify-between align-items nav-info mt-10"
            @click="topPage(phone, 1)"
        >
            <div class="fs-18">手机号</div>
            <div class="fx align-items">
                <div class="fs-18 c-9D">{{ phone }}</div>
                <div class="ml-10">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <div
            class="fx justify-between align-items nav-info"
            @click="topPage(phone, 2)"
        >
            <div class="fs-18">修改密码</div>
            <div>
                <img src="../../assets/image/jiankuohao.png" width="10px" />
            </div>
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index';
export default {
    name: 'index',
    data() {
        return {
            phone: this.$route.query.phone,
        };
    },
    components: { 'v-down': down },
    methods: {
        topPage(phone, pageType) {
            this.$router.push({
                name: 'accountChange',
                query: { phone: phone, pageType: pageType },
            });
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
.nav-info {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}
</style>

<template>
    <div>
        <v-down></v-down>
        <div class="back" @click="$utils.goBack">
            <img src="../../assets/image/back.png" width="20px" />
        </div>
        <div class="fx align-items justify-center mt-10">
            <div class="fs-20 fw-700">关于</div>
        </div>
        <div class="foot-img">
            <img src="../../assets/image/fade-logo1.png" width="100px" />
        </div>
        <div class="ta-c fs-20 fw-700 mt-20">xx直播</div>
        <div class="ta-c fs-12 c-9D mt-5">1.0.0</div>
        <div class="c-9D bottom">Copyright © 2021</div>
    </div>
</template>

<script>
import down from '../../components/down/index';
export default {
    name: 'index',
    components: { 'v-down': down },
};
</script>

<style scoped>
.back {
    position: absolute;
    top: 64px;
    left: 15px;
}
.foot-img {
    display: flex;
    justify-content: center;
    margin-top: 40%;
}
.bottom {
    width: 100%;
    position: absolute;
    bottom: 20px;
    text-align: center;
}
</style>

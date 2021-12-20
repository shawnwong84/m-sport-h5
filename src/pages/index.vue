<template>
    <div class="main">
        <router-view class="content"></router-view>
        <Mheader></Mheader>
    </div>
</template>

<script>
import Mheader from '../components/header';
export default {
    name: 'index',
    components: { Mheader },
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

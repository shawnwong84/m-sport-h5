<template>
    <div class="down-wrap">
        <div class="fx align-items">
            <div>
                <img
                    src="../../assets/image/fade-logo1.png"
                    width="35px"
                    @click="toPage('home')"
                />
            </div>
            <div class="ml-10" style="margin-top: -5px">
                <div class="c-fff fs-18 fw-700">下载xxAPP</div>
                <div class="fs-12 fw-700 c-fff">畅享高清体育直播</div>
            </div>
        </div>
        <div class="fx">
            <!--      <div class="btn-add-screen">添加到主屏幕</div>-->
            <div class="ml-10" @click="down">
                <img src="../../assets/image/down-btn-1.png" width="76px" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    methods: {
        down() {
            window.open('http://dl.hszhibo.live');
        },
        toPage(name) {
            this.$router.push({ name: name });
        },
    },
};
</script>

<style scoped>
.down-wrap {
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 20px 4px 20px;
    /*transform: translateX(-50%);*/
}
.btn-add-screen {
    color: #fff;
    background: linear-gradient(132deg, #ebcbab 0%, #dbb170 100%);
    line-height: 30px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 6px;
    padding: 0px 8px;
}
.c-fff {
    color: #ffffff;
}
</style>

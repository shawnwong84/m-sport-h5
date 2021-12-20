<template>
    <div class="nav_bottom">
        <div class="nav_explain" style="">
            <p>本站所有直播和视频链接均由网友提供，并链接到其他网站播放。</p>
        </div>
        <div class="nav_about">
            <div>
                <div class="nav_con">
                    <a @click="toPage('about', 1)">关于我们</a>
                    <a @click="toPage('about', 2)" class="nav_free">免责声明</a>
                    <a @click="toPage('about', 3)">联系我们</a>
                </div>
                <p class="nav_p">
                    Copyright © 2015-2021 24直播. All Rights Reserved.
                </p>
                <p class="nav_p">粤ICP备19082906号-4</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    methods: {
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
        },
    },
};
</script>

<style scoped></style>

<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="match-item">
        <div class="cover-img">
            <img :src="item.matchCutImg" alt="" />
            <div class="anchor-info">
                <span class="name">{{ item.anchorName }}</span>
                <div class="hot-num">
                    <img src="../../assets/image/fire.png" alt="" />
                    <span>{{ item.hotNum }}</span>
                </div>
            </div>
        </div>
        <div class="match-room">{{ item.roomName }}</div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {};
    },
    props: {
        item: { type: Object },
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="scss">
.match-item {
    width: 169px;
    height: 128px;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 6px;
    .cover-img {
        background: #d8d8d8;
        border-radius: 4px 4px 0px 0px;
        width: 100%;
        height: 102px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px 4px 0px 0px;
        }
        .anchor-info {
            position: absolute;
            width: 100%;
            height: 30px;
            bottom: 0;
            left: 0;
            @include flexBetweenCenter();
            padding: 0 5px;
            .name {
                font-size: 12px;
                color: #ffffff;
                display: inline-block;
                width: 120px;
                @include textEllipsis();
            }
            .hot-num {
                @include flexCenter();
                img {
                    width: 7px;
                    height: auto;
                    margin-right: 3px;
                }
                span {
                    font-size: 12px;
                    color: #ffffff;
                }
            }
        }
    }

    .match-room {
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        padding: 0 5px;
        @include textEllipsis();
    }
}
</style>

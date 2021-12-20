<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="recommend-box">
        <div class="banner-swiper-list">
            <div class="swiper-container recommend-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in bannerList"
                        :key="index"
                    >
                        <img :src="item.picPath" class="banner-img" />
                    </div>
                </div>
                <div class="swiper-pagination recommend-pagination"></div>
            </div>
        </div>
        <div class="match-swiper-list">
            <div class="swiper-container match-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in hotMatchList"
                        :key="index"
                    >
                        <div class="match-league">
                            <div class="league-name">
                                {{ item.matchShortName }}
                            </div>
                            <div class="league-time">
                                <span>今天</span>
                                <span class="time">{{ item.matchTime }}</span>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';

export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
            hotMatchList: [],
        };
    },
    components: {},
    watch: {},
    mounted() {
        this.getBannerList();
        this.getMatch();
    },
    methods: {
        getBannerList() {
            let param = {
                adType: 1,
            };
            this.$axios('post', '/live/getBannerList', param).then((res) => {
                if (res.code === 200) {
                    this.bannerList = res.data;
                    new Swiper('.recommend-container', {
                        speed: 300,
                        loop: true,
                        paginationClickable: true,
                        observer: true, //修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true, //修改swiper的父元素时，自动初始化swiper
                        autoplay: {
                            delay: 3000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false,
                        }, // 可选选项，自动滑动
                        pagination: {
                            el: '.swiper-pagination',
                            bulletActiveClass: 'recommend-bullet-active',
                        },
                    });
                }
            });
        },
        getMatch() {
            this.$axios('post', '/live/getTopMatchList').then((res) => {
                if (res.code === 200) {
                    let list = res.data.matchLists[0];
                    if (list) {
                        this.hotMatchList = list.matchInfos;
                        new Swiper('.match-container', {
                            paginationClickable: true,
                            observer: true, //修改swiper自己或子元素时，自动初始化swiper
                            observeParents: true, //修改swiper的父元素时，自动初始化swiper
                            autoplay: false,
                            slidesPerView: 2,
                            spaceBetween: 10,
                            slidesPerGroup: 2,
                        });
                    }
                }
            });
        },
        matchTime(val) {},
    },
};
</script>

<style scoped lang="scss">
.recommend-box {
    width: 100%;
    padding: 16px;
    .banner-swiper-list {
        width: 100%;
        height: 136px;
        .recommend-container {
            width: 100%;
            height: 136px;
            background: #d8d8d8;
            border-radius: 4px;
            .swiper-slide {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }
        }
        ::v-deep .recommend-bullet-active {
            background: #ff6600;
            opacity: 1;
        }
    }
    .match-swiper-list {
        width: 100%;
        height: 96px;
        margin: 12px 0;
        .match-container {
            width: 100%;
            height: 100%;
            .swiper-slide {
                width: 149px;
                height: 96px;
                background: #ffffff;
                border-radius: 4px;
                .match-league {
                    width: 100%;
                    height: 30px;
                    border-bottom: 1px solid #f3f3f3;
                    @include flexBetweenCenter();
                    padding: 0 7px;
                    .league-name {
                        width: 67px;
                        @include textEllipsis();
                        color: #605656;
                        font-size: 12px;
                    }
                    .league-time {
                        font-size: 12px;
                        color: #282828;
                        .time {
                            display: inline-block;
                            margin-left: 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>

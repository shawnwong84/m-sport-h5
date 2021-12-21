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
                        <div class="match-team">
                            <div class="team-info">
                                <div class="team-name">
                                    <img :src="item.homeTeam.teamIcon" alt="" />
                                    <span> {{ item.homeTeam.teamName }}</span>
                                </div>
                                <div class="team-name">
                                    <img :src="item.awayTeam.teamIcon" alt="" />
                                    <span> {{ item.awayTeam.teamName }}</span>
                                </div>
                            </div>
                            <div
                                class="subscribe"
                                :class="{ already: item.subscribe }"
                                @click="getAppoinment(item)"
                            >
                                {{ item.subscribe ? '已预约' : '预约' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-match" @click="toPage('/match')">
                <img src="../../../assets/image/home/date-icon.png" alt="" />
                <span>全部赛程</span>
            </div>
        </div>
        <div class="notice-box">
            <span class="title">公告</span>
        </div>
        <div class="match-common-box">
            <h2 class="title">正在热播</h2>
            <div class="match-list">
                <matchItem
                    v-for="item in hotList"
                    :key="item.roomId"
                    :item="item"
                ></matchItem>
            </div>
            <div class="check-more">查看更多</div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import { Cookie } from '../../../api/cookie';
import matchItem from '../../../components/matchItem';
export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
            hotMatchList: [],
            hotList: [],
        };
    },
    components: {
        matchItem,
    },
    watch: {},
    mounted() {
        this.getBannerList();
        this.getMatch();
        this.getHotList();
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
        getHotList() {
            let param = {
                pageNum: 1,
                pageSize: 30,
            };
            this.$axios('post', '/live/getHotLiveList', param).then((res) => {
                if (res.code === 200) {
                    this.hotList = res.data.dataList.splice(0, 6);
                }
            });
        },
        // 用户预约
        getAppoinment(item) {
            if (Cookie.get('token')) {
                let param = {
                    id: item.id,
                };
                if (item.subscribe) {
                    this.$axios(
                        'post',
                        '/match/userCancelReserveMatch',
                        param,
                    ).then((res) => {
                        if (res.code === 200) {
                            this.getMatch();
                        }
                    });
                } else {
                    this.$axios('post', '/match/userReserveMatch', param).then(
                        (res) => {
                            if (res.code === 200) {
                                this.getMatch();
                            }
                        },
                    );
                }
            } else {
                this.$router.push('/login');
            }
        },
        toPage(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="scss">
.recommend-box {
    width: 100%;
    padding: 16px 16px 70px;
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
        padding-right: 38px;
        position: relative;
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
                .match-team {
                    width: 100%;
                    @include flexBetweenCenter();
                    padding: 0 8px;
                    .team-info {
                        @include flexColumnCenter();

                        .team-name {
                            @include flexStartCenter();
                            width: 90px;
                            margin: 2px 0;
                            img {
                                width: 20px;
                                height: auto;
                                margin-right: 5px;
                            }
                            span {
                                font-size: 12px;
                                color: #282828;
                                display: inline-block;
                                width: 80px;
                                @include textEllipsis();
                            }
                        }
                    }
                    .subscribe {
                        width: 39px;
                        height: 20px;
                        background: #f8413d;
                        border-radius: 2px;
                        font-size: 12px;
                        color: #fff;
                        @include flexCenter();
                        &.already {
                            color: #f8413d;
                            background: #ffe3e2;
                        }
                    }
                }
            }
        }
        .all-match {
            width: 33px;
            height: 100%;
            background: #ffffff;
            border-radius: 4px;
            @include flexColumnCenter();
            position: absolute;
            top: 0;
            right: 0;
            img {
                width: 12px;
                height: 12px;
                margin-bottom: 4px;
            }
            span {
                writing-mode: vertical-lr;
                font-size: 12px;

                color: #605656;
            }
        }
    }
    .notice-box {
        width: 100%;
        height: 38px;
        background: #ffffff;
        border-radius: 4px;
        @include flexStartCenter();
        margin-bottom: 12px;
        .title {
            font-size: 12px;
            color: $primary-color;
        }
    }
    .match-common-box {
        width: 100%;
        margin-bottom: 12px;
        .title {
            font-size: 16px;
            color: #282828;
            margin-bottom: 12px;
        }
        .match-list {
            width: 100%;
            @include flexBetweenCenterWrap();
        }
        .check-more {
            width: 343px;
            height: 38px;
            background: #ffffff;
            border-radius: 4px;
            color: #666666;
            font-size: 12px;
            margin-top: 12px;
            @include flexCenter();
        }
    }
}
</style>

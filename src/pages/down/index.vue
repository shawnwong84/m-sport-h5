<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="down-app">
        <DownApp></DownApp>
        <div class="down-banner">
            <img
                src="../../assets/image/down/down-person.png"
                alt=""
                class="down-person"
            />
        </div>
        <div class="down-title">
            <h2>全球赛事<span>免费</span>看</h2>
            <h2>高清<span>直播</span>无广告</h2>
        </div>
        <div class="down-des">
            <p>体育视听盛宴 万千佳人相伴</p>
            <p>网红女神赛事直播 行业专家赛前预测</p>
            <p class="address">官网地址：www.mzhibo.cc</p>
        </div>
        <div class="down-swiper">
            <div class="swiper-container down-container">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="item in bannerList"
                        :key="item.id"
                    >
                        <h2 class="title">{{ item.title }}</h2>
                        <p class="des">{{ item.des }}</p>
                        <img :src="item.url" class="banner-img" />
                    </div>
                </div>
                <div class="swiper-pagination down-pagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import { mapActions } from 'vuex';
import DownApp from '../../components/down';
export default {
    name: 'down',
    data() {
        return {
            bannerList: [
                {
                    id: 1,
                    title: '魅力主播解说',
                    des: '看比赛就要一起嗨',
                    url: require('../../assets/image/down/down-swiper1.png'),
                },
                {
                    id: 2,
                    title: '精准赛事分析',
                    des: '专业解读精准分析',
                    url: require('../../assets/image/down/down-swiper2.png'),
                },
                {
                    id: 3,
                    title: '火爆体育社区',
                    des: '志趣相投球聚集地',
                    url: require('../../assets/image/down/down-swiper3.png'),
                },
            ],
        };
    },
    components: {
        DownApp,
    },
    watch: {},
    mounted() {
        this.getAppAddress();
        this.downSwiper();
    },
    methods: {
        ...mapActions({
            setDownAddress: 'setDownAddress',
        }),
        getAppAddress() {
            this.$axios('get', '/download/getDownAddress').then((res) => {
                if (res.code === 200) {
                    this.setDownAddress(res.data);
                }
            });
        },
        downSwiper() {
            this.$nextTick(() => {
                new Swiper('.down-container', {
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
                        bulletActiveClass: 'down-bullet-active',
                    },
                });
            });
        },
    },
};
</script>

<style scoped lang="scss">
.down-app {
    width: 100%;
    padding-top: 57px;
    padding-bottom: 30px;
    min-height: 100vh;
    @include bgurl('../../assets/image/down/down-app-bg.png');

    @include flexColumnStart();
    .down-banner {
        width: 100%;
        @include flexCenter();
        .down-person {
            width: 90%;
        }
    }
    .down-title {
        h2 {
            font-size: 39px;
            text-align: center;
            color: #ffffff;
            span {
                font-size: 39px;
                color: $primary-color;
            }
        }
    }
    .down-des {
        color: #ffffff;
        font-size: 16px;
        margin-top: 9px;
        width: 100%;
        text-align: center;
        .address {
            margin-top: 40px;
        }
    }
    .down-swiper {
        width: 100%;
        margin-top: 60px;

        .down-container {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            .swiper-slide {
                width: 100%;
                height: 100%;
                @include flexColumnStart();
                .title {
                    font-size: 20px;
                    color: #ffffff;
                }
                .des {
                    font-size: 13px;
                    color: #ffffff;
                    margin: 8px 0 5px;
                }

                img {
                    width: 211px;
                    height: auto;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }
        }
        ::v-deep .down-bullet-active {
            background: #ff6600;
            opacity: 1;
        }
    }
}
</style>

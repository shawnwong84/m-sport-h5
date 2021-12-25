<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="news-box">
        <div class="nav-top">
            <div
                class="nav-list"
                v-for="item in tagList"
                :key="item.tagId"
                :class="{ active: id == item.tagId }"
                @click="changeTag(item)"
            >
                {{ item.tagName }}
            </div>
        </div>

        <div class="nav-content">
            <div class="banner-swiper-list">
                <div class="swiper-container news-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item, index) in bannerList"
                            :key="index"
                        >
                            <img :src="item.coverPicture" class="banner-img" />
                        </div>
                    </div>
                    <div class="swiper-pagination news-pagination"></div>
                </div>
            </div>
            <div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getList"
                    :immediate-check="false"
                >
                    <div
                        class="news-list"
                        v-for="item in newsList"
                        :key="item.id"
                        @click="toPage('/newDeatils', item.id)"
                    >
                        <div class="news-title">
                            <h3 class="title">{{ item.title }}</h3>
                            <div class="tag">
                                <div>
                                    <van-tag
                                        type="primary"
                                        v-for="tag in [...item.tags].splice(
                                            0,
                                            3,
                                        )"
                                        :key="tag.id"
                                        >{{ tag.name }}</van-tag
                                    >
                                </div>

                                <div class="zan">
                                    <img
                                        src="../../assets/image/news/zan-icon.png"
                                        alt=""
                                    />
                                    <span>{{ item.fakeLike }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="news-cover">
                            <img :src="item.coverPicture" alt="" />
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'news',
    data() {
        return {
            tagList: [],
            id: '',
            newsList: [],
            bannerList: [],
            loading: false,
            finished: false,
            pageNum: 1,
        };
    },
    components: {},
    watch: {},
    mounted() {
        this.getArticleAllTagList();
        this.getTopArticleList();
    },
    methods: {
        getArticleAllTagList() {
            this.$axios('get', '/article/getArticleTopTagList').then((res) => {
                if (res.code === 200) {
                    this.tagList = res.data;
                    this.id = this.tagList[0].tagId;
                    this.getList();
                }
            });
        },
        changeTag(val) {
            this.id = val.tagId;
            this.pageNum = 1;
            this.newsList = [];
            this.getList();
        },
        getList() {
            this.loading = true;
            let param = {
                pageNum: this.pageNum++,
                pageSize: 10,
                tagId: this.id,
            };
            this.$axios('post', '/article/getArticleListByTagId', param).then(
                (res) => {
                    this.loading = false;
                    if (res.code === 200) {
                        this.newsList = this.newsList.concat(res.data.dataList);
                    }
                    if (res.data.dataList && res.data.dataList.length === 0) {
                        this.finished = true;
                    }
                },
            );
        },
        getTopArticleList() {
            this.$axios('get', '/article/getTopArticleList').then((res) => {
                if (res.code === 200) {
                    this.bannerList = res.data;

                    this.$nextTick(() => {
                        new Swiper('.news-container', {
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
                                bulletActiveClass: 'news-bullet-active',
                            },
                        });
                    });
                }
            });
        },
        toPage(path, id) {
            this.$router.push({ path: path, query: { id: id } });
        },
    },
};
</script>

<style scoped lang="scss">
.news-box {
    width: 100%;

    .nav-top {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        background: #fff;
        height: 46px;
        @include flexStartCenter();
        padding: 0 16px;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 19;

        .nav-list {
            font-size: 16px;
            min-width: 60px;

            color: #666666;
            @include flexColumnCenter();
            margin-right: 6px;
            &.active {
                color: #282828;

                &::after {
                    display: block;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background: linear-gradient(
                        180deg,
                        #ff8d86 0%,
                        #f8413d 100%
                    );
                    border-radius: 1px;
                    transform: translateY(5px);
                }
            }
        }
    }
    .nav-content {
        width: 100%;
        padding: 16px;
        .banner-swiper-list {
            width: 100%;
            height: 136px;
            .news-container {
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
            ::v-deep .news-bullet-active {
                background: #ff6600;
                opacity: 1;
            }
        }
        .news-list {
            width: 100%;
            background-color: #fff;
            @include flexBetweenCenter();
            padding: 10px;
            &:not(:last-child) {
                border-bottom: 1px solid #f1f1f1;
            }
            ::v-deep {
                .van-tag--primary {
                    color: $primary-color;
                    background: #ffe3e2;
                    margin-right: 6px;
                }
            }
            .news-title {
                flex: 1;
                margin-right: 20px;
                .title {
                    width: 183px;
                    color: #282828;
                    font-size: 16px;
                    margin-bottom: 30px;
                }
                .tag {
                    width: 100%;
                    @include flexBetweenCenter();
                    .zan {
                        @include flexCenter();
                        img {
                            width: 12px;
                            height: 12px;
                            margin-right: 3px;
                        }
                        span {
                            color: #aeaeae;
                            font-size: 12px;
                        }
                    }
                }
            }
            .news-cover {
                width: 120px;
                height: 74px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>

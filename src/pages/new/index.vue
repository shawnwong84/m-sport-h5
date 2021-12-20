<template>
    <div>
        <div class="new" id="newBox">
            <v-down style="position: fixed; width: 100%; z-index: 99"></v-down>
            <div class="home-header">
                <div
                    v-for="(item, index) in tagList"
                    @click="checkNum(item.tagId, index)"
                    :class="num === index ? 'active' : ''"
                >
                    <span>{{ item.tagName }}</span>
                </div>
            </div>
            <div
                class="swiper-container new-swiper"
                style="margin: 10px"
                v-if="num === 0"
            >
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in bannerList"
                        :key="index"
                        @click="toPage('newDeatils', item.id)"
                    >
                        <img :src="item.coverPicture" class="banner-img" />
                    </div>
                </div>
            </div>
            <div
                class="fx align-items justify-between new-list"
                v-for="(item, index) in newList"
                :key="index"
                @click="toPage('newDeatils', item.id)"
            >
                <div>
                    <div class="fs-16">{{ item.title }}</div>
                    <div class="fx align-items mt-10">
                        <div class="fx align-items">
                            <div
                                v-for="(value, i) in item.tags"
                                :key="i"
                                v-if="i < 3"
                                class="tags text-overflow"
                            >
                                {{ value.name }}
                            </div>
                        </div>
                        <div class="c-9D fs-12">
                            <img
                                src="../../assets/image/zan.png"
                                width="10px"
                                class="mr-5"
                            />{{ item.fakeLike }}
                        </div>
                    </div>
                </div>
                <div class="ml-10">
                    <img :src="item.coverPicture" class="new-img" />
                </div>
            </div>
            <!--    <v-footer></v-footer>-->
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import Swiper from 'swiper';
import down from '../../components/down/index';
// import footer from '../../components/footer/index.vue'
export default {
    name: 'index',
    data() {
        return {
            pageNo: 1,
            newList: [],
            num: 0,
            id: 0,
            bannerList: [],
            tagList: [],
        };
    },
    components: { 'v-down': down },
    mounted() {
        this.getArticleAllTagList();
        this.getTopArticleList();
    },
    // components: {
    //   'v-footer': footer
    // },
    created() {
        this.$nextTick(() => {
            const el = document.getElementById('newBox');
            const offsetHeight = el.offsetHeight;
            el.onscroll = () => {
                const scrollTop = el.scrollTop;
                const scrollHeight = el.scrollHeight;
                if (offsetHeight + scrollTop - scrollHeight >= -1) {
                    console.log('到底了');
                    Indicator.open({
                        text: '加载更多...',
                        spinnerType: 'fading-circle',
                    });
                    this.loadMore();
                }
            };
        });
    },
    methods: {
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
        },
        loadMore() {
            this.pageNo++;
            this.getList();
        },
        getArticleAllTagList() {
            this.$axios('get', '/article/getArticleTopTagList').then((res) => {
                if (res.code === 200) {
                    this.tagList = res.data;
                    this.id = this.tagList[0].tagId;
                    this.getList();
                }
            });
        },
        getTopArticleList() {
            this.$axios('get', '/article/getTopArticleList').then((res) => {
                if (res.code === 200) {
                    this.bannerList = res.data;
                    // eslint-disable-next-line no-unused-vars,no-new
                    new Swiper('.new-swiper', {
                        speed: 300,
                        loop: true,
                        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                        autoplay: {
                            delay: 3000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false,
                        }, // 可选选项，自动滑动
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    });
                }
            });
        },
        checkNum(id, index) {
            this.newList = [];
            this.id = id;
            this.num = index;
            this.getList();
        },
        getList() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
                tagId: this.id,
            };
            this.$axios('post', '/article/getArticleListByTagId', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.newList = this.newList.concat(res.data.dataList);
                        Indicator.close();
                    }
                },
            );
        },
    },
};
</script>

<style scoped>
.home-header {
    background: #ffffff;
    color: #282828;
    line-height: 45px;
    display: flex;
    margin-top: 55px;
}
.home-header > div {
    width: 80px;
    text-align: center;
    font-size: 16px;
}
.active span {
    font-size: 18px;
    border-bottom: 3px solid #dbb170;
    padding-bottom: 5px;
    font-weight: 700;
}
.new {
    position: absolute;
    top: 0px;
    bottom: 60px;
    left: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
}
.new-list {
    margin: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
}
.new-img {
    border-radius: 5px;
    width: 110px;
}
.tags {
    font-size: 12px;
    color: #007aff;
    margin-right: 10px;
    background: rgba(0, 122, 255, 0.1);
    padding: 2px 3px;
}
.banner-img {
    width: 100%;
    height: 165px;
    /*object-fit: cover;*/
}
.swiper-slide img {
    border-radius: 10px;
}
</style>

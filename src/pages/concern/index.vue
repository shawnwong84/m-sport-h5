<template>
    <div class="concern">
        <div class="home-content" id="homeBox">
            <v-down style="position: fixed; width: 100%; z-index: 99"></v-down>
            <div class="search" @click="toPage2('search')">
                <img src="../../assets/image/sou.png" width="18px" />
            </div>
            <div class="home-header" style="margin-top: 56px">
                <div>有料</div>
            </div>
            <div style="padding: 10px 15px 80px 15px">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item, index) in bannerList"
                            :key="index"
                        >
                            <img :src="item.picPath" class="banner-img" />
                        </div>
                    </div>
                </div>
                <div class="fx align-items justify-between mt-10">
                    <div class="fx">
                        <div style="margin-top: 2px">
                            <img src="../../assets/image/jxzj.png" />
                        </div>
                        <div class="c-28 ml-5">精选专家</div>
                    </div>
                    <div class="fx align-items">
                        <div
                            :class="tab === 1 ? 'tab-li' : 'tab'"
                            @click="changeTab(1)"
                        >
                            名家
                        </div>
                        <div
                            :class="tab === 1 || tab === 2 ? '' : 'xian'"
                        ></div>
                        <div
                            :class="tab === 2 ? 'tab-li' : 'tab'"
                            @click="changeTab(2)"
                        >
                            胜率
                        </div>
                        <div
                            :class="tab === 3 || tab === 2 ? '' : 'xian'"
                        ></div>
                        <div
                            :class="tab === 3 ? 'tab-li' : 'tab'"
                            @click="changeTab(3)"
                        >
                            连红
                        </div>
                    </div>
                </div>
                <div class="fx align-items flex-wrap">
                    <div
                        v-for="(item, index) in expertsList"
                        :key="index"
                        class="mt-15 anchorBox"
                        @click="toPage('featuredExperts', item.anchorId)"
                    >
                        <div class="ta-c">
                            <div>
                                <img :src="item.anchorIcon" class="zj-img" />
                            </div>
                            <div
                                style="margin-top: -10px; height: 19px"
                                v-if="item.tagName[0]"
                            >
                                <div class="tabName">{{ item.tagName[0] }}</div>
                            </div>
                            <div class="anchorName">{{ item.anchorName }}</div>
                        </div>
                    </div>
                </div>
                <div class="matchBox">
                    <div
                        class="fx justify-between"
                        v-if="hotMatchList && hotMatchList.length !== 0"
                    >
                        <div class="fx">
                            <div style="margin-top: 2px">
                                <img src="../../assets/image/jdsc.png" />
                            </div>
                            <div class="c-28 ml-5">焦点赛程</div>
                        </div>
                        <div class="fx align-items" @click="toPage2('match')">
                            <div class="c-9D fs-12">完整</div>
                            <div class="ml-5">
                                <img src="../../assets/image/gengduo2.png" />
                            </div>
                        </div>
                    </div>
                    <div
                        class="fx align-items matches_list-box"
                        v-if="hotMatchList && hotMatchList.length !== 0"
                    >
                        <div
                            class="matches_list"
                            v-for="(item, index) in hotMatchList"
                            :key="index"
                            @click="toDeatils(item.id, item.sportsId)"
                        >
                            <div class="fx align-items">
                                <div>
                                    <div class="fs-12 c-a8">
                                        {{ item.matchShortName }}&nbsp;{{
                                            item.matchTime
                                        }}
                                    </div>
                                    <div
                                        class="fx align-items justify-between mt-5"
                                    >
                                        <div class="fx align-items">
                                            <div>
                                                <img
                                                    :src="item.homeLogo"
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                            </div>
                                            <div
                                                class="ml-10 mr-15 fs-13 awayTeam-teamName"
                                            >
                                                {{ item.homeName }}
                                            </div>
                                        </div>
                                        <div class="odds">
                                            {{ item.flatOdds }}
                                        </div>
                                        <div class="odds ml-10">
                                            {{ item.homeOdds }}
                                        </div>
                                    </div>
                                    <div
                                        class="fx align-items justify-between mt-5"
                                    >
                                        <div class="fx align-items">
                                            <div>
                                                <img
                                                    :src="item.awayLogo"
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                            </div>
                                            <div
                                                class="ml-10 mr-15 fs-13 awayTeam-teamName"
                                            >
                                                {{ item.awayName }}
                                            </div>
                                        </div>
                                        <div class="odds">
                                            {{ item.awayOdds }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fx">
                        <div
                            class="pb-2 fs-15"
                            :class="sportType === 0 ? 'active' : ''"
                            @click="changeType(0)"
                        >
                            足球
                        </div>
                        <div class="ml-5">
                            <img src="../../assets/image/shangla-icon.png" />
                        </div>
                        <div
                            class="ml-20 fs-15 pb-2"
                            :class="sportType === 1 ? 'active' : ''"
                            @click="changeType(1)"
                        >
                            蓝球
                        </div>
                        <div class="ml-5">
                            <img src="../../assets/image/shangla-icon.png" />
                        </div>
                    </div>
                </div>
                <div
                    v-for="(item, index) in hotRankList"
                    :key="index"
                    style="
                        border-bottom: 1px solid #f0f0f1;
                        padding-bottom: 20px;
                    "
                    @click="toPage('hotBank', item.id)"
                >
                    <div
                        class="fx justify-between pt-10 pb-10"
                        style="border-bottom: 1px solid #f0f0f1"
                    >
                        <div class="fx">
                            <div>
                                <img
                                    :src="item.expert.anchorIcon"
                                    class="anchorIcon"
                                />
                            </div>
                            <div class="ml-10">
                                <div class="fs-15">
                                    {{ item.expert.anchorName }}
                                </div>
                                <div class="fx mt-2">
                                    <div
                                        class="tabName mr-5"
                                        v-if="item.expert.tagName[0]"
                                    >
                                        {{ item.expert.tagName[0] }}
                                    </div>
                                    <div
                                        class="continuousWin"
                                        v-if="item.expert.continuousWin > 0"
                                    >
                                        {{ item.expert.continuousWin }}连红
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="c-red fs-20">
                                {{ item.expert.winRate }}%
                            </div>
                            <div class="c-9D fs-12" style="text-align: right">
                                {{ item.expert.sum }}中{{ item.expert.wins }}
                            </div>
                        </div>
                    </div>
                    <div class="mt-10 fs-16">
                        {{ item.matchInfo.teamHomeName }}-{{
                            item.matchInfo.teamAwayName
                        }},挑战赛
                    </div>
                    <div class="matchInfo fx align-items justify-between">
                        <div style="width: 30%">
                            <div>{{ item.matchInfo.matchShortName }}</div>
                            <div>
                                {{ item.matchInfo.matchDay }}
                                {{ item.matchInfo.matchTime }}
                            </div>
                        </div>
                        <div class="teamHomeName">
                            {{ item.matchInfo.teamHomeName }} vs
                            {{ item.matchInfo.teamAwayName }}
                        </div>
                        <div><img src="../../assets/image/gengduo2.png" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import Swiper from 'swiper';
import down from '../../components/down/index';
export default {
    name: 'index',
    data() {
        return {
            hotList: [],
            ballList: [],
            hotMatchList: [],
            bannerList: [],
            hotRankList: [],
            expertsList: [],
            num: -1,
            pageNo: 1,
            sportType: 0,
            tab: 1,
        };
    },
    components: { 'v-down': down },
    created() {
        this.$nextTick(() => {
            const el = document.getElementById('homeBox');
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
    mounted() {
        this.getMatch();
        this.getBannerList();
        this.featuredExpertsList();
        this.getHotRankListByBall();
    },
    methods: {
        loadMore() {
            this.pageNo++;
            this.getHotRankListByBall();
        },
        changeTab(num) {
            this.tab = num;
            this.featuredExpertsList();
        },
        changeType(num) {
            this.hotRankList = [];
            this.pageNo = 1;
            this.sportType = num;
            this.getHotRankListByBall();
        },
        // 热门专家
        featuredExpertsList() {
            let param = {
                type: this.tab,
            };
            this.$axios('post', '/hotRank/featuredExpertsList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.expertsList = res.data;
                    }
                },
            );
        },
        // 红榜
        getHotRankListByBall() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
                type: this.sportType,
            };
            this.$axios('post', '/hotRank/getHotRankListByBall', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.hotRankList = this.hotRankList.concat(
                            res.data.dataList,
                        );
                        Indicator.close();
                    }
                },
            );
        },
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
        },
        toPage2(name) {
            this.$router.push({ name: name });
        },
        // 焦点赛程
        getMatch() {
            let param = {
                pageNum: 1,
                pageSize: 15,
            };
            this.$axios('post', '/hotRank/getFocusScheduleList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.hotMatchList = res.data.dataList;
                    }
                },
            );
        },
        getBannerList() {
            let param = {
                adType: 5,
            };
            this.$axios('post', '/live/getBannerList', param).then((res) => {
                if (res.code === 200) {
                    this.bannerList = res.data;
                    // eslint-disable-next-line no-unused-vars,no-new
                    new Swiper('.swiper-container', {
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
        toDeatils(id, type) {
            // console.log(id, type)
            if (type === '0') {
                this.$router.push({
                    name: 'deatils',
                    query: { matchId: id, hotBank: 1 },
                });
            }
            if (type === '1') {
                this.$router.push({
                    name: 'basketDeatils',
                    query: { matchId: id, hotBank: 1 },
                });
            }
        },
    },
};
</script>

<style scoped>
.search {
    position: absolute;
    top: 75px;
    left: 15px;
}
.home-header {
    height: 50px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    box-shadow: 0px -2px 15px 3px rgba(238, 235, 235, 0.91);
    -webkit-box-shadow: 0px -2px 15px 3px rgba(238, 235, 235, 0.91);
    -moz-box-shadow: 0px -2px 15px 3px rgba(238, 235, 235, 0.91);
    border-bottom: 1px solid rgba(238, 235, 235, 0.91);
}
.avatar {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin-left: -5px;
}
.swiper-slide img {
    border-radius: 10px;
}

.home-content {
    /*margin: 15px;*/
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
}
.bg-f6 {
    background: #f6f7f8;
}
.bg-fff {
    background: white;
}
.matches_list-box {
    width: 100%;
    /*height: 50px;*/
    white-space: nowrap;
    margin-top: 10px;
    /*background: #3179FF;*/
    overflow: hidden;
    overflow-x: scroll; /* 1 */
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-overflow-scrolling: touch; /* 2 */
    text-align: justify; /* 3 */
    margin-bottom: 20px;
}
.matches_list {
    /*border-right: 1px solid #ddd;*/
    padding: 8px 10px;
    background: #feffff;
    border-radius: 3px;
    box-sizing: border-box;
    border-right: 1px solid #f0f0f1;
}
.awayTeam-teamName {
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.banner-img {
    width: 100%;
    height: 165px;
    object-fit: cover;
}

.c-28 {
    color: #282828;
}
.tab {
    font-size: 12px;
    color: #a06325;
    padding: 2px 10px;
}
.tab-li {
    background: linear-gradient(145deg, #ff8d86 0%, #f8413d 100%);
    border-radius: 3px;
    color: white;
    padding: 0px 10px;
    font-size: 12px;
}
.xian {
    width: 1px;
    height: 10px;
    background: #ff8d86;
}
.zj-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #e0b982;
}
.anchorBox {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}
.tabName {
    background: #fbefe3;
    border-radius: 20px;
    color: #a06325;
    padding: 1px 5px;
    font-size: 12px;
    position: relative;
}
.anchorName {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #282828;
    font-size: 13px;
    margin-top: 5px;
}
.c-a8 {
    color: #a8a9a9;
}
.matchBox {
    background: #f6f7f8;
    margin-top: 15px;
    margin-right: -15px;
    margin-left: -15px;
    padding: 15px 15px 10px 15px;
}
.odds {
    background: #f6f7f8;
    border-radius: 1px;
    color: #a8a9a9;
    width: 46px;
    height: 17px;
    text-align: center;
}
.active {
    border-bottom: 3px solid #f8413d;
    font-weight: 600;
}
.anchorIcon {
    width: 31px;
    height: 31px;
    border: 1px solid #e0b982;
    border-radius: 100%;
    margin-top: 5px;
}
.continuousWin {
    background: #e05c54;
    border-radius: 20px;
    color: white;
    padding: 1px 5px;
    font-size: 12px;
}
.c-red {
    color: #e05c54;
    font-weight: 600;
}
.matchInfo {
    height: 46px;
    background: #f4f8f9;
    font-size: 12px;
    color: #999aa9;
    margin-top: 10px;
    padding: 10px;
}
.teamHomeName {
    width: 65%;
    border-left: 1px solid #edeeef;
    text-align: center;
    font-size: 13px;
}
.pb-2 {
    padding-bottom: 2px;
}
</style>

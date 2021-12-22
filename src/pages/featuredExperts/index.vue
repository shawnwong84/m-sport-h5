<template>
    <div class="concern">
        <div class="home-header">
            <div class="pt-15 ml-15" @click="$utils.goBack">
                <img src="../../assets/image/go-back-icon.png" />
            </div>
            <div class="fx">
                <div>
                    <img :src="expertsList.anchorIcon" class="expertIcon" />
                </div>
                <div style="width: 100%; margin-right: 15px">
                    <div class="fx align-items justify-between mt-10">
                        <div>
                            <div class="fs-16 ml-10 fw-700">
                                {{ expertsList.anchorName }}
                            </div>
                            <div class="ml-10 fs-12 mt-2">
                                关注{{ expertsList.follows }}
                            </div>
                        </div>
                        <div
                            class="follows-btn"
                            v-if="!expertsList.follow"
                            @click="focusExpert"
                        >
                            +&nbsp;关注
                        </div>
                        <div
                            class="follows-btn"
                            v-if="expertsList.follow"
                            @click="cancelFocusExpert"
                        >
                            已关注
                        </div>
                    </div>
                    <div class="ml-10 mt-2 fs-12 expertDesc">
                        {{ expertsList.anchorDesc }}
                    </div>
                </div>
            </div>
            <div class="fx justify-between">
                <div class="title">
                    <span
                        :class="isTitle === 1 ? 'title-li' : ''"
                        @click="checkTitle(1)"
                        >资讯</span
                    >
                </div>
                <div class="title">
                    <span
                        :class="isTitle === 2 ? 'title-li' : ''"
                        @click="checkTitle(2)"
                        >有料</span
                    >
                </div>
            </div>
        </div>
        <div class="home-content" id="homeBox">
            <div v-if="isTitle === 1" class="mt-20">
                <div v-if="newList && newList.length !== 0">
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
                </div>
                <div v-if="newList.length === 0">
                    <div class="ta-c" style="margin-top: 20%">
                        <div>
                            <img
                                src="../../assets/image/no-data.png"
                                width="120px"
                            />
                        </div>
                        <div class="c-9D">暂无数据</div>
                    </div>
                </div>
            </div>
            <div v-if="isTitle === 2">
                <div class="matchBox">
                    <div
                        class="fs-15 c-28 fw-700 pt-15 pr-15 pl-15"
                        v-if="
                            expertsList.record &&
                            expertsList.record.length !== 0
                        "
                    >
                        近期战绩
                    </div>
                    <div
                        class="fx align-items justify-between mt-10 pr-15 pl-15"
                        v-if="
                            expertsList.record &&
                            expertsList.record.length !== 0
                        "
                    >
                        <div class="fs-12 c-9D">近</div>
                        <div
                            v-for="(item, index) in expertsList.record"
                            :key="index"
                            class="record"
                            :class="item === '红' ? 'bg-red' : 'gary'"
                        >
                            {{ item }}
                        </div>
                        <div class="fs-12 c-9D">远</div>
                    </div>
                    <div
                        class="pb-10 fx pt-15 pr-15 pl-15"
                        v-if="hotRankList && hotRankList.length !== 0"
                    >
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
                    class="hotRankList"
                    @click="toPage('hotBank', item.id)"
                >
                    <div class="mt-10 fs-16">
                        {{ getWeek('2021-' + item.matchInfo.matchDay)
                        }}{{ item.matchInfo.matchShortName }}：
                        {{ item.matchInfo.teamHomeName }}&nbsp;VS&nbsp;{{
                            item.matchInfo.teamAwayName
                        }}
                    </div>
                    <div class="matchInfo fx align-items justify-between">
                        <div style="width: 23%">
                            <div>{{ item.matchInfo.matchShortName }}</div>
                            <div>
                                {{ item.matchInfo.matchDay }}
                                {{ item.matchInfo.matchTime }}
                            </div>
                        </div>
                        <div class="teamHomeName">
                            {{ item.matchInfo.teamHomeName }}
                            <span class="score"
                                >{{ item.matchInfo.homeScore }}-{{
                                    item.matchInfo.awayScore
                                }}</span
                            >
                            {{ item.matchInfo.teamAwayName }}
                        </div>
                        <div><img src="../../assets/image/gengduo2.png" /></div>
                    </div>
                    <div class="fx mt-10">
                        <div
                            class="jingcai fx justify-center"
                            v-if="sportType === 0"
                        >
                            <div style="margin-top: 2px; margin-right: 3px">
                                <img src="../../assets/image/rq.png" />
                            </div>
                            <div>竞足</div>
                        </div>
                        <div
                            class="jingcai fx justify-center"
                            v-if="sportType === 1"
                        >
                            <div style="margin-top: 2px; margin-right: 3px">
                                <img src="../../assets/image/rq.png" />
                            </div>
                            <div>竞篮</div>
                        </div>
                        <div class="ml-10 fs-12 c-9D">
                            {{ item.expert.beforeTime }}
                        </div>
                    </div>
                </div>
                <div v-if="hotRankList.length === 0">
                    <div class="ta-c" style="margin-top: 20%">
                        <div>
                            <img
                                src="../../assets/image/no-data.png"
                                width="120px"
                            />
                        </div>
                        <div class="c-9D">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
    name: 'index',
    data() {
        return {
            hotList: [],
            ballList: [],
            hotMatchList: [],
            newList: [],
            bannerList: [],
            hotRankList: [],
            expertsList: [],
            num: -1,
            pageNo: 1,
            sportType: 0,
            tab: 1,
            isTitle: 2,
        };
    },
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
        this.featuredExpertsList();
        this.getHotRankListByBall();
        this.getNewList();
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
        checkTitle(num) {
            this.isTitle = num;
        },
        changeType(num) {
            this.hotRankList = [];
            this.pageNo = 1;
            this.sportType = num;
            this.getHotRankListByBall();
        },
        getNewList() {
            let param = {
                pageNum: 1,
                pageSize: 30,
                tagId: 0,
                authorId: this.$route.query.id,
            };
            this.$axios('post', '/article/getArticleListByTagId', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.newList = res.data.dataList;
                    }
                },
            );
        },
        // 专家详情
        featuredExpertsList() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/hotRank/getExpertInfo', param).then((res) => {
                if (res.code === 200) {
                    this.expertsList = res.data;
                }
            });
        },
        // 关注
        focusExpert() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/hotRank/focusExpert', param).then((res) => {
                if (res.code === 200) {
                    this.featuredExpertsList();
                }
            });
        },
        // 取消关注
        cancelFocusExpert() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/hotRank/cancelFocusExpert', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.featuredExpertsList();
                    }
                },
            );
        },
        // 红榜
        getHotRankListByBall() {
            let param = {
                expertId: this.$route.query.id,
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
        // 获取周几
        getWeek(num) {
            var strTime = num; // 字符串日期格式
            var date = new Date(Date.parse(strTime.replace(/-/g, '/')));
            var a = ['日', '一', '二', '三', '四', '五', '六'];
            var week = date.getDay();
            return '周' + a[week];
        },
        toDeatils(id, type) {
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
    top: 20px;
    left: 15px;
}
.home-header {
    height: 190px;
    background: linear-gradient(177deg, #ff8d86 0%, #f8413d 100%);
    color: #ffffff;
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
    top: 190px;
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
.expertIcon {
    width: 48px;
    height: 48px;
    border: 1px solid #e0b982;
    border-radius: 50%;
    margin-top: 10px;
    margin-left: 15px;
}
.follows-btn {
    width: 56px;
    line-height: 23px;
    border-radius: 3px;
    border: 1px solid #ffffff;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
}
.record {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}
.gary {
    background: #b5bacd;
}
.bg-red {
    background: #fe5f5a;
}
.expertDesc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 50px;
    margin-bottom: 10px;
}
.mt-2 {
    margin-top: 2px;
}
.jingcai {
    width: 50px;
    height: 19px;
    background: #fef5e4;
    border-radius: 3px;
    color: #deb06e;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
}
.hotRankList {
    border-bottom: 5px solid #f6f7f8;
    padding: 0px 15px 15px 15px;
}
.title {
    font-size: 15px;
    text-align: center;
    width: 50%;
    margin-top: 5px;
}
.title span {
    padding-bottom: 6px;
}
.title-li {
    border-bottom: 2px solid white;
    font-weight: 700;
}
/*资讯ui*/
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
.score {
    background: #b5bacd;
    border-radius: 1px;
    color: white;
    font-size: 12px;
    padding: 0px 3px;
    margin-right: 5px;
    margin-left: 5px;
}
</style>

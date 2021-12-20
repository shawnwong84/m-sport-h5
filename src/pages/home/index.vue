<template>
    <div class="bg-f6">
        <div class="home-content" id="homeBox">
            <v-down style="position: fixed; width: 100%; z-index: 99"></v-down>
            <div style="padding-top: 56px">
                <div class="home-header">
                    <div
                        :class="num === -1 ? 'active' : ''"
                        @click="checkNum(-1)"
                    >
                        <span>推荐</span>
                    </div>
                    <div
                        :class="num === 0 ? 'active' : ''"
                        @click="checkNum(0)"
                    >
                        <span>足球</span>
                    </div>
                    <div
                        :class="num === 1 ? 'active' : ''"
                        @click="checkNum(1)"
                    >
                        <span>篮球</span>
                    </div>
                    <div
                        :class="num === 2 ? 'active' : ''"
                        @click="checkNum(2)"
                    >
                        <span>其他</span>
                    </div>
                </div>
                <div class="padding" v-if="num === -1">
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
                    <div
                        class="fx align-items matches_list-box"
                        v-if="hotMatchList[0]"
                    >
                        <div
                            class="matches_list"
                            v-for="(item, index) in hotMatchList[0].matchInfos"
                            :key="index"
                            v-if="item.status !== 4"
                            @click="toDeatils(item.id, item.sportsType)"
                        >
                            <div class="fx align-items">
                                <div>
                                    <div class="fx align-items justify-between">
                                        <div class="fx align-items">
                                            <div>
                                                <img
                                                    :src="
                                                        item.homeTeam.teamIcon
                                                    "
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                            </div>
                                            <div
                                                class="ml-10 mr-15 fs-13 awayTeam-teamName"
                                            >
                                                {{ item.homeTeam.teamName }}
                                            </div>
                                        </div>
                                        <div v-if="item.status !== 2">
                                            {{ item.homeTeam.score }}
                                        </div>
                                    </div>
                                    <div
                                        class="fx align-items justify-between mt-5"
                                    >
                                        <div class="fx align-items">
                                            <div>
                                                <img
                                                    :src="
                                                        item.awayTeam.teamIcon
                                                    "
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                            </div>
                                            <div
                                                class="ml-10 mr-15 fs-13 awayTeam-teamName"
                                            >
                                                {{ item.awayTeam.teamName }}
                                            </div>
                                        </div>
                                        <div v-if="item.status !== 2">
                                            {{ item.awayTeam.score }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="fs-12 ta-c matchTime"
                                    v-if="item.status === 2"
                                >
                                    <div>今天</div>
                                    <div>{{ item.matchTime }}</div>
                                </div>
                            </div>
                            <div class="fx justify-between mt-10">
                                <div class="c-9D fs-12 awayTeam-teamName">
                                    {{ item.matchShortName }}
                                </div>
                                <div>
                                    <div v-if="item.status === 1" class="fx">
                                        <div class="fs-12 red mr-10">
                                            直播中
                                        </div>
                                        <div class="fx" v-if="item.guides">
                                            <div
                                                v-for="(
                                                    value, i
                                                ) in item.guides"
                                                :key="i"
                                                v-if="i < 3"
                                            >
                                                <img
                                                    :src="value.avatar"
                                                    class="avatar"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        v-if="
                                            item.status === 2 && !item.subscribe
                                        "
                                        class="appoinment yellow"
                                        @click="getAppoinment(item)"
                                        >预约</span
                                    >
                                    <span
                                        v-if="
                                            item.status === 2 && item.subscribe
                                        "
                                        class="appoinment gray"
                                        @click="userCancelReserveMatch(item)"
                                        >已预约</span
                                    >
                                    <span v-if="item.status === 3">已结束</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fs-20 fw-700 fx mt-10">
                        <div style="padding-top: 2px; padding-right: 10px">
                            <img
                                src="../../assets/image/live-btn.png"
                                width="22px"
                            />
                        </div>
                        <div>正在热播</div>
                    </div>
                    <div
                        class="fx justify-between flex-wrap"
                        style="margin-top: -10px"
                    >
                        <div
                            class="new-box"
                            v-for="(item, index) in hotList"
                            :key="index"
                            @click="toPage('room', item.roomId)"
                        >
                            <div class="fx jian">
                                <div class="living">
                                    <div>
                                        <img
                                            src="../../assets/image/living.gif"
                                            width="10px"
                                        />
                                    </div>
                                    <div class="ml-5">Live</div>
                                </div>
                                <div class="ml-5" v-if="item.recommend === 1">
                                    <img
                                        src="../../assets/image/jian.png"
                                        width="17px"
                                    />
                                </div>
                            </div>
                            <div>
                                <img
                                    :src="item.matchCutImg"
                                    class="new-box-img"
                                />
                            </div>
                            <div class="fx justify-between fs-12 hit-bottom">
                                <div>{{ item.anchorName }}</div>
                                <div>
                                    <img
                                        src="../../assets/image/fire.png"
                                        width="7px"
                                        class="mr-2"
                                    />{{ item.hotNum }}
                                </div>
                            </div>
                            <div class="new-title">
                                <div class="text-overflow">
                                    {{ item.roomName }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="padding" v-if="num === 0 || num === 1 || num === 2">
                    <div
                        class="fx justify-between flex-wrap"
                        v-if="ballList.length !== 0"
                    >
                        <div
                            class="new-box"
                            v-for="(item, index) in ballList"
                            :key="index"
                            @click="toPage('room', item.roomId)"
                        >
                            <div class="fx jian">
                                <div class="living">
                                    <div>
                                        <img
                                            src="//sta.cranemarsh.com/wap/assets/yy/img/living.gif"
                                            width="10px"
                                        />
                                    </div>
                                    <div class="ml-5">Live</div>
                                </div>
                                <div class="ml-5" v-if="item.recommend === 1">
                                    <img
                                        src="../../assets/image/jian.png"
                                        width="17px"
                                    />
                                </div>
                            </div>
                            <div>
                                <img
                                    v-lazy="item.matchCutImg"
                                    class="new-box-img"
                                />
                            </div>
                            <div class="fx justify-between fs-12 hit-bottom">
                                <div>{{ item.anchorName }}</div>
                                <div>
                                    <img
                                        src="../../assets/image/fire.png"
                                        width="7px"
                                        class="mr-2"
                                    />{{ item.hotNum }}
                                </div>
                            </div>
                            <div class="new-title">
                                <div class="text-overflow">
                                    {{ item.roomName }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ta-c nothing" v-if="ballList.length === 0">
                        <div>
                            <img
                                src="../../assets/image/nothing.png"
                                width="200px"
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
import Swiper from 'swiper';
import { Cookie } from '../../api/cookie';
import down from '../../components/down/index';
export default {
    name: 'index',
    data() {
        return {
            hotList: [],
            ballList: [],
            hotMatchList: [],
            bannerList: [],
            num: -1,
            pageNo: 1,
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
        this.getList();
        this.getMatch();
        this.getBannerList();
    },
    methods: {
        loadMore() {
            this.pageNo++;
            if (this.num === -1) {
                this.getList();
            } else if (this.num === 0) {
                this.getBall(this.num);
            } else if (this.num === 1) {
                this.getBall(this.num);
            } else if (this.num === 2) {
                this.getBall(this.num);
            }
        },
        checkNum(num) {
            this.num = num;
            this.pageNo = 1;
            if (this.num !== -1) {
                this.getBall(num);
            }
        },
        toPage(name, id) {
            // let routeData = this.$router.resolve({
            //   name: name,
            //   query: {id: id}
            // })
            // window.open(routeData.href, '_blank')
            // let token = ''
            // token = this.$route.query.token || ''
            // if (!Cookie.get('token')) {
            //   this.$router.push({name: 'register'})
            // } else {
            this.$router.replace({ name: name, query: { id: id } });
            // }
        },
        getMatch() {
            this.$axios('post', '/live/getTopMatchList').then((res) => {
                if (res.code === 200) {
                    this.hotMatchList = res.data.matchLists;
                }
            });
        },
        getList() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
            };
            this.$axios('post', '/live/getHotLiveList', param).then((res) => {
                if (res.code === 200) {
                    this.hotList = this.hotList.concat(res.data.dataList);
                    Indicator.close();
                }
            });
        },
        getBall(type) {
            let param = {
                pageNum: 1,
                pageSize: 30,
                type: type,
            };
            this.$axios('post', '/live/getTopLiveList', param).then((res) => {
                if (res.code === 200) {
                    // if (type === 0) {
                    this.ballList = res.data.dataList;
                    // } else if (type === 1) {
                    //   this.basketBallList = res.data.dataList
                    // } else if (type === 2) {
                    //   this.otherBallList = res.data.dataList
                    // }
                    Indicator.close();
                }
            });
        },
        getBannerList() {
            let param = {
                adType: 1,
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
            if (type === 0) {
                this.$router.push({ name: 'deatils', query: { matchId: id } });
            }
            if (type === 1) {
                this.$router.push({
                    name: 'basketDeatils',
                    query: { matchId: id },
                });
            }
        },
        // 用户预约
        getAppoinment(item) {
            if (Cookie.get('token')) {
                let param = {
                    id: item.id,
                };
                this.$axios('post', '/match/userReserveMatch', param).then(
                    (res) => {
                        if (res.code === 200) {
                            this.getMatch();
                        }
                    },
                );
            } else {
                this.$tost({
                    message: '请先登录！',
                });
            }
        },
        // 取消预约
        userCancelReserveMatch(item) {
            let param = {
                id: item.id,
            };
            this.$axios('post', '/match/userCancelReserveMatch', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.getMatch();
                    }
                },
            );
        },
        getOtherBall() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
            };
            this.$axios('post', '/live/getOtherMatchList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.otherBallList = this.otherBallList.concat(
                            res.data.dataList,
                        );
                        Indicator.close();
                    }
                },
            );
        },
    },
};
</script>

<style scoped>
.home {
}
.home-header {
    background: #ffffff;
    color: #282828;
    line-height: 45px;
    display: flex;
}
.home-header > div {
    width: 80px;
    text-align: center;
    font-size: 16px;
}
.avatar {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin-left: -5px;
}
.active span {
    font-size: 18px;
    border-bottom: 3px solid #dbb170;
    padding-bottom: 5px;
    font-weight: 700;
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
.padding {
    padding: 15px 15px 80px 15px;
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
    margin-right: 10px;
}
.new-title {
    font-size: 13px;
    height: 35px;
    display: flex;
    align-items: center;
    background: white;
    padding-right: 2px;
    padding-left: 9px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
.new-box {
    width: 49%;
}
.new-box-img {
    width: 100%;
    height: 110px;
    border-radius: 6px;
}
.living {
    width: 40px;
    background: #fa3434;
    border-radius: 2px;
    vertical-align: middle;
    color: white;
    display: flex;
    font-size: 12px;
}
.red {
    color: #df3b3b;
}
.jian {
    position: relative;
    top: 24px;
    left: 6px;
    height: 18px;
}
.awayTeam-teamName {
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.appoinment {
    padding: 2px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
}
.yellow {
    background: #dbb170;
    color: white;
}
.gray {
    color: white;
    background: #d8d8d8;
}
.hit-bottom {
    width: 100%;
    padding: 5px 10px;
    margin-top: -30px;
    color: white;
    font-weight: 700;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.8) 100%
    );
    position: relative;
}
.banner-img {
    width: 100%;
    height: 165px;
    object-fit: cover;
    z-index: 1;
}
.matchTime {
    padding: 5px;
    background: #f6f7f8;
    border-radius: 3px;
    color: #a8a9a9;
}
.nothing {
    height: 100vh;
    background: white;
    margin: -15px;
    padding-top: 30%;
}
</style>

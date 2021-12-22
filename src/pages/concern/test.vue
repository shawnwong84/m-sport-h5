<template>
    <div>
        <div class="home-header">
            <div :class="isTab === 1 ? 'active' : ''" @click="checkTab(1)">
                <span>关注</span>
            </div>
            <div :class="isTab === 2 ? 'active' : ''" @click="checkTab(2)">
                <span>预约</span>
            </div>
        </div>
        <div class="home-content">
            <div v-if="isLogin === 2 && isTab === 1">
                <div
                    class="fx align-items justify-between mb-10 mt-20"
                    v-for="(item, index) in userAnchorList"
                    :key="index"
                    @click="toPage('room', item.roomId)"
                >
                    <div class="fx align-items">
                        <div>
                            <img :src="item.anchorAvatar" class="avatar" />
                        </div>
                        <div class="ml-10">
                            <div class="fs-16 fw-700">
                                {{ item.anchorName }}
                            </div>
                            <div class="new-title fs-12 c-9D mt-5">
                                {{ item.roomAnnouncement }}
                            </div>
                        </div>
                    </div>
                    <div class="fx align-items">
                        <div v-if="item.liveStatus === 1" class="living-btn">
                            直播中
                        </div>
                        <div class="ml-10">
                            <img
                                src="../../assets/image/jiankuohao.png"
                                width="10px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isLogin === 2 && isTab === 2">
                <div v-for="(item, index) in userReserveMatchList" :key="index">
                    <div
                        class="match-card"
                        v-for="(item2, index2) in item.matchInfos"
                        :key="index2"
                    >
                        <div class="fx align-items justify-between fs-12">
                            <div>
                                <span>{{ item2.matchTime }}</span
                                ><span class="ml-10">{{
                                    item2.matchShortName
                                }}</span>
                            </div>
                            <div class="fs-18 fw-700">
                                {{ item2.homeTeam.score }}:{{
                                    item2.awayTeam.score
                                }}
                            </div>
                            <div>
                                <div
                                    class="living-btn"
                                    v-if="item2.status === 1"
                                >
                                    直播中
                                </div>
                                <span v-if="item2.status === 2">未开始</span>
                                <span v-if="item2.status === 3">已结束</span>
                            </div>
                        </div>
                        <div class="fx align-items justify-center mt-10">
                            <div class="fx align-items">
                                <div class="ml-5">
                                    <img
                                        :src="item2.homeTeam.teamIcon"
                                        width="18px"
                                    />
                                </div>
                                <div class="fw-700 ml-5">
                                    {{ item2.homeTeam.teamName }}
                                </div>
                                <div class="fw-700 fs-20 ml-10">vs</div>
                                <div class="fw-700 ml-10">
                                    {{ item2.awayTeam.teamName }}
                                </div>
                                <div class="ml-5">
                                    <img
                                        :src="item2.awayTeam.teamIcon"
                                        width="18px"
                                    />
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div
                            class="fx align-items justify-center"
                            v-if="item2.guides"
                        >
                            <div
                                class="ta-c ml-10 mt-10"
                                v-for="(value, i) in item2.guides"
                                :key="i"
                                @click="toPage('room', value.roomId)"
                            >
                                <div>
                                    <img class="avatar" :src="value.avatar" />
                                </div>
                                <div class="live-img">
                                    <img src="../../assets/image/Live.png" />
                                </div>
                                <div class="fs-12 c-9D">{{ value.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="fx justify-center"
                v-if="
                    (isLogin === 1 && isTab === 1) ||
                    (isLogin === 1 && isTab === 2)
                "
                :class="isTab === 2 ? 'mt-20f' : ''"
            >
                <div>
                    <div>
                        <img
                            src="../../assets/image/no-login.png"
                            width="100px"
                        />
                    </div>
                    <div class="fs-12 c-9D">登录账号关注喜欢的主播</div>
                    <div class="fx justify-center">
                        <div class="login-btn" @click="$utils.toPage('login')">
                            登录
                        </div>
                    </div>
                </div>
            </div>
            <no-data
                v-if="
                    isLogin === 2 &&
                    ((isTab === 1 && userAnchorList.length === 0) ||
                        (isTab === 2 && userReserveMatchList.length === 0))
                "
            ></no-data>
            <div class="border-gray" v-if="isTab === 1"></div>
            <div class="fs-20 fw-700 mt-10" v-if="isTab === 1">为你推荐</div>
            <div class="fx justify-between flex-wrap" v-if="isTab === 1">
                <div
                    class="new-box"
                    v-for="(item, index) in recommendList"
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
                        <div class="ml-5">
                            <img
                                src="../../assets/image/jian.png"
                                width="17px"
                            />
                        </div>
                    </div>
                    <div>
                        <img v-lazy="item.matchCutImg" class="new-box-img" />
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
                    <div class="new-title mt-10">{{ item.roomName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Cookie } from '../../api/cookie';
import noData from '../../components/noData/index.vue';
export default {
    name: 'index',
    data() {
        return {
            recommendList: [],
            userAnchorList: [],
            userReserveMatchList: [],
            isLogin: 1,
            isTab: 1,
            pageNo: 1,
        };
    },
    components: { 'no-data': noData },
    mounted() {
        this.getList();
        if (Cookie.get('token')) {
            this.isLogin = 2;
            this.userGetAnchorList();
            this.userGetReserveMatch();
        }
    },
    methods: {
        toPage(name, id) {
            // let routeData = this.$router.resolve({
            //   name: name,
            //   query: {id: id}
            // })
            // window.open(routeData.href, '_blank')
            // if (!Cookie.get('token')) {
            //   this.$router.push({name: 'register'})
            // } else {
            this.$router.push({ name: name, query: { id: id } });
            // }
        },
        checkTab(num) {
            this.isTab = num;
        },
        // 我的预约
        userGetReserveMatch() {
            this.$axios('post', '/match/userGetReserveMatch').then((res) => {
                if (res.code === 200) {
                    this.userReserveMatchList = res.data.matchLists;
                }
            });
        },
        // 我的关注
        userGetAnchorList() {
            this.$axios('post', '/match/userGetAnchorList').then((res) => {
                if (res.code === 200) {
                    this.userAnchorList = res.data;
                }
            });
        },
        getList() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
                roomId: '',
            };
            this.$axios('post', '/live/getVideoRecommendList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.recommendList = res.data.dataList;
                    }
                },
            );
        },
        // 取消预约
        userCancelReserveMatch(item) {
            let param = {
                id: item.id,
            };
            this.$axios('post', '/match/userCancelReserveMatch', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.getList();
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
    line-height: 55px;
    display: flex;
}
.home-header > div {
    width: 80px;
    text-align: center;
    font-size: 16px;
}
.active span {
    font-size: 18px;
    border-bottom: 3px solid #f8413d;
    padding-bottom: 5px;
    font-weight: 700;
}
.swiper-slide img {
    border-radius: 10px;
}
.home-content {
    /*margin: 15px;*/
    position: absolute;
    top: 95px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
    padding: 15px 15px 80px 15px;
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
    width: 350px !important;
    border-right: 1px solid #ddd;
    padding: 8px 10px;
}
.new-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    word-break: break-all; /* 内容自动换行 */
    margin-top: 5px;
    font-size: 13px;
}
.new-box {
    width: 49%;
    margin-top: -8px;
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
.jian {
    position: relative;
    top: 24px;
    left: 6px;
    height: 18px;
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
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.border-gray {
    height: 10px;
    background: rgb(244, 244, 244);
    margin-left: -20px;
    margin-right: -20px;
}
.login-btn {
    width: 100px;
    line-height: 40px;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
    border-radius: 50px;
    color: white;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.mt-20f {
    margin-top: 20%;
}
.match-card {
    margin-top: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
.team-box {
    margin-left: 20%;
    margin-right: 20%;
}
.appoinment {
    padding: 2px 10px;
    border-radius: 6px;
    cursor: pointer;
}
.living-btn {
    width: 50px;
    height: 20px;
    background: #fe0000;
    border-radius: 2px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
.live-img {
    margin-top: -18px;
}
.gray {
    color: white;
    background: #d8d8d8;
}
</style>

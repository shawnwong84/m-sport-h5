<template>
    <div>
        <div class="home-content">
            <v-down style="position: fixed; width: 100%; z-index: 99"></v-down>
            <div style="margin-top: 56px" class="home-header">
                <div
                    :class="sportsName === '足球' ? 'fs-24 fw-700' : 'fs-20'"
                    @click="checkName(0)"
                >
                    <div>足球</div>
                    <div class="fx justify-center">
                        <div
                            :class="sportsName === '足球' ? 'active' : ''"
                        ></div>
                    </div>
                </div>
                <div
                    :class="sportsName === '篮球' ? 'fs-24 fw-700' : 'fs-20'"
                    @click="checkName(1)"
                >
                    <div>篮球</div>
                    <div class="fx justify-center">
                        <div
                            :class="sportsName === '篮球' ? 'active' : ''"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="home-header1">
                <div
                    :class="type === 0 ? 'active1' : 'c-95'"
                    @click="checkType(0)"
                >
                    <span>完整</span>
                </div>
                <div
                    :class="type === 1 ? 'active1' : 'c-95'"
                    @click="checkType(1)"
                >
                    <span>已开赛</span>
                </div>
                <div
                    :class="type === 2 ? 'active1' : 'c-95'"
                    @click="checkType(2)"
                >
                    <span>赛程</span>
                </div>
                <div
                    :class="type === 3 ? 'active1' : 'c-95'"
                    @click="checkType(3)"
                >
                    <span>赛果</span>
                </div>
            </div>
            <div class="lodding-box" v-if="isLodding">
                <div class="ta-c">
                    <div>
                        <img
                            src="../../assets/image/loading.gif"
                            width="50px"
                        />
                    </div>
                    <div class="mt-10">数据加载中...</div>
                </div>
            </div>
            <div
                class="lodding-box"
                v-if="!isLodding && matchList.length === 0"
            >
                <div class="ta-c">
                    <div>
                        <img
                            src="../../assets/image/no-data.png"
                            width="120px"
                        />
                    </div>
                    <div class="c-9D">暂无数据</div>
                </div>
            </div>
            <div
                class="time-div"
                v-if="!isLodding && type === 2 && matchList.length !== 0"
            >
                <div class="fx">
                    <div
                        class="time-li"
                        :class="today === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, today)"
                    >
                        今日
                    </div>
                    <div
                        class="time-li"
                        v-for="i in 6"
                        :key="i"
                        :class="GetDateStr(i) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, GetDateStr(i))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ GetDateStr(i).split('-')[1] }}-{{
                                    GetDateStr(i).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(GetDateStr(i)) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="time-div"
                v-if="!isLodding && type === 3 && matchList.length !== 0"
            >
                <div class="fx">
                    <div
                        class="time-li"
                        :class="myGetDay(6) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(6))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(6).split('-')[1] }}-{{
                                    myGetDay(6).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(6)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="myGetDay(5) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(5))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(5).split('-')[1] }}-{{
                                    myGetDay(5).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(5)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="myGetDay(4) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(4))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(4).split('-')[1] }}-{{
                                    myGetDay(4).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(4)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="myGetDay(3) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(3))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(3).split('-')[1] }}-{{
                                    myGetDay(3).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(3)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="myGetDay(2) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(2))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(2).split('-')[1] }}-{{
                                    myGetDay(2).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(2)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="myGetDay(1) === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, myGetDay(1))"
                    >
                        <div>
                            <div class="ta-c">
                                {{ myGetDay(1).split('-')[1] }}-{{
                                    myGetDay(1).split('-')[2]
                                }}
                            </div>
                            <div class="ta-c">{{ getWeek(myGetDay(1)) }}</div>
                        </div>
                    </div>
                    <div
                        class="time-li"
                        :class="today === matchTime ? 'active2' : ''"
                        @click="checkTime(sportsId, today)"
                    >
                        今日
                    </div>
                </div>
            </div>
            <div
                v-if="!isLodding && matchList.length !== 0"
                v-for="(item, index) in matchList"
                :key="index"
            >
                <div
                    class="match-card"
                    v-for="(item2, index2) in item.matchInfos"
                    :key="index2"
                    @click="toDeatils(item2.id, item2.sportsType)"
                >
                    <div
                        style="color: #959db0; margin-bottom: -20px"
                        class="fx justify-center fs-12"
                    >
                        半:<span class="mr-5" v-if="item2.halftimeScore">{{
                            item2.halftimeScore
                        }}</span>
                        <span class="mr-5" v-else>0:0</span>
                        角:<span v-if="item2.cornerKick">{{
                            item2.cornerKick
                        }}</span>
                        <span v-else>0:0</span>
                    </div>
                    <div class="fs-12 match-time">
                        <span
                            class="mr-10 matchShortName"
                            :style="{ background: item2.sportsColor }"
                            >{{ item2.matchShortName }}</span
                        >
                        <span style="color: #959db0">{{
                            item2.matchTime
                        }}</span>
                    </div>
                    <div class="mt-10">
                        <div class="fx align-items justify-between">
                            <div class="fs-15 teamName ta-r">
                                {{ item2.homeTeam.teamName }}
                            </div>
                            <div class="fx justify-center align-items">
                                <div class="fs-18 c-9f fw-700">
                                    {{ item2.homeTeam.score }}
                                </div>
                                <div class="status ml-10">
                                    <span v-if="item2.status === 3">完场</span>
                                    <span v-if="item2.status === 1" class="red"
                                        >vs</span
                                    >
                                    <span v-if="item2.status === 2">未</span>
                                </div>
                                <div class="fs-18 c-9f ml-10 fw-700">
                                    {{ item2.awayTeam.score }}
                                </div>
                            </div>
                            <div class="fs-15 teamName ta-l">
                                {{ item2.awayTeam.teamName }}
                            </div>
                        </div>
                        <div
                            style="
                                width: 100%;
                                text-align: right;
                                margin-left: -10px;
                                margin-top: -10px;
                            "
                        >
                            <div v-if="item2.status === 1">
                                <img src="../../assets/image/spzb.png" />
                            </div>
                            <div v-if="item2.status !== 1">
                                <img src="../../assets/image/scxq.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import Cookie from '../../api/cookie.js';
import down from '../../components/down/index';
export default {
    name: 'index',
    data() {
        return {
            tabList: [],
            matchList: [],
            isLodding: true,
            type: 0,
            sportsId: 0,
            matchTime: '',
            RandomColor: '',
            today: '',
            sportsName: '足球',
        };
    },
    components: { 'v-down': down },
    mounted() {
        if (this.$route.query.type === 1) {
            this.sportsName = '篮球';
        } else {
            this.sportsName = '足球';
        }
        console.log(this.$route.query.type);
        console.log(this.sportsName);
        this.getToday();
        this.getList(0, 0);
        // eslint-disable-next-line no-unused-vars
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            }, // 可选选项，自动滑动
        });
    },
    methods: {
        checkTime(id, time) {
            this.matchList = [];
            this.matchTime = time;
            this.getList(id, this.type);
        },
        checkName(num) {
            this.type = 0;
            if (num === 0) {
                this.sportsName = '足球';
                this.sportsId = 0;
                this.getList(0, this.type);
            }
            if (num === 1) {
                this.sportsName = '篮球';
                this.sportsId = 1;
                this.getList(1, this.type);
            }
        },
        checkType(num) {
            this.type = num;
            this.matchTime = this.today;
            this.getList(this.sportsId, num);
        },
        toPage(id) {
            this.$router.push({ name: 'room', query: { id: id } });
        },
        toDeatils(id, type) {
            if (type === 0) {
                this.$router.push({
                    name: 'deatils',
                    query: { matchId: id, type: 0 },
                });
            }
            if (type === 1) {
                this.$router.push({
                    name: 'basketDeatils',
                    query: { matchId: id, type: 1 },
                });
            }
        },
        /* 随机获取颜色 */
        getRandomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
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
                            this.getList(item.sportsType, this.type);
                        }
                    },
                );
            } else {
                this.$toast({
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
                        this.getList(item.sportsType, this.type);
                    }
                },
            );
        },
        // 获取赛程列表
        getList(id, status) {
            this.isLodding = true;
            let param = {
                id: id,
                status: status,
                endDate: this.matchTime,
                startDate: this.matchTime,
            };
            this.$axios('post', '/match/getMatchList', param).then((res) => {
                if (res.code === 200) {
                    this.matchList = res.data.matchLists;
                    this.isLodding = false;
                }
            });
        },
        // 获取当前日期
        getToday() {
            var myDate = new Date();
            let mouth = myDate.getMonth() + 1;
            let date = myDate.getDate();
            if (mouth < 10) {
                mouth = '0' + mouth;
            }
            if (date < 10) {
                date = '0' + date;
            }
            this.today = myDate.getFullYear() + '-' + mouth + '-' + date;
            this.matchTime = this.today;
            console.log(this.today);
        },
        // 获取周几
        getWeek(num) {
            var strTime = num; // 字符串日期格式
            var date = new Date(Date.parse(strTime.replace(/-/g, '/')));
            var a = ['日', '一', '二', '三', '四', '五', '六'];
            var week = date.getDay();
            return '周' + a[week];
        },
        // 获取当前日期前N天
        myGetDay(length) {
            var time = new Date().getTime() - 24 * 60 * 60 * 1000 * length;
            var yesday = new Date(time); // 获取的是前几天日期
            yesday =
                yesday.getFullYear() +
                '-' +
                (yesday.getMonth() >= 9
                    ? yesday.getMonth() + 1
                    : '0' + (yesday.getMonth() + 1)) +
                '-' +
                (yesday.getDate() > 9
                    ? yesday.getDate()
                    : '0' + yesday.getDate()); // 字符串拼接转格式：例如2018-08-19
            return yesday;
        },
        // 获取当前日期后N天
        GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m =
                dd.getMonth() + 1 < 10
                    ? '0' + (dd.getMonth() + 1)
                    : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
            var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
            return y + '-' + m + '-' + d;
        },
    },
};
</script>

<style scoped>
.home-header {
    background: #ffffff;
    color: #282828;
    line-height: 39px;
    display: flex;
    justify-content: center;
}
.home-header > div {
    width: 70px;
    text-align: center;
}
.home-header1 {
    background: #ffffff;
    color: #282828;
    line-height: 39px;
    display: flex;
    justify-content: center;
    border-top: 1px solid #f0f1f2;
    font-weight: 700;
    margin: 0px 0px 15px 0px;
}
.home-header1 > div {
    width: 117px;
    text-align: center;
}
.red {
    color: #fe0000;
}
.living {
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
.active {
    width: 30px;
    height: 3px;
    box-shadow: 0 0.02rem 0.03rem 0 rgb(254 208 160 / 57%);
    background-image: linear-gradient(270deg, #e3ac72, #ffd1a1 0);
    margin-top: -2px;
    margin-bottom: 3px;
}
.swiper-slide img {
    border-radius: 10px;
}
.home-content {
    /*margin: 15px;*/
    position: absolute;
    top: 0px;
    bottom: 80px;
    left: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
    background: #f6f7f8;
    /*padding: 15px 15px  80px 15px;*/
}
.match-card {
    /*margin-top: 10px;*/
    border-radius: 3px;
    margin: 10px;
    background: white;
}
.live-img {
    margin-top: -18px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.lodding-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30%;
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
.yellow {
    background: #dbb170;
    color: white;
}
.gray {
    color: white;
    background: #d8d8d8;
}
.time-box {
    line-height: 48px;
    background: #f6f7f8;
    padding-left: 15px;
}

.active1 span {
    background: #fff3e8;
    border-radius: 15px;
    padding: 0px 20px;
    color: #a06325;
    font-size: 15px;
}
.c-95 span {
    color: #676c7a;
    font-size: 15px;
}

.time-div {
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll; /* 1 */
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-overflow-scrolling: touch; /* 2 */
    text-align: justify; /* 3 */
    background: white;
    margin-top: 10px;
    padding: 10px;
}
.time-li {
    width: 55px;
    height: 35px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.active2 {
    background: #fff3e8;
    border-radius: 4px;
    color: #a06325;
    font-size: 12px;
}
.matchShortName {
    padding: 2px 5px;
    font-size: 12px;
    color: white;
    border-radius: 3px;
}
.match-time {
    padding: 4px;
    border-bottom: 1px solid #f0f1f2;
}
.c-9f {
    color: #9f6324;
}
.status span {
    background: #f6f7f9;
    border-radius: 3px;
    color: #949db0;
    font-size: 12px;
    padding: 0px 3px;
}
.teamName {
    width: 41%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

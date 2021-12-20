<template>
    <div>
        <div class="back" @click="goBack()">
            <i class="go-back"></i>
        </div>
        <div class="title">方案详情</div>
        <div class="content">
            <div class="fs-20 fw-700">{{ hotRankInfo.title }}</div>
            <div class="mt-10 fx justify-between">
                <div class="fs-12 c-9D">{{ hotRankInfo.releaseTime }}</div>
                <div
                    class="red-box"
                    :class="hotRankInfo.result === '胜' ? 'sheng' : 'fu'"
                >
                    {{ hotRankInfo.result }}
                </div>
            </div>
            <div class="fx align-items mt-20">
                <div>
                    <img
                        :src="hotRankInfo.anchorIcon"
                        style="width: 40px; height: 40px; border-radius: 50%"
                    />
                </div>
                <div class="ml-10 fs-16 fw-700">
                    {{ hotRankInfo.anchorName }}
                </div>
                <div class="fx ml-10">
                    <div class="jx">
                        <div class="jx2">
                            <div class="content1 fw-700">
                                {{ hotRankInfo.continuousWin }}
                            </div>
                        </div>
                        <div class="content1" style="margin-left: 2px">
                            选红
                        </div>
                    </div>
                    <div class="jx ml-10">
                        <div class="content1">
                            近{{ hotRankInfo.sum }}中{{ hotRankInfo.wins }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10 fx align-items">
                <div class="mr-10">近期战绩</div>
                <div
                    v-for="(item, index) in hotRankInfo.recentRecord"
                    :key="index"
                >
                    <div
                        class="recentRecord"
                        :class="item === '红' ? 'red' : 'black'"
                    >
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="mt-10 fs-16" style="line-height: 25px">
                {{ hotRankInfo.anchorDesc }}
            </div>
            <div class="xian"></div>
            <div class="fx align-items mt-10" v-if="hotRankInfo.teamVs">
                <div class="c-red">竟足</div>
                <div class="border-left"></div>
                <div class="c-9D">
                    {{ hotRankInfo.teamVs.split(' ')[0] }}
                    {{ hotRankInfo.teamVs.split(' ')[1] }}
                    {{ hotRankInfo.teamVs.split(' ')[2] }}
                </div>
            </div>
            <div
                class="fx align-items justify-center mt-10 fs-18 fw-700"
                v-if="hotRankInfo.teamInfo"
            >
                <div class="mr-20">
                    {{ hotRankInfo.teamInfo.home.teamName }}
                </div>
                <div class="mr-20">
                    {{ hotRankInfo.teamInfo.home.score }}-{{
                        hotRankInfo.teamInfo.away.score
                    }}
                </div>
                <div>{{ hotRankInfo.teamInfo.away.teamName }}</div>
            </div>
            <div
                class="fx justify-center mt-20"
                style="width: 100%"
                v-if="hotRankInfo.matchOdds"
            >
                <div class="score-box">
                    <div class="fx">
                        <div class="score-li1">让球</div>
                        <div class="score-li2">
                            <span v-if="hotRankInfo.competitionStatus === 1"
                                >直播中</span
                            >
                            <span v-if="hotRankInfo.competitionStatus === 2"
                                >未开始</span
                            >
                            <span v-if="hotRankInfo.competitionStatus === 3"
                                >已完结</span
                            >
                            <span v-if="hotRankInfo.competitionStatus === 4"
                                >未知</span
                            >
                        </div>
                    </div>
                    <div
                        class="fx align-items"
                        style="border-top: 1px solid #ffffff"
                    >
                        <div class="score-li3">0</div>
                        <div
                            class="score-li4"
                            :class="hotRankInfo.result === '胜' ? 'c-fe' : ''"
                            style="border-right: 1px solid #ffffff"
                        >
                            <div>主胜</div>
                            <div>{{ hotRankInfo.matchOdds.wins }}</div>
                        </div>
                        <div
                            class="score-li5"
                            :class="hotRankInfo.result === '平' ? 'c-fe' : ''"
                            style="border-right: 1px solid #ffffff"
                        >
                            <div>平局</div>
                            <div>{{ hotRankInfo.matchOdds.draw }}</div>
                        </div>
                        <div
                            class="score-li5"
                            :class="hotRankInfo.result === '负' ? 'c-fe' : ''"
                        >
                            <div>客胜</div>
                            <div>{{ hotRankInfo.matchOdds.lose }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fw-700 mt-20 fs-16">方案详情</div>
            <div
                class="mt-10 fs-16 hotRankInfo-content"
                v-html="hotRankInfo.content"
            ></div>
            <div
                class="xian"
                v-if="hotRankAssociat && hotRankAssociat.length !== 0"
            ></div>
            <div
                class="fx mt-10 bd-bottom pb-10"
                v-if="hotRankAssociat && hotRankAssociat.length !== 0"
            >
                <div><img src="../../assets/image/qitafangan.png" /></div>
                <div class="ml-5">其他方案</div>
            </div>
            <div
                class="bd-bottom mt-10"
                v-for="(item, index) in hotRankAssociat"
                :key="index"
                @click="toPage(item.id)"
            >
                <div class="fs-16">{{ item.title }}</div>
                <div class="fx justify-between matchDesc">
                    <div>{{ item.matchDesc }}</div>
                    <div><img src="../../assets/image/gengduo.png" /></div>
                </div>
                <div class="fx justify-between fs-12 mt-10 mb-20">
                    <div class="c-9D">{{ item.releaseTime }}</div>
                    <div class="c-red">查看</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            hotRankInfo: [],
            hotRankAssociat: [],
        };
    },
    mounted() {
        this.getHotRankInfoById();
        this.getHotRankAssociate();
    },
    methods: {
        goBack() {
            this.$router.back(-1);
        },
        toPage(id) {
            this.$router.replace({ name: 'hotBank', query: { id: id } });
            location.reload();
        },
        getHotRankAssociate() {
            let param = {
                id: this.$route.query.id,
                pageNum: 1,
                pageSize: 30,
            };
            this.$axios('post', '/match/getHotRankAssociate', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.hotRankAssociat = res.data.dataList;
                    }
                },
            );
        },
        getHotRankInfoById() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/match/getHotRankInfoById', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.hotRankInfo = res.data;
                    }
                },
            );
        },
    },
};
</script>

<style scoped>
.content {
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
    /*display: flex;*/
    /*flex-direction: column;*/
    padding: 10px;
}
.back {
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: 11;
    color: #4a4c5b;
}
.go-back {
    display: inline-block;
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
    border: 1px solid #4a4c5b;
    border-bottom: none;
    border-right: none;
}

.matchDesc {
    background: #f6f7f9;
    border-radius: 20px;
    color: #9fa6b7;
    padding: 8px 10px;
    font-size: 12px;
    margin-top: 10px;
}
.title {
    text-align: center;
    margin-top: 10px;
    font-weight: 700;
}
.score-box {
    width: 100%;
}
.jx {
    transform: skew(-10deg);
    width: 41px;
    height: 21px;
    color: red;
    border: 1px solid red;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
    cursor: pointer;
    margin-left: 10px;
}
.jx2 {
    background: red;
    color: white;
    margin-left: -10px;
    width: 15px;
    height: 21px;
    transform: skew(-6deg);
    font-size: 12px;
    text-align: center;
}
.content1 {
    transform: skew(10deg);
}
.red-box {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    width: 30px;
    text-align: center;
    font-size: 13px;
    margin-right: -10px;
}
.sheng {
    color: white;
    background: red;
}
.fu {
    background: #9fa6b7;
}
.recentRecord {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}
.score-li1 {
    width: 20%;
    text-align: center;
    background: #9fa6b7;
    line-height: 40px;
    color: white;
    font-size: 18px;
}
.score-li2 {
    width: 80%;
    text-align: center;
    background: #f6f7f9;
    line-height: 40px;
}
.score-li3 {
    width: 22%;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: white;
    background: #fe0000;
}
.score-li4 {
    width: 28%;
    text-align: center;
    background: #f6f7f9;
    height: 50px;
    padding-top: 5px;
}
.score-li5 {
    width: 30%;
    text-align: center;
    height: 50px;
    background: #f6f7f9;
    padding-top: 5px;
}
.c-fe {
    background: #fe9102;
    color: white;
}
.red {
    background: red;
}
.c-red {
    color: red;
}
.black {
    background: #9fa6b7;
}
.xian {
    margin-top: 20px;
    margin-left: -10px;
    margin-right: -10px;
    height: 10px;
    background: #f6f7f8;
}
.border-left {
    width: 3px;
    background: red;
    height: 13px;
    margin-left: 10px;
    margin-right: 10px;
}
.bd-bottom {
    border-bottom: 1px solid #f6f7f8;
}
</style>
<style>
.hotRankInfo-content p img {
    width: 100% !important;
}
.hotRankInfo-content p {
    margin-top: 10px;
}
</style>

<template>
    <div>
        <div class="fx align-items justify-between pl-10 pr-10 mt-10">
            <div>
                <img
                    src="../../assets/image/Cancel.png"
                    width="16px"
                    @click="goBack"
                />
            </div>
            <div class="fx align-items justify-between seach-input">
                <div class="fx align-items fw-700">
                    <div class="seach-icon">
                        <img
                            src="../../assets/image/Magnifying.png"
                            width="14px"
                        />
                    </div>
                    <div class="seach-right"></div>
                    <div>
                        <input
                            type="text"
                            v-model="searchContent"
                            placeholder="热门红榜"
                            @change="articleSearch(searchContent)"
                        />
                    </div>
                </div>
                <div @click="claer">
                    <img
                        src="../../assets/image/Cross-button.png"
                        width="17px"
                    />
                </div>
            </div>
        </div>
        <div class="main">
            <div class="hot-main" v-if="searchList && searchList.length !== 0">
                <div
                    v-for="(item, index) in searchList"
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
                        <div style="width: 30%">
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
                        <div class="jingcai fx justify-center">
                            <div style="margin-top: 2px; margin-right: 3px">
                                <img src="../../assets/image/rq.png" />
                            </div>
                            <div>竞彩</div>
                        </div>
                        <div class="ml-10 fs-12 c-9D">
                            {{ item.expert.beforeTime }}
                        </div>
                    </div>
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
            allTagList: [],
            searchList: [],
            searchContent: '',
        };
    },
    mounted() {},
    methods: {
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
        },
        goBack() {
            this.$router.go(-1);
        },
        claer() {
            this.searchContent = '';
        },
        articleSearch(name) {
            this.searchContent = name;
            let param = {
                pageNum: 1,
                pageSize: 30,
                searchContent: name,
            };
            this.$axios('post', '/hotRank/searchHotRankList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.searchList = res.data.dataList;
                    }
                },
            );
        },
        getWeek(num) {
            var strTime = num; // 字符串日期格式
            var date = new Date(Date.parse(strTime.replace(/-/g, '/')));
            var a = ['日', '一', '二', '三', '四', '五', '六'];
            var week = date.getDay();
            return '周' + a[week];
        },
    },
};
</script>

<style scoped>
.seach-input {
    background: #eeeeee;
    border-radius: 30px;
    padding: 10px;
    font-size: 12px;
    width: 90%;
    opacity: 0.7;
}
.seach-right {
    height: 15px;
    width: 2px;
    background: #999999;
    margin-left: 5px;
    margin-right: 5px;
}
.main {
    background: rgb(250, 250, 250);
    margin-top: 10px;
    padding: 10px;
    position: absolute;
    top: 50px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
}
.hot-main {
    background: white;
    padding: 10px;
    /*border-radius: 5px;*/
}
.hotRankList {
    border-bottom: 1px solid #f6f7f8;
    padding: 0px 15px 15px 15px;
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

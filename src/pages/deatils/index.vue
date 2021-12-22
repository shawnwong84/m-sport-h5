<template>
    <div class="deatils">
        <div class="back" @click="goBack()">
            <i class="go-back"></i>
            <!--      <span>返回</span>-->
        </div>
        <div class="head" @click="goBack()" v-if="footballData.matchGameInfo">
            <div>{{ footballData.matchGameInfo.competitionShortName }}</div>
            <div>
                {{ footballData.matchGameInfo.matchDay }}
                {{ footballData.matchGameInfo.matchTime }}
            </div>
        </div>
        <div
            class="score-box"
            v-if="footballData.matchGameInfo"
            @click="checkXinhao"
        >
            <div class="fx align-items justify-between score-div">
                <div class="ta-c">
                    <div>
                        <img
                            :src="
                                footballData.matchGameInfo.teamInfo.homeTeam
                                    .teamLogo
                            "
                            class="img"
                        />
                    </div>
                    <div class="mt-5">
                        {{
                            footballData.matchGameInfo.teamInfo.homeTeam
                                .teamName
                        }}
                    </div>
                </div>
                <div class="ta-c">
                    <div class="fs-18 fw-700 mt-20">
                        <span class="">
                            {{
                                footballData.matchGameInfo.teamInfo.homeTeam
                                    .score
                            }}
                            :
                            {{
                                footballData.matchGameInfo.teamInfo.awayTeam
                                    .score
                            }}
                        </span>
                        <!--           <span v-if="footballData.matchGameInfo.status === 2">-</span>-->
                    </div>
                    <div class="mt-5">
                        <span v-if="footballData.matchGameInfo.status === 3"
                            >已结束</span
                        >
                        <span
                            class="fs-16"
                            v-if="footballData.matchGameInfo.status === 2"
                            >即将开始</span
                        >
                    </div>
                    <div class="live-btn">观看直播</div>
                </div>
                <div class="ta-c">
                    <div>
                        <img
                            :src="
                                footballData.matchGameInfo.teamInfo.awayTeam
                                    .teamLogo
                            "
                            class="img"
                        />
                    </div>
                    <div class="mt-5">
                        {{
                            footballData.matchGameInfo.teamInfo.awayTeam
                                .teamName
                        }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="fx align-items mt-10 pl-10"
            style="border-bottom: 1px solid #f1f1f1"
        >
            <div class="nav" :class="num === 1 ? 'cl' : ''" @click="check(1)">
                赛况
            </div>
            <div class="nav" :class="num === 2 ? 'cl' : ''" @click="check(2)">
                直播
            </div>
            <div class="nav" :class="num === 3 ? 'cl' : ''" @click="check(3)">
                指数
            </div>
            <div class="nav" :class="num === 4 ? 'cl' : ''" @click="check(4)">
                分析
            </div>
            <div class="nav" :class="num === 5 ? 'cl' : ''" @click="check(5)">
                红榜
            </div>
            <div class="nav" :class="num === 6 ? 'cl' : ''" @click="check(6)">
                资讯
            </div>
        </div>
        <div class="event_box" v-if="num === 1 && footballData.matchGoals">
            <div class="content content_p">
                <ol id="timeline">
                    <li
                        class="cf"
                        style="margin-top: 20px"
                        v-for="(item, index) in footballData.matchGoals"
                        :key="index"
                    >
                        <span class="num">{{ item.minute }}</span>
                        <div :class="item.type === 2 ? 'away' : 'home'">
                            <span>{{ item.score }}</span>
                            <p v-if="item.eventName !== '换人'">
                                <span class="text_lim">{{ item.pname }}</span>
                                <img
                                    v-if="item.eventName === '得到一张黄牌'"
                                    src="../../assets/image/img-01.png"
                                />
                                <img
                                    v-if="item.eventName === '射门得分'"
                                    src="../../assets/image/img-02.png"
                                />
                                <img
                                    v-if="item.eventName === '罚失点球'"
                                    src="../../assets/image/img-03.png"
                                />
                                <img
                                    v-if="item.eventName === '乌龙球'"
                                    src="../../assets/image/img-04.png"
                                />
                                <img
                                    v-if="item.eventName === '点球得分'"
                                    src="../../assets/image/img-05.png"
                                />
                                <img
                                    v-if="item.eventName === '两黄一红'"
                                    src="../../assets/image/img-06.png"
                                />
                                <img
                                    v-if="item.eventName === '得到一张红牌'"
                                    src="../../assets/image/img-07.png"
                                />
                                <img
                                    v-if="item.eventName === '助攻'"
                                    src="../../assets/image/img-10.png"
                                />
                            </p>
                            <p
                                v-if="
                                    item.eventName === '替补登场' &&
                                    item.upName !== ''
                                "
                            >
                                <span class="text_lim">{{ item.upName }}</span>
                                <img src="../../assets/image/img-08.png" />
                            </p>
                            <p
                                v-if="
                                    item.eventName === '替换下场' &&
                                    item.downName !== ''
                                "
                            >
                                <span class="text_lim">{{
                                    item.downName
                                }}</span>
                                <img src="../../assets/image/img-09.png" />
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="fx align-items justify-center flex-wrap time-desc">
                <div>
                    <img src="../../assets/image/img-01.png" width="12px" />
                    黄牌
                </div>
                <div>
                    <img src="../../assets/image/img-02.png" width="12px" />
                    进球
                </div>
                <div>
                    <img src="../../assets/image/img-05.png" width="12px" />
                    点球
                </div>
                <div>
                    <img src="../../assets/image/img-04.png" width="12px" />
                    乌龙球
                </div>
                <div>
                    <img src="../../assets/image/img-03.png" width="12px" />
                    罚失点球
                </div>
                <div>
                    <img src="../../assets/image/img-10.png" width="12px" />
                    助攻
                </div>
                <div>
                    <img src="../../assets/image/img-07.png" width="12px" />
                    红牌
                </div>
                <div>
                    <img src="../../assets/image/img-08.png" width="12px" />
                    换上
                </div>
                <div>
                    <img src="../../assets/image/img-09.png" width="12px" />
                    换出
                </div>
                <div>
                    <img src="../../assets/image/img-06.png" width="12px" />
                    两黄一红
                </div>
            </div>
            <div class="event-tab">技术统计</div>
            <div v-if="footballData.gameStat">
                <div class="fx align-items justify-between vs-box">
                    <div>
                        <img
                            :src="
                                footballData.matchGameInfo.teamInfo.homeTeam
                                    .teamLogo
                            "
                            style="width: 30px; height: 30px"
                        />
                    </div>
                    <div>vs</div>
                    <div>
                        <img
                            :src="
                                footballData.matchGameInfo.teamInfo.awayTeam
                                    .teamLogo
                            "
                            style="width: 30px; height: 30px"
                        />
                    </div>
                </div>
                <div class="bar-box">
                    <div
                        v-for="(item, index) in footballData.gameStat"
                        :key="index"
                    >
                        <div
                            class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                        >
                            <div>{{ item.statHome }}</div>
                            <div class="ml-20">{{ item.statName }}</div>
                            <div class="ml-20">{{ item.statAway }}</div>
                        </div>
                        <div class="mt-10 fx justify-center">
                            <div
                                class="fx align-items justify-between"
                                style="width: 50%"
                            >
                                <v-progress-linear
                                    v-model="item.statHome"
                                    :color="
                                        item.statHome < item.statAway
                                            ? '#EEEEEE'
                                            : '#3179FF'
                                    "
                                    reactive
                                ></v-progress-linear>
                                <progress-bar
                                    :bar-color="
                                        item.statHome < item.statAway
                                            ? '#3179FF'
                                            : '#EEEEEE'
                                    "
                                    class="pro-bar ml-10"
                                    :val="item.statAway"
                                ></progress-bar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="
                num === 2 &&
                matchInfoData.guides &&
                matchInfoData.guides.length !== 0
            "
            class="pl-10 pr-10 nav-bg"
            style="min-height: 100vh"
        >
            <div class="fx justify-between flex-wrap">
                <div
                    class="new-box"
                    v-for="(item, index) in matchInfoData.guides"
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
                    <div class="live-box-foot">
                        <div class="new-title pt-5">{{ item.name }}</div>
                        <div class="fs-12 c-9D pl-10">
                            {{ matchInfoData.matchShortName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="match_content"
            v-if="
                num === 3 && matchFootballOdds && matchFootballOdds.length !== 0
            "
        >
            <div class="fx justify-center">
                <div class="fx nav-bg zs-tab">
                    <div
                        class="zs-tab-li"
                        :class="zsTab === 1 ? 'zs-tab-nav' : ''"
                        @click="changeZsTab(1)"
                    >
                        让球
                    </div>
                    <div
                        class="zs-tab-li"
                        :class="zsTab === 2 ? 'zs-tab-nav' : ''"
                        @click="changeZsTab(2)"
                    >
                        欧赔
                    </div>
                    <div
                        class="zs-tab-li"
                        :class="zsTab === 3 ? 'zs-tab-nav' : ''"
                        @click="changeZsTab(3)"
                    >
                        大小球
                    </div>
                </div>
            </div>
            <div v-if="zsTab === 1" class="fx mt-20" style="width: 100%">
                <div style="width: 100%">
                    <div class="fx nav-bg">
                        <div class="w-20">公司</div>
                        <div class="w-20 c-9D">主</div>
                        <div class="w-20 c-9D">初</div>
                        <div class="w-20 c-9D">客</div>
                        <div class="w-20 c-9D">主</div>
                        <div class="w-20 c-9D">即</div>
                        <div class="w-20 c-9D">平</div>
                    </div>
                    <div
                        class="fx justify-between"
                        v-for="(item, index) in matchFootballOdds"
                        :key="index"
                        style="width: 100%"
                        :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
                    >
                        <div class="w-20">
                            {{ item.companyInfos[0].companyName }}
                        </div>
                        <div
                            v-for="(value, key) in item.companyInfos[0].yaZhi"
                            :key="key"
                            class="fx justify-between"
                            style="width: 60%"
                        >
                            <div class="w-30 c-9D">{{ value.home }}</div>
                            <div class="w-30 c-9D">{{ value.handicap }}</div>
                            <div class="w-30 c-9D">{{ value.away }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="zsTab === 2" class="fx justify-center mt-20">
                <div style="width: 100%">
                    <div class="fx nav-bg">
                        <div class="w-20">公司</div>
                        <div class="w-20 c-9D">胜</div>
                        <div class="w-20 c-9D">初</div>
                        <div class="w-20 c-9D">负</div>
                        <div class="w-20 c-9D">胜</div>
                        <div class="w-20 c-9D">即</div>
                        <div class="w-20 c-9D">负</div>
                    </div>
                    <div
                        class="fx justify-between"
                        v-for="(item, index) in matchFootballOdds"
                        :key="index"
                        style="width: 100%"
                        :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
                    >
                        <div class="w-20">
                            {{ item.companyInfos[0].companyName }}
                        </div>
                        <div
                            v-for="(value, key) in item.companyInfos[0].ouZhi"
                            :key="key"
                            class="fx justify-between"
                            style="width: 60%"
                        >
                            <div class="w-30 c-9D">{{ value.win }}</div>
                            <div class="w-30 c-9D">{{ value.draw }}</div>
                            <div class="w-30 c-9D">{{ value.loss }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="zsTab === 3" class="fx justify-center mt-20">
                <div style="width: 100%">
                    <div class="fx nav-bg">
                        <div class="w-20">公司</div>
                        <div class="w-20 c-9D">大</div>
                        <div class="w-20 c-9D">初</div>
                        <div class="w-20 c-9D">小</div>
                        <div class="w-20 c-9D">大</div>
                        <div class="w-20 c-9D">即</div>
                        <div class="w-20 c-9D">小</div>
                    </div>
                    <div
                        class="fx justify-between"
                        v-for="(item, index) in matchFootballOdds"
                        :key="index"
                        style="width: 100%"
                        :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
                    >
                        <div class="w-20">
                            {{ item.companyInfos[0].companyName }}
                        </div>
                        <div
                            v-for="(value, key) in item.companyInfos[0].daXiao"
                            :key="key"
                            class="fx justify-between"
                            style="width: 60%"
                        >
                            <div class="w-30 c-9D">{{ value.over }}</div>
                            <div class="w-30 c-9D">{{ value.handicap }}</div>
                            <div class="w-30 c-9D">{{ value.under }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lineup_list" v-if="num === 4">
            <div class="pl-10 fw-700 pt-10 pb-10">数据分析</div>
            <div
                v-for="(item, index) in footballData.matchRecentDtos"
                :key="index"
            >
                <div class="nav-bg mt-10 pl-10 pt-10 pb-10 fs-12">
                    {{ item.teamRecordName }}-<span class="red">{{
                        item.teamRecordWin
                    }}</span>
                    <span class="bule">{{ item.teamRecordTie }}</span>
                    <span class="green">{{ item.teamRecordLost }}</span>
                </div>
                <table class="matchRecentDtos-table">
                    <tr class="c-9D">
                        <td>赛事</td>
                        <td>日期</td>
                        <td></td>
                        <td>比分</td>
                        <td>对手</td>
                    </tr>
                    <tr
                        v-for="(item2, index2) in item.competitionData"
                        :key="index2"
                    >
                        <td v-for="key in item2" :key="key" class="pt-15 fs-13">
                            {{ key }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="nav-bg pl-10 fw-700 pt-10 pb-10">积分榜</div>
            <div class="fx align-items pl-10 pr-10 pt-10">
                <div class="div-left bg-red"></div>
                <img
                    :src="footballData.matchGameInfo.teamInfo.homeTeam.teamLogo"
                    style="width: 15px; height: 15px"
                    class="mr-5"
                />
                <div>
                    {{ footballData.matchGameInfo.teamInfo.homeTeam.teamName }}
                </div>
            </div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                <div class="fx justify-between">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .homeIntegral.header"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c pt-10 fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .homeIntegral.integralHome"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c pt-10 fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .homeIntegral.integralAway"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c pt-10 fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .homeIntegral.integralSum"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
            </div>

            <div class="fx align-items pt-10 pl-10 pr-10">
                <div class="div-left bg-bule"></div>
                <img
                    :src="footballData.matchGameInfo.teamInfo.awayTeam.teamLogo"
                    style="width: 15px; height: 15px"
                    class="mr-5"
                />
                <div>
                    {{ footballData.matchGameInfo.teamInfo.awayTeam.teamName }}
                </div>
            </div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                <div class="fx justify-between ta-c">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .awayIntegral.header"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between pt-10 ta-c fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .awayIntegral.integralHome"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between pt-10 ta-c fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .awayIntegral.integralAway"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between pt-10 ta-c fs-12">
                    <div
                        v-for="(key, index) in footballData.teamIntegralDto
                            .awayIntegral.integralSum"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="num === 5 && hotRankList && hotRankList.length !== 0">
            <div
                v-for="(item, index) in hotRankList"
                :key="index"
                class="pl-10 hotRankList"
                @click="toPage('hotBank', item.id)"
            >
                <div class="fx align-items justify-between">
                    <div class="fx align-items">
                        <div>
                            <img
                                :src="item.anchorIcon"
                                style="
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                "
                            />
                        </div>
                        <div class="ml-10 fs-16 fw-700">
                            {{ item.anchorName }}
                        </div>
                        <div class="fx ml-10">
                            <div class="jx">
                                <div class="jx2">
                                    <div class="content1">
                                        {{ item.continuousWin }}
                                    </div>
                                </div>
                                <div class="content1" style="margin-left: 2px">
                                    选红
                                </div>
                            </div>
                            <div class="jx ml-10">
                                <div class="content1">
                                    近{{ item.sum }}中{{ item.wins }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="red-box">红</div>
                </div>
                <div
                    class="fs-16 text-overflow pr-10"
                    v-if="item.anchorDesc !== null || item.anchorDesc !== ''"
                >
                    {{ item.anchorDesc }}
                </div>
                <div
                    class="fs-16 text-overflow pr-10"
                    v-if="item.anchorDesc === null || item.anchorDesc === ''"
                >
                    {{ item.title }}
                </div>
                <div class="fs-12 mt-10 fx justify-between pr-10">
                    <div class="c-9D">{{ item.releaseTime }}</div>
                    <div style="color: red">竞足｜查看</div>
                </div>
            </div>
        </div>
        <div v-if="num === 6 && matchNews.length !== 0">
            <div
                class="fx align-items justify-between new-list"
                v-for="(item, index) in matchNews"
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
                            />{{ item.likeCount }}
                        </div>
                    </div>
                </div>
                <div class="ml-10">
                    <img :src="item.coverPicture" class="new-img" />
                </div>
            </div>
        </div>
        <div
            class="ta-c no-data"
            v-if="
                (num === 1 && footballData.matchGoals === null) ||
                (num === 6 && matchNews.length === 0) ||
                (num === 2 &&
                    (matchInfoData.guides === undefined ||
                        matchInfoData.guides.length <= 0)) ||
                (num === 5 &&
                    (hotRankList === undefined || hotRankList.length <= 0))
            "
        >
            <div>
                <img src="../../assets/image/no-data.png" width="100px" />
            </div>
            <div class="c-9D ta-c">暂无数据</div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="poupo">
            <div
                class="ta-c pt-10 pb-10"
                style="border-bottom: 1px solid #f3f3f3"
            >
                <img src="../../assets/image/xinhao.png" class="mr-5" />信号源
            </div>
            <div class="fx justify-between">
                <div
                    v-for="(item, index) in matchLiveList"
                    :key="index"
                    class="live-txt"
                    @click="openWindow(item.jumpLiveUrl)"
                >
                    <div class="ta-c c-06">{{ item.liveName }}</div>
                    <div class="ta-c c-9D fs-12 mt-5">
                        由"{{ item.provider }}"提供
                    </div>
                </div>
            </div>
            <div
                v-if="matchLiveList.length === 0"
                class="pb-10"
                style="border-bottom: 1px solid #f3f3f3"
            >
                <div class="ta-c">
                    <img src="../../assets/image/no-xinhao.png" />
                </div>
                <div class="ta-c c-9D">暂无信号源</div>
            </div>
            <div class="pt-10 pb-10 ta-c" @click="closeXinhao">取消</div>
        </mt-popup>
        <!--    <v-footer></v-footer>-->
    </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress';
import footer from '../../components/footer/index';
import $router from '../../router';
export default {
    name: 'index',
    data() {
        return {
            num: 4,
            zsTab: 1,
            popupVisible: false,
            footballData: [],
            matchLiveList: [],
            hotRankList: [],
            matchFootballOdds: [],
            matchInfoData: [],
            matchNews: [],
        };
    },
    components: {
        ProgressBar,
        'v-footer': footer,
    },
    mounted() {
        this.getInfo();
        this.getMatchInfo();
        this.getMatchLiveList();
        this.getHotRankList();
        if (this.$route.query.hotBank) {
            this.num = 5;
        }
        this.getMatchNewsById();
        this.getMatchFootballOdds();
    },
    methods: {
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
        },
        checkXinhao() {
            this.popupVisible = true;
        },
        closeXinhao() {
            this.popupVisible = false;
        },
        openWindow(url) {
            window.open(url);
        },
        check(num) {
            console.log(num);
            this.num = num;
        },
        changeZsTab(num) {
            this.zsTab = num;
        },
        goBack() {
            console.log(this.$route.query.type);
            if (this.$route.query.type === 0) {
                this.$router.push({ name: 'match', query: { type: 0 } });
            } else {
                this.$router.back(-1);
            }
        },
        getMatchInfo() {
            let param = {
                id: this.$route.query.matchId,
            };
            this.$axios('post', '/match/getMatchInfo', param).then((res) => {
                if (res.code === 200) {
                    this.matchInfoData = res.data;
                }
            });
        },
        getInfo() {
            let param = {
                id: this.$route.query.matchId,
            };
            this.$axios('post', '/match/matchInfoFootball', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.footballData = res.data;
                    }
                },
            );
        },
        // 红榜
        getHotRankList() {
            let param = {
                matchId: this.$route.query.matchId,
                pageNum: 1,
                pageSize: 15,
            };
            this.$axios('post', '/match/getHotRankList', param).then((res) => {
                if (res.code === 200) {
                    this.hotRankList = res.data.dataList;
                }
            });
        },
        // 资讯
        getMatchNewsById() {
            let param = {
                matchId: this.$route.query.matchId,
                pageNum: 1,
                pageSize: 15,
            };
            this.$axios('post', '/match/getMatchNewsById', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.matchNews = res.data.dataList;
                    }
                },
            );
        },
        // 指数
        getMatchFootballOdds() {
            let param = {
                id: this.$route.query.matchId,
            };
            this.$axios('post', '/match/matchFootballOdds', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.matchFootballOdds = res.data;
                    }
                },
            );
        },
        // 信号源
        getMatchLiveList() {
            let param = {
                id: this.$route.query.matchId,
            };
            this.$axios('post', '/match/getMatchLiveList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.matchLiveList = res.data;
                    }
                },
            );
        },
    },
};
</script>

<style scoped>
.w-20 {
    width: 20%;
    text-align: center;
    line-height: 35px;
}
.w-30 {
    width: 35%;
    text-align: center;
    line-height: 35px;
}
.no-data {
    height: 100vh;
    padding-top: 30%;
    background: #f7f7f7;
}
.match_content {
    min-height: 100vh;
}
.hotRankList {
    border-bottom: 1px solid #f3f3f3;
    padding-top: 10px;
    padding-bottom: 10px;
}
.poupo {
    width: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.live-txt {
    width: 50%;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
    padding-top: 10px;
    padding-bottom: 10px;
}
.deatils {
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
.red-box {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    width: 30px;
    color: white;
    background: red;
    text-align: center;
    font-size: 13px;
}
.live-btn {
    font-size: 12px;
    color: white;
    background: red;
    border-radius: 2px;
    padding: 2px;
    margin-top: 20px;
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
.img {
    width: 55px;
    height: 55px;
}
.back {
    position: absolute;
    top: 20px;
    left: 18px;
    z-index: 11;
    color: white;
}
.head {
    width: 100%;
    position: absolute;
    top: 10px;
    color: white;
    text-align: center;
    z-index: 10;
    font-size: 14px;
}
.score-box {
    display: flex;
    align-items: center;
    color: white;
    background-image: url('../../assets/image/foot-bg.png');
    background-size: 100% 100%;
    height: 244px;
    padding-top: 30px;
}
.score-div {
    width: 100%;
    margin-right: 15%;
    margin-left: 15%;
}
.nav {
    width: 80px;
    text-align: center;
    color: #666;
    font-size: 14px;
    height: 30px;
}
.cl {
    color: #f8413d;
    border-bottom: 1px solid #f8413d;
}
.event-tab {
    background: #f6f7f8;
    padding: 10px 20px;
    font-weight: 600;
}
.table {
    text-align: center;
    width: 100%;
    color: #666;
    border: none;
}
.red {
    color: red;
}
.bule {
    color: blue;
}
.green {
    color: green;
}
.table tr {
    height: 35px;
}
.table-title {
    background: #f9f9f9;
}
.tr-white {
    background: white;
}
.go-back {
    display: inline-block;
    width: 13px;
    height: 13px;
    transform: rotate(-45deg);
    border: 2px solid #ffffff;
    border-bottom: none;
    border-right: none;
}
.matchRecentDtos-table {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
}
.lineup_list_table {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    text-align: center;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
.on {
    background: #fcf2d8;
}
.lineup_list_table tbody tr td {
    font-size: 13px;
    line-height: 40px;
    color: #000;
    vertical-align: middle;
    width: 48%;
    padding-right: 2%;
    border: 0;
    text-align: right;
}
.lineup_list_table tbody tr td:nth-child(2) {
    padding-right: 0;
    padding-left: 2%;
    text-align: left;
}
.lineup_list_table tbody tr td i {
    border: 1px solid #666;
    text-align: center;
    border-radius: 10px;
    padding: 3px 10px;
}
.zhenx {
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
}
.bar-box {
    background: white;
    padding: 0px 10px 10px 20px;
}
.pro-bar {
    width: 100%;
}
.time-desc {
    border-top: 1px solid #e5e5e5;
    padding-bottom: 10px;
}
.time-desc div {
    width: 80px;
    text-align: center;
    margin-top: 10px;
}
.vs-box {
    margin-top: 10px;
    margin-left: 25px;
    margin-right: 25px;
    font-size: 20px;
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
.div-left {
    width: 3px;
    height: 14px;
    border-radius: 5px;
    margin-right: 10px;
}
.bg-red {
    background: red;
}
.bg-bule {
    background: blue;
}
.tags {
    font-size: 12px;
    color: #007aff;
    margin-right: 10px;
    background: rgba(0, 122, 255, 0.1);
    padding: 2px 3px;
}

.new-box {
    width: 49%;
}
.live-box-foot {
    background: #ffffff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-top: -5px;
    padding-bottom: 5px;
}
.new-box-img {
    width: 100%;
    height: 110px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.new-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    word-break: break-all; /* 内容自动换行 */
    padding-left: 10px;
    font-size: 13px;
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

.zs-tab {
    margin-top: 10px;
}
.zs-tab-li {
    width: 80px;
    line-height: 30px;
    border-radius: 4px;
    color: #959db0;
    text-align: center;
}
.zs-tab-nav {
    background: white;
    margin: 2px;
    color: #f8413d;
}
</style>
<style>
.vue-simple-progress-text {
    display: none !important;
}
.vue-simple-progress {
    background: white !important;
}
.vue-simple-progress-bar {
    height: 4px !important;
}
.v-progress-linear {
    background: white !important;
}
.v-progress-linear__background {
    background-color: white !important;
    border-color: white !important;
}
</style>

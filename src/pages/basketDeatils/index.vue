<template>
    <div class="deatils">
        <div class="back" @click="goBack()">
            <i class="go-back"></i>
            <!--      <span>返回</span>-->
        </div>
        <div class="head" @click="goBack()" v-if="ballData.teamMatchInfo">
            <div>{{ ballData.teamMatchInfo.matchShortName }}</div>
            <div>{{ ballData.matchDay }}&nbsp;{{ ballData.matchTime }}</div>
        </div>
        <div
            class="score-box"
            v-if="ballData.teamMatchInfo"
            @click="checkXinhao"
        >
            <div class="fx align-items justify-between score-div">
                <div class="ta-c">
                    <div>
                        <img
                            :src="ballData.teamMatchInfo.homeTeam.teamLogo"
                            class="img"
                        />
                    </div>
                    <div class="mt-10">
                        {{ ballData.teamMatchInfo.homeTeam.teamName }}
                    </div>
                </div>
                <div class="ta-c">
                    <div class="fs-18 fw-700">
                        <span v-if="ballData.status === 3">
                            {{ ballData.teamMatchInfo.homeTeam.score }} :
                            {{ ballData.teamMatchInfo.awayTeam.score }}
                        </span>
                        <span v-if="ballData.status === 2">-</span>
                    </div>
                    <div>
                        <span v-if="ballData.status === 3">已结束</span>
                        <span v-if="ballData.status === 2">即将开始</span>
                    </div>
                    <div class="live-btn">观看直播</div>
                </div>
                <div class="ta-c">
                    <div>
                        <img
                            :src="ballData.teamMatchInfo.awayTeam.teamLogo"
                            class="img"
                        />
                    </div>
                    <div class="mt-10">
                        {{ ballData.teamMatchInfo.awayTeam.teamName }}
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
                阵容
            </div>
            <div class="nav" :class="num === 3 ? 'cl' : ''" @click="check(3)">
                直播
            </div>
            <div class="nav" :class="num === 4 ? 'cl' : ''" @click="check(4)">
                分析
            </div>
            <div class="nav" :class="num === 5 ? 'cl' : ''" @click="check(5)">
                指数
            </div>
            <div class="nav" :class="num === 6 ? 'cl' : ''" @click="check(6)">
                红榜
            </div>
        </div>
        <div class="pt-10" v-if="num === 1 && ballData.teamMatchInfo">
            <div class="ta-c fw-700">----一手情报----</div>
            <div class="fx align-items mt-10 pl-10 pr-10">
                <div class="div-left"></div>
                <img
                    :src="ballData.teamMatchInfo.homeTeam.teamLogo"
                    width="20px"
                    class="mr-5"
                />
                <div>{{ ballData.teamMatchInfo.homeTeam.teamName }}</div>
            </div>
            <div class="nav-bg red mt-10 pl-10 pt-10 pb-10">有利情报</div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                {{ ballData.matchTeamMsg.homeMsg.goodMsg }}
            </div>
            <div class="nav-bg bule mt-10 pl-10 pt-10 pb-10">不利情报</div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                {{ ballData.matchTeamMsg.homeMsg.badMsg }}
            </div>
            <div class="nav-bg pt-10"></div>
            <div class="fx align-items mt-10 pl-10 pr-10">
                <div class="div-left"></div>
                <img
                    :src="ballData.teamMatchInfo.awayTeam.teamLogo"
                    width="20px"
                    class="mr-5"
                />
                <div>{{ ballData.teamMatchInfo.awayTeam.teamName }}</div>
            </div>
            <div class="nav-bg red mt-10 pl-10 pt-10 pb-10">有利情报</div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                {{ ballData.matchTeamMsg.awayMsg.goodMsg }}
            </div>
            <div class="nav-bg bule mt-10 pl-10 pt-10 pb-10">不利情报</div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                {{ ballData.matchTeamMsg.awayMsg.badMsg }}
            </div>
            <div class="nav-bg pt-10"></div>
            <div
                class="fx align-items justify-between vs-box"
                v-if="
                    ballData.homeCompetition &&
                    ballData.homeCompetition.length !== 0 &&
                    ballData.awayCompetition &&
                    ballData.awayCompetition.length !== 0
                "
            >
                <div>
                    <img
                        :src="ballData.teamMatchInfo.homeTeam.teamLogo"
                        width="30px"
                    />
                </div>
                <div>vs</div>
                <div>
                    <img
                        :src="ballData.teamMatchInfo.awayTeam.teamLogo"
                        width="30px"
                    />
                </div>
            </div>
            <div
                class="bar-box"
                v-if="
                    ballData.homeCompetition &&
                    ballData.homeCompetition.length !== 0 &&
                    ballData.awayCompetition &&
                    ballData.awayCompetition.length !== 0
                "
            >
                <div class="fx align-items justify-between fs-12 ml-10 mr-10">
                    <div>{{ ballData.homeCompetition.score }}</div>
                    <div class="ml-20">得分</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.score }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.score"
                            :color="
                                ballData.homeCompetition.score <
                                ballData.awayCompetition.score
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.score <
                                ballData.awayCompetition.score
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.score"
                        ></progress-bar>
                    </div>
                </div>
                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.shots }}</div>
                    <div class="ml-20">投篮</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.shots }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.shots"
                            :color="
                                ballData.homeCompetition.shots <
                                ballData.awayCompetition.shots
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.shots <
                                ballData.awayCompetition.shots
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.shots"
                        ></progress-bar>
                    </div>
                </div>
                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.shootNum }}</div>
                    <div class="ml-20">投篮命中</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.shootNum }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.shootNum"
                            :color="
                                ballData.homeCompetition.shootNum <
                                ballData.awayCompetition.shootNum
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.shootNum <
                                ballData.awayCompetition.shootNum
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.shootNum"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.threeShots }}</div>
                    <div class="ml-20">三分</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.threeShots }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.threeShots"
                            :color="
                                ballData.homeCompetition.threeShots <
                                ballData.awayCompetition.threeShots
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.threeShots <
                                ballData.awayCompetition.threeShots
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.threeShots"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.threeShotNum }}</div>
                    <div class="ml-20">三分命中</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.threeShotNum }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.threeShotNum"
                            :color="
                                ballData.homeCompetition.threeShotNum <
                                ballData.awayCompetition.threeShotNum
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.threeShotNum <
                                ballData.awayCompetition.threeShotNum
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.threeShotNum"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.freeThrows }}</div>
                    <div class="ml-20">罚球</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.freeThrows }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.freeThrows"
                            :color="
                                ballData.homeCompetition.freeThrows <
                                ballData.awayCompetition.freeThrows
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.freeThrows <
                                ballData.awayCompetition.freeThrows
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.freeThrows"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.freeThrowNum }}</div>
                    <div class="ml-20">罚球命中</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.freeThrowNum }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.freeThrowNum"
                            :color="
                                ballData.homeCompetition.freeThrowNum <
                                ballData.awayCompetition.freeThrowNum
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.freeThrowNum <
                                ballData.awayCompetition.freeThrowNum
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.freeThrowNum"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.assists }}</div>
                    <div class="ml-20">助攻</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.assists }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.assists"
                            :color="
                                ballData.homeCompetition.assists <
                                ballData.awayCompetition.assists
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.assists <
                                ballData.awayCompetition.assists
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.assists"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.attackBoard }}</div>
                    <div class="ml-20">助攻篮板</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.attackBoard }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.attackBoard"
                            :color="
                                ballData.homeCompetition.attackBoard <
                                ballData.awayCompetition.attackBoard
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.attackBoard <
                                ballData.awayCompetition.attackBoard
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.attackBoard"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.defensiveBoard }}</div>
                    <div class="ml-20">防守篮板</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.defensiveBoard }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.defensiveBoard"
                            :color="
                                ballData.homeCompetition.defensiveBoard <
                                ballData.awayCompetition.defensiveBoard
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.defensiveBoard <
                                ballData.awayCompetition.defensiveBoard
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.defensiveBoard"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.steals }}</div>
                    <div class="ml-20">抢断</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.steals }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.steals"
                            :color="
                                ballData.homeCompetition.steals <
                                ballData.awayCompetition.steals
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.steals <
                                ballData.awayCompetition.steals
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.steals"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.error }}</div>
                    <div class="ml-20">失误</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.error }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.error"
                            :color="
                                ballData.homeCompetition.error <
                                ballData.awayCompetition.error
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.error <
                                ballData.awayCompetition.error
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.error"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.blocks }}</div>
                    <div class="ml-20">盖帽</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.blocks }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.blocks"
                            :color="
                                ballData.homeCompetition.blocks <
                                ballData.awayCompetition.blocks
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.blocks <
                                ballData.awayCompetition.blocks
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.blocks"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.foul }}</div>
                    <div class="ml-20">犯规</div>
                    <div class="ml-20">{{ ballData.awayCompetition.foul }}</div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.foul"
                            :color="
                                ballData.homeCompetition.foul <
                                ballData.awayCompetition.foul
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.foul <
                                ballData.awayCompetition.foul
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.foul"
                        ></progress-bar>
                    </div>
                </div>

                <div
                    class="fx align-items justify-between mt-20 fs-12 ml-10 mr-10"
                >
                    <div>{{ ballData.homeCompetition.totalBoards }}</div>
                    <div class="ml-20">篮板</div>
                    <div class="ml-20">
                        {{ ballData.awayCompetition.totalBoards }}
                    </div>
                </div>
                <div class="mt-10 fx justify-center">
                    <div
                        class="fx align-items justify-between"
                        style="width: 50%"
                    >
                        <v-progress-linear
                            v-model="ballData.homeCompetition.totalBoards"
                            :color="
                                ballData.homeCompetition.totalBoards <
                                ballData.awayCompetition.totalBoards
                                    ? '#EEEEEE'
                                    : '#3179FF'
                            "
                            reactive
                        ></v-progress-linear>
                        <progress-bar
                            :bar-color="
                                ballData.homeCompetition.totalBoards <
                                ballData.awayCompetition.totalBoards
                                    ? '#3179FF'
                                    : '#EEEEEE'
                            "
                            class="pro-bar ml-10"
                            :val="ballData.awayCompetition.totalBoards"
                        ></progress-bar>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-bg" v-if="num === 2">
            <div class="match_content">
                <div class="match_member">
                    <div
                        class="match_member_list mt-10 clearfix"
                        v-if="ballData.homePlayerList"
                    >
                        <div class="list_name">
                            <li>
                                {{ ballData.teamMatchInfo.homeTeam.teamName }}
                            </li>
                            <li
                                v-for="(item, index) in ballData.homePlayerList"
                                :key="index"
                            >
                                {{ item.playerName }}
                            </li>
                        </div>
                        <div class="list_table">
                            <table
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                style="width: 24.6rem"
                            >
                                <tbody>
                                    <tr>
                                        <th style="width: 2.05rem">首发</th>
                                        <th style="width: 2.05rem">时间</th>
                                        <th style="width: 2.05rem">得分</th>
                                        <th style="width: 2.05rem">篮板</th>
                                        <th style="width: 2.05rem">投篮</th>
                                        <th style="width: 2.05rem">三分</th>
                                        <th style="width: 2.05rem">罚球</th>
                                        <th style="width: 2.05rem">助攻</th>
                                        <th style="width: 2.05rem">抢断</th>
                                        <th style="width: 2.05rem">盖帽</th>
                                        <th style="width: 2.05rem">失误</th>
                                        <th style="width: 2.05rem">犯规</th>
                                    </tr>
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in ballData.homePlayerList"
                                        :key="index"
                                    >
                                        <td>
                                            <span v-if="item.isFirst === 0"
                                                >是</span
                                            >
                                            <span v-if="item.isFirst === 1"
                                                >否</span
                                            >
                                        </td>
                                        <td>{{ item.playingTime }}</td>
                                        <td>{{ item.score }}</td>
                                        <td>{{ item.totalBoards }}</td>
                                        <td>{{ item.shots }}</td>
                                        <td>{{ item.threeShots }}</td>
                                        <td>{{ item.freeThrows }}</td>
                                        <td>{{ item.assists }}</td>
                                        <td>{{ item.steals }}</td>
                                        <td>{{ item.blocks }}</td>
                                        <td>{{ item.error }}</td>
                                        <td>{{ item.foul }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        class="match_member_list mt-10 clearfix"
                        v-if="ballData.awayPlayerList"
                    >
                        <div class="list_name">
                            <li>
                                {{ ballData.teamMatchInfo.awayTeam.teamName }}
                            </li>
                            <li
                                v-for="(item, index) in ballData.awayPlayerList"
                                :key="index"
                            >
                                {{ item.playerName }}
                            </li>
                        </div>
                        <div class="list_table">
                            <table
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                style="width: 24.6rem"
                            >
                                <tbody>
                                    <tr>
                                        <th style="width: 2.05rem">首发</th>
                                        <th style="width: 2.05rem">时间</th>
                                        <th style="width: 2.05rem">得分</th>
                                        <th style="width: 2.05rem">篮板</th>
                                        <th style="width: 2.05rem">投篮</th>
                                        <th style="width: 2.05rem">三分</th>
                                        <th style="width: 2.05rem">罚球</th>
                                        <th style="width: 2.05rem">助攻</th>
                                        <th style="width: 2.05rem">抢断</th>
                                        <th style="width: 2.05rem">盖帽</th>
                                        <th style="width: 2.05rem">失误</th>
                                        <th style="width: 2.05rem">犯规</th>
                                    </tr>
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in ballData.awayPlayerList"
                                        :key="index"
                                    >
                                        <td>
                                            <span v-if="item.isFirst === 0"
                                                >是</span
                                            >
                                            <span v-if="item.isFirst === 1"
                                                >否</span
                                            >
                                        </td>
                                        <td>{{ item.playingTime }}</td>
                                        <td>{{ item.score }}</td>
                                        <td>{{ item.totalBoards }}</td>
                                        <td>{{ item.shots }}</td>
                                        <td>{{ item.threeShots }}</td>
                                        <td>{{ item.freeThrows }}</td>
                                        <td>{{ item.assists }}</td>
                                        <td>{{ item.steals }}</td>
                                        <td>{{ item.blocks }}</td>
                                        <td>{{ item.error }}</td>
                                        <td>{{ item.foul }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="
                num === 3 &&
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
        <div v-if="num === 4">
            <div class="pl-10 fw-700 pt-10 pb-10">数据分析</div>
            <div v-for="(item, index) in ballData.matchRecentDtos" :key="index">
                <div class="nav-bg mt-10 pl-10 pt-10 pb-10">
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
                        <td v-for="key in item2" :key="key" class="pt-10 fs-13">
                            {{ key }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="nav-bg pl-10 fw-700 pt-10 pb-10">积分榜</div>
            <div class="fx align-items pl-10 pr-10 pt-10">
                <div class="div-left"></div>
                <img
                    :src="ballData.teamMatchInfo.homeTeam.teamLogo"
                    width="20px"
                    class="mr-5"
                />
                <div>{{ ballData.teamMatchInfo.homeTeam.teamName }}</div>
            </div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                <div class="fx justify-between">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .homeIntegral.header"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .homeIntegral.integralHome"
                        style="width: 10%; text-align: center"
                        class="pt-10"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .homeIntegral.integralAway"
                        style="width: 10%; text-align: center"
                        class="pt-10"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c pt-10 fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .homeIntegral.integralSum"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
            </div>

            <div class="fx align-items pt-10 pl-10 pr-10">
                <div class="div-left"></div>
                <img
                    :src="ballData.teamMatchInfo.awayTeam.teamLogo"
                    width="20px"
                    class="mr-5"
                />
                <div>{{ ballData.teamMatchInfo.awayTeam.teamName }}</div>
            </div>
            <div class="pl-10 pr-10 pt-10 pb-10">
                <div class="fx justify-between ta-c">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .awayIntegral.header"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .awayIntegral.integralHome"
                        style="width: 10%; text-align: center"
                        class="pt-10"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between ta-c fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .awayIntegral.integralAway"
                        style="width: 10%; text-align: center"
                        class="pt-10"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
                <div class="fx justify-between pt-10 ta-c fs-12">
                    <div
                        v-for="(key, index) in ballData.teamIntegralDto
                            .awayIntegral.integralSum"
                        style="width: 10%; text-align: center"
                        :key="key + index"
                    >
                        {{ key }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="match_content"
            v-if="
                num === 5 && matchFootballOdds && matchFootballOdds.length !== 0
            "
        >
            <div class="fx justify-center">
                <div class="fx nav-bg zs-tab">
                    <div
                        class="zs-tab-li"
                        :class="zsTab === 1 ? 'zs-tab-nav' : ''"
                        @click="changeZsTab(1)"
                    >
                        让分
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
                            v-for="(value, key) in item.companyInfos[0].ranFen"
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
        <div v-if="num === 6 && hotRankList && hotRankList.length !== 0">
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
        <div
            class="ta-c no-data"
            v-if="
                (num === 2 &&
                    !ballData.homePlayerList &&
                    !ballData.awayPlayerList) ||
                (num === 3 &&
                    (matchInfoData.guides === undefined ||
                        matchInfoData.guides.length <= 0)) ||
                (num === 6 &&
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
            <div class="fx justify-between" v-if="matchLiveList.length !== 0">
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
    </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress';
import footer from '../../components/footer/index.vue';
export default {
    name: 'index',
    data() {
        return {
            num: 4,
            ballData: [],
            zsTab: 1,
            popupVisible: false,
            matchLiveList: [],
            hotRankList: [],
            matchInfoData: [],
            matchFootballOdds: [],
            tagName: this.$route.query.tagName,
        };
    },
    components: {
        ProgressBar,
        'v-footer': footer,
    },
    mounted() {
        this.getInfo();
        this.getMatchLiveList();
        this.getMatchInfo();
        this.getHotRankList();
        if (this.$route.query.hotBank) {
            this.num = 6;
        }
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
        goBack() {
            if (this.$route.query.type === 1) {
                this.$router.push({ name: 'match', query: { type: 1 } });
            } else {
                this.$router.back(-1);
            }
        },
        changeZsTab(num) {
            this.zsTab = num;
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
            this.$axios('post', '/match/matchInfoBasketball', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.ballData = res.data;
                        // this.title = res.data.title
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
        // 指数
        getMatchFootballOdds() {
            let param = {
                id: this.$route.query.matchId,
            };
            this.$axios('post', '/match/matchBasketballOdds', param).then(
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
.on {
    background: #fcf2d8;
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
.no-data {
    height: 100vh;
    padding-top: 30%;
    background: #f7f7f7;
}
.div-left {
    width: 3px;
    height: 14px;
    background: #4a148c;
    border-radius: 5px;
    margin-right: 10px;
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
    background-image: url('../../assets/image/basketball-bg.png');
    background-size: 100% 100%;
    height: 244px;
    padding-top: 30px;
}
.score-div {
    width: 100%;
    margin-right: 10%;
    margin-left: 10%;
}
.nav {
    width: 100px;
    text-align: center;
    color: #666;
    font-size: 16px;
    height: 30px;
}
.cl {
    color: #3179ff;
    border-bottom: 1px solid #3179ff;
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
.match_betab_nav {
    padding: 10px;
}
.match_betab_nav h1 {
    font-size: 16px;
    height: 20px;
    padding-left: 10px;
    border-left: 3px solid #3179ff;
    font-weight: bold;
}
.table {
    text-align: center;
    width: 100%;
    color: #666;
    border: none;
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
.lineup_list_table {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
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
    padding: 10px 20px;
}
.pro-bar {
    width: 100%;
}
.vs-box {
    margin-top: 10px;
    margin-left: 25px;
    margin-right: 25px;
    font-size: 20px;
}
.live-btn {
    font-size: 12px;
    color: white;
    background: #1a73c7;
    border-radius: 2px;
    padding: 2px;
    margin-top: 10px;
}
.matchRecentDtos-table {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
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
    color: white;
    background: red;
    text-align: center;
    font-size: 13px;
}
.hotRankList {
    border-bottom: 1px solid #f3f3f3;
    padding-top: 10px;
    padding-bottom: 10px;
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

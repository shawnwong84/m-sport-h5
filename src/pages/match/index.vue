<template>
    <div class="match-box">
        <div class="match-nav">
            <div
                class="match-item"
                v-for="item in navList"
                :key="item.id"
                :class="{ active: currentIndex === item.id }"
                @click="changeIndex(item.id)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="match-content">
            <div
                class="match-item"
                v-for="item in matchList"
                :key="item.matchTime"
            >
                <div class="match-time">{{ item.matchTime }}</div>
                <div
                    class="competition-item"
                    v-for="match in item.matchInfos"
                    :key="match.id"
                >
                    <div class="competition-left">
                        <div class="competition-time">
                            {{ match.matchTime }}
                        </div>
                        <div class="competition-name">
                            {{ match.matchShortName }}
                        </div>
                    </div>
                    <div class="competition-center">
                        <div class="team">
                            <div class="team-icon">
                                <img :src="match.awayTeam.teamIcon" alt="" />
                            </div>
                            <div class="team-name">
                                {{ match.awayTeam.teamName }}
                            </div>
                            <div class="team-grade">
                                {{ match.awayTeam.score }}
                            </div>
                        </div>
                        <div class="team">
                            <div class="team-icon">
                                <img :src="match.homeTeam.teamIcon" alt="" />
                            </div>
                            <div class="team-name">
                                {{ match.homeTeam.teamName }}
                            </div>
                            <div class="team-grade">
                                {{ match.homeTeam.score }}
                            </div>
                        </div>
                    </div>
                    <div class="competition-right">
                        <div
                            class="sub-btn"
                            @click="getAppoinment(match)"
                            :class="{ already: match.subscribe }"
                        >
                            {{ match.subscribe ? '已预约' : '预约' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Cookie } from '../../api/cookie';
export default {
    name: 'match',
    data() {
        return {
            navList: [
                {
                    id: 0,
                    name: '足球',
                },
                {
                    id: 1,
                    name: '篮球',
                },
            ],
            currentIndex: 0,
            matchList: [],
        };
    },
    components: {},
    watch: {},
    mounted() {
        this.getList(this.currentIndex);
    },
    methods: {
        // 获取赛程列表
        getList(id) {
            let param = {
                id: id,
                status: 0,
            };
            this.$axios('post', '/match/getMatchList', param).then((res) => {
                if (res.code === 200) {
                    this.matchList = res.data.matchLists;
                }
            });
        },
        changeIndex(id) {
            if (this.currentIndex === id) return;
            this.currentIndex = id;
            this.getList(id);
        },
        // 用户预约
        getAppoinment(item) {
            if (Cookie.get('token')) {
                let param = {
                    id: item.id,
                };
                if (item.subscribe) {
                    this.$axios(
                        'post',
                        '/match/userCancelReserveMatch',
                        param,
                    ).then((res) => {
                        if (res.code === 200) {
                            this.getList(this.currentIndex);
                            this.$toast({
                                message: '取消预约成功',
                            });
                        }
                    });
                } else {
                    this.$axios('post', '/match/userReserveMatch', param).then(
                        (res) => {
                            if (res.code === 200) {
                                this.getList(this.currentIndex);
                                this.$toast({
                                    message: '预约成功',
                                });
                            }
                        },
                    );
                }
            } else {
                this.$router.push('/login');
            }
        },
    },
};
</script>

<style scoped lang="scss">
.match-box {
    width: 100%;
    .match-nav {
        width: 100%;
        @include flexCenter();
        height: 40px;
        background-color: #fff;
        .match-item {
            color: #666666;
            font-size: 16px;
            margin-right: 10px;
            &.active {
                font-size: 16px;
                font-weight: 500;
                color: #282828;
                @include flexColumnCenter();
                &::after {
                    display: inline-block;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background: linear-gradient(
                        180deg,
                        #ff8d86 0%,
                        #f8413d 100%
                    );
                    border-radius: 1px;
                    transform: translateY(4px);
                }
            }
        }
    }
    .match-content {
        width: 100%;

        .match-item {
            width: 100%;

            .match-time {
                width: 100%;
                font-size: 12px;
                height: 30px;
                padding: 0 16px;
                position: sticky;
                top: 0;
                left: 0;
                background: #f7f7f7;
                line-height: 30px;
            }
            .competition-item {
                width: 100%;
                height: 78px;
                padding: 0 16px;
                background: #fff;
                @include flexBetweenCenter();
                border-bottom: 1px solid #f1f1f1;
                .competition-left {
                    width: 77px;
                    .competition-time {
                        font-weight: 500;
                        color: #282828;
                        font-size: 18px;
                    }
                    .competition-name {
                        color: #666666;
                        font-size: 12px;
                        width: 100%;
                        @include textEllipsis();
                    }
                }
                .competition-center {
                    flex: 1;
                    padding: 0 5px;
                    border-right: 1px solid #f1f1f1;
                    .team {
                        width: 100%;
                        @include flexBetweenCenter();
                        margin-bottom: 5px;
                        .team-icon {
                            width: 24px;
                            height: 24px;
                            margin-right: 6px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .team-name {
                            width: 120px;
                            font-size: 14px;
                            color: #282828;
                            @include textEllipsis();
                        }
                        .team-grade {
                            font-size: 18px;
                            color: #666666;
                        }
                    }
                }
                .competition-right {
                    width: 93px;
                    height: 100%;
                    @include flexCenter();
                    .sub-btn {
                        min-width: 61px;
                        height: 26px;
                        background: #f8413d;
                        border-radius: 2px;
                        @include flexCenter();
                        color: #ffffff;
                        font-size: 14px;
                        &.already {
                            color: #f8413d;
                            background: #ffe3e2;
                        }
                    }
                }
            }
        }
    }
}
</style>

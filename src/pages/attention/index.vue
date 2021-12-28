<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="attention-box">
        <div class="attention-list" v-if="userAnchorList.length > 0">
            <div
                class="attention-item"
                v-for="item in userAnchorList"
                :key="item.id"
            >
                <div class="anchor-avatar">
                    <img :src="item.anchorAvatar" alt="" />
                </div>
                <div class="room-info">
                    <span class="name">
                        {{ item.anchorName }}
                    </span>
                    <span class="room-title">{{ item.roomName }}</span>
                </div>
                <div
                    class="live-btn"
                    @click="toPage(item.roomId)"
                    :class="{ over: item.liveStatus !== 1 }"
                >
                    {{ item.liveStatus === 1 ? '直播中' : '已结束' }}
                </div>
            </div>
        </div>
        <noData v-else></noData>
        <div class="match-common-box">
            <h2 class="title">正在热播</h2>
            <div class="match-list">
                <matchItem
                    v-for="item in hotList"
                    :key="item.roomId"
                    :item="item"
                ></matchItem>
            </div>
        </div>
    </div>
</template>

<script>
import matchItem from '../../components/matchItem';
import noData from '../../components/noData';
export default {
    name: 'attention',
    data() {
        return {
            userAnchorList: [],
            hotList: [],
        };
    },
    components: {
        matchItem,
        noData,
    },
    watch: {},
    mounted() {
        this.userGetAnchorList();
        this.getHotList();
    },
    methods: {
        // 我的关注
        userGetAnchorList() {
            this.$axios('post', '/match/userGetAnchorList').then((res) => {
                if (res.code === 200) {
                    this.userAnchorList = res.data;
                }
            });
        },
        getHotList() {
            let param = {
                pageNum: 1,
                pageSize: 30,
            };
            this.$axios('post', '/live/getHotLiveList', param).then((res) => {
                if (res.code === 200) {
                    this.hotList = res.data.dataList;
                }
            });
        },
        toPage(id) {
            this.$router.push({ name: 'room', query: { id: id } });
        },
    },
};
</script>

<style scoped lang="scss">
.attention-box {
    width: 100%;
    padding-bottom: 65px;
    .attention-list {
        width: 100%;
        padding: 16px 16px 10px;
        background: #fff;
        margin-bottom: 22px;
        .attention-item {
            width: 100%;
            @include flexBetweenCenter();
            margin-bottom: 10px;
            .anchor-avatar {
                width: 46px;
                height: 46px;
                margin-right: 8px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            .room-info {
                flex: 1;
                @include flexColumnStart2();
                .name {
                    color: #282828;
                    font-size: 14px;
                    font-weight: 500;
                }
                .room-title {
                    font-size: 12px;
                    color: #666666;
                    display: inline-block;
                    margin-top: 6px;
                    width: 190px;
                    @include textEllipsis();
                }
            }
            .live-btn {
                width: 61px;
                height: 26px;
                background: #ffeccf;
                border-radius: 2px;
                @include flexCenter();
                font-size: 14px;
                color: #92600d;
                margin-left: 10px;
                &.over {
                    background: #9e9e9e;
                    color: #fff;
                }
            }
        }
    }
    .match-common-box {
        width: 100%;
        margin-bottom: 20px;
        padding: 0 16px;
        .title {
            font-size: 16px;
            color: #282828;
            margin-bottom: 12px;
        }

        .match-list {
            width: 100%;
            @include flexBetweenCenterWrap();
        }
    }
}
</style>

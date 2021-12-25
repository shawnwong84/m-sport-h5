<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="all-ball">
        <div class="match-list">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getBall"
                class="match-list"
            >
                <matchItem
                    v-for="item in ballList"
                    :key="item.roomId"
                    :item="item"
                ></matchItem>
            </van-list>
        </div>
    </div>
</template>

<script>
import matchItem from '../../../components/matchItem';
export default {
    name: 'allBall',
    data() {
        return {
            ballList: [],
            loading: false,
            finished: false,
            pageNum: 1,
        };
    },
    components: {
        matchItem,
    },
    watch: {},
    methods: {
        getBall() {
            this.loading = true;
            let param = {
                pageNum: this.pageNum++,
                pageSize: 10,
                type: -1,
            };
            this.$axios('post', '/live/getTopLiveList', param).then((res) => {
                this.loading = false;
                if (res.code === 200) {
                    this.ballList = this.ballList.concat(res.data.dataList);
                }
                if (res.data.dataList && res.data.dataList.length === 0) {
                    this.finished = true;
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.all-ball {
    width: 100%;
    padding: 16px 16px 70px;
    .match-list {
        width: 100%;
        @include flexBetweenCenterWrap();
    }
    ::v-deep .van-list__finished-text {
        width: 100%;
    }
    ::v-deep .van-list__loading {
        width: 100%;
    }
}
</style>

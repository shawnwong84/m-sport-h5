<template>
    <div class="message-box">
        <van-nav-bar title="消息中心" left-arrow @click-left="$router.back()" />

        <div class="message-list" v-if="messageList.length">
            <div
                class="message-list-item"
                v-for="item in messageList"
                :key="item.id"
            >
                <img src="../../assets/image/my/message-icon.png" alt="" />
                <p>{{ item.msgContent }}</p>
            </div>
        </div>

        <noData v-else></noData>
    </div>
</template>

<script>
import noData from '../../components/noData';
export default {
    name: 'index',
    data() {
        return {
            messageList: [],
        };
    },
    components: { noData },
    mounted() {
        this.getUserMsgList();
    },
    methods: {
        // 获取我的消息列表
        getUserMsgList() {
            let param = {
                pageNum: 1,
                pageSize: 60,
            };
            this.$axios('post', '/user/getUserMsgList', param).then((res) => {
                if (res.code === 200) {
                    this.messageList = res.data.dataList;
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.message-box {
    width: 100%;

    .message-list {
        width: 100%;
        background-color: #fff;
        padding: 0 16px;
        &-item {
            width: 100%;
            @include flexStartCenter();
            padding: 10px 0;
            &:not(:last-child) {
                border-bottom: 1px solid #f1f1f1;
            }
            img {
                width: 34px;
                height: 34px;
                margin-right: 5px;
            }
            p {
                flex: 1;
                font-size: 14px;
                color: #282828;
                word-wrap: break-word;
                word-break: break-all;
            }
        }
    }
}
</style>

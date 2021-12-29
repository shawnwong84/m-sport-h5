<template>
    <div class="feedback-list-box">
        <van-nav-bar title="意见反馈" left-arrow @click-left="$router.back()">
            <template #right>
                <div class="right-box" @click="toPage('/feedbackForm')">
                    <img src="../../assets/image/my/edit-icon.png" alt="" />
                    <span>去反馈</span>
                </div>
            </template>
        </van-nav-bar>
        <div class="feedback-list" v-if="userFeedbackList.length > 0">
            <div
                class="feedback-list-item"
                v-for="item in userFeedbackList"
                :key="item.id"
            >
                <img src="../../assets/image/my/message-icon.png" alt="" />
                <p>{{ item.contactDetails }}</p>
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
            userFeedbackList: [],
        };
    },
    components: {
        noData,
    },
    watch: {},
    mounted() {
        this.getUserFeedbackList();
    },
    methods: {
        // 获取我的反馈列表
        getUserFeedbackList() {
            this.$axios('post', '/user/getUserFeedbackList').then((res) => {
                if (res.code === 200) {
                    this.userFeedbackList = res.data;
                }
            });
        },
        toPage(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped lang="scss">
.feedback-list-box {
    width: 100%;
    .right-box {
        @include flexCenter();
        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
        span {
            color: $primary-color;
        }
    }
    .feedback-list {
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

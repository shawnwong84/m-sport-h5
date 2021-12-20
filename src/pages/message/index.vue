<template>
    <div>
        <v-down></v-down>
        <div class="back" @click="$utils.goBack">
            <img src="../../assets/image/back.png" width="20px" />
        </div>
        <div class="fx align-items justify-center mt-10">
            <div class="fs-20 fw-700">消息中心</div>
        </div>
        <div class="feedback">
            <div>
                <div
                    v-if="userFeedbackList.length !== 0"
                    class="fx align-items feedback-list"
                    v-for="(item, index) in userFeedbackList"
                >
                    <div>
                        <img
                            src="../../assets/image/feedback-msg.png"
                            width="44px"
                        />
                    </div>
                    <div class="ml-10 border-bottom">
                        {{ item.contactDetails }}
                    </div>
                </div>
                <div class="no-data" v-if="userFeedbackList.length === 0">
                    <div>
                        <img
                            src="../../assets/image/nothing.png"
                            width="240px"
                        />
                    </div>
                    <div class="c-9D">暂无数据</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index';
export default {
    name: 'index',
    data() {
        return {
            userFeedbackList: [],
        };
    },
    components: { 'v-down': down },
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
                    this.userFeedbackList = res.data.dataList;
                }
            });
        },
    },
};
</script>

<style scoped>
.no-data {
    margin-top: 30%;
    text-align: center;
}
.back {
    position: absolute;
    top: 64px;
    left: 15px;
}
.c-bule {
    color: rgb(22, 153, 197);
}
.feedback-list {
    padding: 15px;
}
.border-bottom {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 15px;
}
.active {
    background: linear-gradient(132deg, #ebcbab 0%, #dbb170 100%);
    color: #fff;
    border: 1px solid #dbb170 !important;
}
.gary-border {
    height: 10px;
    background: rgb(244, 244, 244);
}
.btn {
    width: 88px;
    line-height: 40px;
    text-align: center;
    border-radius: 30px;
    border: 1px solid #ddd;
    margin-right: 10px;
}
textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
}
.submit {
    width: 100%;
    line-height: 50px;
    text-align: center;
    border-radius: 30px;
    background: #f2f4f7;
    margin-top: 30px;
    margin-bottom: 30px;
}
.feedback {
    width: 100%;
    position: absolute;
    top: 110px;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
}
.ta-right {
    text-align: right;
    font-size: 16px;
    color: #ddd;
}
.file {
    width: 100px;
    height: 100px;
    background-image: url('../../assets/image/upload.png');
    background-size: 100% 100%;
    margin-top: 10px;
}
.file input {
    opacity: 0;
    width: 100px;
    height: 100px;
}
</style>

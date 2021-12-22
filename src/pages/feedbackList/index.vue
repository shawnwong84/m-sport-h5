<template>
    <div>
        <v-down></v-down>
        <div class="fx align-items justify-between mt-15 ml-10 mr-10">
            <div @click="$utils.goBack">
                <img src="../../assets/image/back.png" width="20px" />
            </div>
            <div class="fs-20 fw-700">我的反馈</div>
            <div>
                <div
                    class="fx align-items"
                    @click="gotofeedback"
                    v-if="!isFeedback"
                >
                    <div>
                        <img
                            src="../../assets/image/feedback.png"
                            width="20px"
                        />
                    </div>
                    <div class="c-bule">去反馈</div>
                </div>
            </div>
        </div>
        <div class="feedback">
            <div v-if="!isFeedback">
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
            <div v-if="isFeedback">
                <div class="feedback-list">
                    <div class="fs-16 fw-700">反馈类型</div>
                    <div class="fx align-items mt-15">
                        <div
                            class="btn"
                            :class="requestType === 956 ? 'active' : ''"
                            @click="checkFeedback(956)"
                        >
                            建议
                        </div>
                        <div
                            class="btn"
                            :class="requestType === 957 ? 'active' : ''"
                            @click="checkFeedback(957)"
                        >
                            错误
                        </div>
                        <div
                            class="btn"
                            :class="requestType === 958 ? 'active' : ''"
                            @click="checkFeedback(958)"
                        >
                            其他
                        </div>
                    </div>
                </div>
                <div class="gary-border"></div>
                <div class="feedback-list">
                    <div class="fs-16 fw-700">反馈内容</div>
                    <div class="mt-10">
                        <textarea
                            class="msg"
                            placeholder="请尽量详细描述你要反馈的问题，以便我们尽快为你解决"
                            @input="descInput"
                            v-model="contactDetails"
                            maxlength="500"
                        ></textarea>
                    </div>
                    <div class="ta-right">{{ remnant }}</div>
                </div>
                <div class="gary-border"></div>
                <div class="feedback-list">
                    <div class="fs-16 fw-700">截图上传</div>
                    <div class="file" v-if="feedbackImg === ''">
                        <input
                            accept="image/*"
                            type="file"
                            @change="btnUploadFile"
                        />
                    </div>
                    <div v-if="feedbackImg !== ''">
                        <img
                            :src="
                                'https://www.ridgidchina.net.cn/live/' +
                                feedbackImg
                            "
                            width="100%"
                        />
                    </div>
                    <div
                        class="submit"
                        :class="contactDetails !== '' ? 'active' : ''"
                        @click="userFeedback"
                    >
                        提交
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index';
import { Cookie } from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            isFeedback: false,
            userFeedbackList: [],
            contactDetails: '',
            feedbackText: '',
            feedbackImg: '',
            remnant: 500,
            requestType: 956,
            fileList: [],
            headers: {
                token: Cookie.get('token'),
            },
        };
    },
    components: { 'v-down': down },
    mounted() {
        this.getUserFeedbackList();
    },
    methods: {
        btnUploadFile(e) {
            var imgFile = e.target.files[0]; // 获取图片文件
            var formData = new FormData(); // 创建form对象
            formData.append('file', imgFile); // 通过append向form对象添加数据
            formData.append('other', 'other'); // 如果还需要传替他参数的话
            this.$axios('post', '/file/fileUpload', formData).then((res) => {
                if (res.code === 200) {
                    this.feedbackImg = res.data;
                }
            });
        },
        descInput() {
            var txtVal = this.contactDetails.length;
            this.remnant = 500 - txtVal;
        },
        gotofeedback() {
            this.isFeedback = true;
        },
        checkFeedback(num) {
            this.requestType = num;
        },
        // 获取我的反馈列表
        getUserFeedbackList() {
            this.$axios('post', '/user/getUserFeedbackList').then((res) => {
                if (res.code === 200) {
                    this.userFeedbackList = res.data;
                    this.isFeedback = false;
                }
            });
        },
        // 提交反馈
        userFeedback() {
            let param = {
                contactDetails: this.contactDetails,
                feedbackImg: this.feedbackImg,
                feedbackText: this.feedbackText,
                id: 0,
                requestType: this.requestType,
            };
            this.$axios('post', '/user/userFeedback', param).then((res) => {
                if (res.code === 200) {
                    this.$toast({
                        message: '提交成功！',
                    });
                    this.contactDetails = '';
                    this.feedbackText = '';
                    this.fileList = [];
                    this.getUserFeedbackList();
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
    top: 75px;
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
    background: linear-gradient(132deg, #ebcbab 0%, #dbb170 100%) !important;
    color: #fff;
    border: 1px solid #ebcbab !important;
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

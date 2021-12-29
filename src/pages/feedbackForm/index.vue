<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="feedback-form-box">
        <van-nav-bar
            title="我的反馈"
            left-arrow
            @click-left="$router.back()"
        ></van-nav-bar>
        <div class="feedback-form">
            <van-form @submit="onSubmit">
                <van-field
                    name="requestType"
                    label="反馈类型"
                    :rules="[{ required: true, message: '请选择反馈类型' }]"
                >
                    <template #input>
                        <van-radio-group
                            v-model="requestType"
                            direction="horizontal"
                        >
                            <van-radio name="956">建议</van-radio>
                            <van-radio name="957">错误</van-radio>
                            <van-radio name="958">其他</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-model="contactDetails"
                    name="contactDetails"
                    label="反馈内容"
                    type="textarea"
                    maxlength="300"
                    rows="5"
                    autosize
                    placeholder="请尽量详细描述你要反馈的问题，以便我们尽快为你解决"
                    :rules="[{ required: true, message: '请填写反馈的内容' }]"
                />
                <van-field name="feedbackImg" label="截图上传">
                    <template #input>
                        <van-uploader
                            :after-read="afterRead"
                            v-model="fileList"
                            multiple
                        />
                    </template>
                </van-field>
                <div class="sub-btn">
                    <van-button block type="primary" native-type="submit"
                        >提交</van-button
                    >
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feedbackForm',
    data() {
        return {
            requestType: '',
            contactDetails: '',
            feedbackImg: '',
            fileList: [],
        };
    },
    components: {},
    watch: {},
    mounted() {},
    methods: {
        onSubmit(values) {
            console.log('submit', values);
            let param = {
                contactDetails: this.contactDetails,
                feedbackImg: this.feedbackImg,
                id: 0,
                requestType: this.requestType,
            };
            this.$axios('post', '/user/userFeedback', param).then((res) => {
                if (res.code === 200) {
                    this.$toast({
                        message: '提交成功！',
                    });
                    this.$router.back();
                }
            });
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            let formData = new FormData();

            formData.append('file', file.file); // 通过append向form对象添加数据
            formData.append('other', 'other'); // 如果还需要传替他参数的话

            this.$axios('post', '/file/fileUpload', formData).then((res) => {
                if (res.code === 200) {
                    this.feedbackImg = res.data;
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
.feedback-form-box {
    width: 100%;
    .feedback-form {
        width: 100%;

        .sub-btn {
            width: 80%;
            margin: 50px auto 0;
        }
    }
}
</style>

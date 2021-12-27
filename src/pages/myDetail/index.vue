<template>
    <div class="my-detail-box">
        <van-nav-bar
            title="个人资料"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="saveInfo"
        />
        <div class="user-info">
            <div class="user-row">
                <div class="left">头像</div>
                <div class="right">
                    <div class="avatar-file">
                        <input
                            accept="image/*"
                            type="file"
                            @change="btnUploadFile"
                        />
                    </div>
                    <div class="avatar-img">
                        <img :src="infoData.avatarUrl" alt="" />
                    </div>

                    <img
                        src="../../assets/image/my/right-icon.png"
                        alt=""
                        class="right-icon"
                    />
                </div>
            </div>
            <div class="user-row">
                <div class="left">昵称</div>
                <div class="right">
                    <div class="user-name">
                        <input
                            type="text"
                            v-model="infoData.userName"
                            maxlength="20"
                        />
                    </div>
                    <img
                        src="../../assets/image/my/right-icon.png"
                        alt=""
                        class="right-icon"
                    />
                </div>
            </div>
            <div class="user-row" @click="showSexPicker">
                <div class="left">性别</div>
                <div class="right">
                    <div class="user-sex">
                        {{ sexVaule[infoData.sex] }}
                    </div>
                    <img
                        src="../../assets/image/my/right-icon.png"
                        alt=""
                        class="right-icon"
                    />
                </div>
            </div>
            <div class="user-row" @click="showBirthdayPicker">
                <div class="left">生日</div>
                <div class="right">
                    <div class="user-birthday">{{ infoData.birthday }}</div>
                    <img
                        src="../../assets/image/my/right-icon.png"
                        alt=""
                        class="right-icon"
                    />
                </div>
            </div>
        </div>
        <div class="sex-picker" v-if="showSex">
            <van-picker
                title="性别"
                show-toolbar
                :columns="columns"
                @confirm="onConfirmSex"
                @cancel="showSexPicker"
                :default-index="infoData.sex"
            />
        </div>
        <div class="birthday-picker" v-if="showBirthday">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="showBirthdayPicker"
                @confirm="onConfirmBirthday"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'index',
    data() {
        return {
            infoData: {},
            avatarUrl: '',
            columns: ['保密', '男', '女'],
            showSex: false,
            sexVaule: {
                0: '保密',
                1: '男',
                2: '女',
            },
            currentDate: new Date(),
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(),
            showBirthday: false,
        };
    },
    components: {},
    watch: {},
    mounted() {
        this.getInfo();
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        //修改我的资料
        saveInfo() {
            let param = {
                birthday: this.infoData.birthday,
                description: '',
                nickName: this.infoData.userName,
                sex: this.infoData.sex,
            };
            this.$axios('post', '/user/editUserInfo', param).then((res) => {
                if (res.code === 200) {
                    this.getInfo();
                    this.$toast({
                        message: '保存成功',
                    });
                    this.$router.back();
                }
            });
        },
        getInfo() {
            this.$axios('post', '/user/userInfo').then((res) => {
                if (res.code === 200) {
                    this.infoData = res.data;
                }
            });
        },
        // 上传图片
        btnUploadFile(e) {
            let imgFile = e.target.files[0]; // 获取图片文件
            let formData = new FormData(); // 创建form对象
            formData.append('file', imgFile); // 通过append向form对象添加数据
            formData.append('other', 'other'); // 如果还需要传替他参数的话
            this.$axios('post', '/file/fileUpload', formData).then((res) => {
                if (res.code === 200) {
                    this.avatarUrl = res.data;
                    let param = {
                        avatarUrl: res.data,
                    };
                    this.$axios('post', '/user/editUserAvatar', param).then(
                        (res) => {
                            if (res.code === 200) {
                                this.getInfo();
                            }
                        },
                    );
                }
            });
        },
        onConfirmSex(value, index) {
            this.infoData.sex = index;
            this.showSexPicker();
        },

        showSexPicker() {
            this.showSex = !this.showSex;
        },
        showBirthdayPicker() {
            this.showBirthday = !this.showBirthday;
        },
        onConfirmBirthday(value, index) {
            this.infoData.birthday = moment(value).format('YYYY-MM-DD');
            this.showBirthdayPicker();
        },
    },
};
</script>

<style scoped lang="scss">
.my-detail-box {
    ::v-deep .van-nav-bar__text {
        color: $primary-color;
    }
    ::v-deep .van-icon {
        color: #333;
    }
    .user-info {
        width: 100%;

        .user-row {
            width: 100%;
            padding: 14px;
            @include flexBetweenCenter();
            background: #fff;
            &:not(:last-child) {
                border-bottom: 1px solid #f1f1f1;
            }
            .left {
                font-size: 14px;
                color: #282828;
            }
            .right {
                @include flexCenter();
                position: relative;
                .avatar-file {
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    z-index: 9;
                    left: 0;
                    top: 0;
                    input {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        opacity: 0;
                    }
                }
                .avatar-img {
                    width: 50px;
                    height: 50px;
                    margin-right: 5px;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
                .user-name {
                    width: 150px;
                    height: 100%;
                    margin-right: 10px;

                    input {
                        width: 100%;
                        height: 100%;
                        text-align: right;
                        border: none;
                        outline: none;
                        color: #282828;
                        font-size: 14px;
                    }
                }
                .user-sex,
                .user-birthday {
                    margin-right: 10px;
                    color: #282828;
                    font-size: 14px;
                }
                .right-icon {
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
    .sex-picker,
    .birthday-picker {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 9;
    }
}
</style>

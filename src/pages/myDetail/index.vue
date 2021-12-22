<template>
    <div>
        <v-down></v-down>
        <div class="fx align-items justify-between mt-10 border-bottom top">
            <div @click="$utils.goBack">
                <img src="../../assets/image/back.png" width="20px" />
            </div>
            <div class="fs-18 fw-700">个人资料</div>
            <div class="sumbit" @click="updateUserInfo">保存</div>
        </div>
        <div class="file" v-if="avatarUrl === ''">
            <input accept="image/*" type="file" @change="btnUploadFile" />
        </div>
        <div class="fx justify-between align-items nav-info">
            <div class="fs-18">头像</div>
            <div class="fx align-items">
                <div v-if="avatarUrl === ''">
                    <img :src="infoData.avatarUrl" class="head-img" />
                </div>
                <div v-if="avatarUrl !== ''">
                    <img
                        :src="
                            'https://www.ridgidchina.net.cn/live/' + avatarUrl
                        "
                        class="head-img"
                    />
                </div>
                <div class="ml-10">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <div class="fx justify-between align-items nav-info">
            <div class="fs-18">昵称</div>
            <div class="fx align-items">
                <div>
                    <input
                        type="text"
                        v-model="infoData.userName"
                        class="userName-input"
                    />
                </div>
                <div class="ml-10">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <div class="fx justify-between align-items nav-info" @click="checkSex">
            <div class="fs-18">性别</div>
            <div class="fx align-items">
                <div>
                    <span v-if="infoData.sex === 0">保密</span>
                    <span v-if="infoData.sex === 1">男</span>
                    <span v-if="infoData.sex === 2">女</span>
                </div>
                <div class="ml-10">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <div class="fx justify-between align-items nav-info" @click="checkDate">
            <div class="fs-18">生日</div>
            <div class="fx align-items">
                <div>{{ infoData.birthday }}</div>
                <div class="ml-10">
                    <img src="../../assets/image/jiankuohao.png" width="10px" />
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%">
            <mt-picker
                class="picker-popup"
                :slots="slots"
                @change="onValuesChange"
            ></mt-picker>
        </mt-popup>
        <mt-datetime-picker
            v-model="pickerVisible"
            type="date"
            ref="picker"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm"
        >
        </mt-datetime-picker>
        <div class="bottom">
            <div class="login-out-btn" @click="loginOut">退出登录</div>
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index';
import Cookie from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            infoData: [],
            pickerVisible: '',
            popupVisible: false,
            avatarUrl: '',
            slots: [
                {
                    flex: 1,
                    values: ['保密', '男', '女'],
                    className: 'slot1',
                    textAlign: 'center',
                },
            ],
        };
    },
    components: { 'v-down': down },
    mounted() {
        this.getInfo();
    },
    methods: {
        onValuesChange(picker, values) {
            if (values[0] === '保密') {
                this.infoData.sex = 0;
            }
            if (values[0] === '男') {
                this.infoData.sex = 1;
            }
            if (values[0] === '女') {
                this.infoData.sex = 2;
            }
        },
        checkSex() {
            this.popupVisible = true;
        },
        checkDate() {
            this.$refs.picker.open();
        },
        handleConfirm(d) {
            var datetime =
                d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            this.infoData.birthday = datetime;
            console.log(datetime);
        },
        // 上传图片
        btnUploadFile(e) {
            var imgFile = e.target.files[0]; // 获取图片文件
            var formData = new FormData(); // 创建form对象
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
        getInfo() {
            this.$axios('post', '/user/userInfo').then((res) => {
                if (res.code === 200) {
                    this.infoData = res.data;
                }
            });
        },
        // 修改我的资料
        updateUserInfo() {
            let param = {
                birthday: this.infoData.birthday,
                description: '',
                nickName: this.infoData.userName,
                sex: this.infoData.sex,
            };
            this.$axios('post', '/user/editUserInfo', param).then((res) => {
                if (res.code === 200) {
                    this.getInfo();
                    this.$router.push({ name: 'my' });
                }
            });
        },
        loginOut() {
            this.$axios('post', '/user/loginOut').then((res) => {
                if (res.code === 200) {
                }
            });
            Cookie.remove('token');
            this.$router.push({ name: 'home' });
        },
    },
};
</script>

<style scoped>
.top {
    padding-right: 10px;
    padding-left: 10px;
    box-sizing: border-box;
}
.head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.nav-info {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}
.border-bottom {
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
}
.bottom {
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    padding: 15px;
}
.login-out-btn {
    width: 100%;
    line-height: 50px;
    background: red;
    color: white;
    text-align: center;
    border-radius: 50px;
}
.file input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 80px;
    border: 1px solid red;
}
.userName-input {
    line-height: 30px;
    width: 100%;
    text-align: right;
}
.picker-popup {
    width: 100%;
}
.sumbit {
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
}
</style>

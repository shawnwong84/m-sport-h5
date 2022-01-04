<template>
    <div style="overflow: hidden">
        <!--    <div style="background: rgba(0,0,0,.8);">-->
        <!--      <v-down></v-down>-->
        <!--    </div>-->
        <div class="room-box">
            <div
                style="position: absolute; top: 15px; width: 100%"
                v-if="isDanmu"
                @click="openjindu"
            >
                <div class="bullet-wrap">
                    <div
                        class="bullet-item bullet-animation"
                        :class="{ on: index % 2 == 0, off: index % 2 != 0 }"
                        v-for="(item, index) in chatContent"
                        :key="index"
                        v-if="item.askContent !== '进入直播间'"
                    >
                        {{ item.askContent }}
                    </div>
                </div>
            </div>
            <div
                v-if="roomInfoList.roomStatus === 1"
                @click="goBack()"
                class="roomName-box"
            >
                <div class="fx">
                    <div style="margin-right: 8px; z-index: 99">
                        <img src="../../assets/image/back2.png" width="20px" />
                    </div>
                    <!--          <div class="text-overflow">{{roomInfoList.roomName}}</div>-->
                </div>
            </div>
            <div
                class="video-footer"
                v-if="roomInfoList.roomStatus === 1"
                :class="showDanmu ? 'show' : 'hide'"
            >
                <div
                    class="fx align-items justify-between"
                    style="height: 40px; margin-left: 15px; margin-right: 15px"
                >
                    <div class="c-f">
                        <img
                            src="../../assets/image/fire.png"
                            width="9px"
                            class="mr-2"
                        />&nbsp;{{ roomInfoList.hotNum }}
                    </div>
                    <div class="fx align-items justify-center">
                        <div>
                            <img
                                src="../../assets/image/danmu-open.png"
                                class="mr-18"
                                v-if="isDanmu"
                                @click="closeDanmu"
                            />
                            <img
                                src="../../assets/image/danmu-close.png"
                                class="mr-18"
                                v-else
                                @click="closeDanmu"
                            />
                        </div>
                        <div>
                            <img
                                src="../../assets/image/Play.png"
                                class="mr-18"
                                v-if="isPlay"
                                @click="play"
                            />
                            <img
                                src="../../assets/image/Pause.png"
                                class="mr-18"
                                v-else
                                @click="pause"
                            />
                        </div>
                        <div>
                            <img
                                src="../../assets/image/Expand.png"
                                @click="fullscreen()"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!--      <div id="id_test_video" style="width:100%; height:auto;" @click="openjindu"></div>-->
            <div class="prism-player" id="player-con" @click="openjindu"></div>
            <div class="no-live" v-if="roomInfoList.roomStatus === 0">
                <div>
                    <div class="ta-c">
                        <img
                            src="../../assets/image/noLive.png"
                            width="150px"
                        />
                    </div>
                    <div class="fs-16 mt-15 ta-c">主播正在赶来的路上......</div>
                </div>
            </div>
            <div class="fx justify-between room-nav">
                <div
                    @click="checkTab(1)"
                    class="ml-20 liveRoom-wrapper"
                    :class="num === 1 ? 'active' : ''"
                >
                    聊天
                </div>
                <div
                    @click="checkTab(2)"
                    class="liveRoom-wrapper"
                    :class="num === 2 ? 'active' : ''"
                >
                    主播
                </div>
                <div
                    @click="checkTab(3)"
                    class="liveRoom-wrapper"
                    :class="num === 3 ? 'active' : ''"
                >
                    排行榜
                </div>
                <div
                    @click="checkTab(4)"
                    class="liveRoom-wrapper"
                    :class="num === 4 ? 'active' : ''"
                >
                    红榜
                </div>
                <div
                    v-if="!roomInfoList.follow"
                    class="liveRoom-wrapper"
                    :class="!roomInfoList.follow ? 'subscribe' : ''"
                    @click="userFollowAnchor"
                    style="width: 70px"
                >
                    <div>
                        <div>
                            <img src="../../assets/image/subscribe.png" />
                            <span class="fw-700">关注</span>
                        </div>
                        <div class="fs-12">{{ roomInfoList.hotNum }}</div>
                    </div>
                </div>
                <div
                    v-if="roomInfoList.follow"
                    :class="roomInfoList.follow ? 'gary' : ''"
                    class="liveRoom-wrapper"
                    @click="userUnFollowAnchor"
                    style="width: 70px"
                >
                    <div>
                        <div>
                            <img src="../../assets/image/subscribe.png" />
                            <span class="fw-700">已关注</span>
                        </div>
                        <div class="fs-12">{{ roomInfoList.hotNum }}</div>
                    </div>
                </div>
            </div>
            <div class="notice">
                <img src="../../assets/image/notice-icon.png" class="mr-5" />{{
                    notice
                }}
            </div>
            <div class="copy-div">
                <div
                    v-if="roomInfoList.qqNum && roomInfoList.qqNum.trim()"
                    @click="openQQ(roomInfoList.qqNum)"
                >
                    <img src="../../assets/image/qq-num.png" width="50px" />
                </div>
                <div
                    v-if="roomInfoList.wxNum && roomInfoList.wxNum.trim()"
                    class="mt-10"
                    @click="openWx(roomInfoList.wxNum)"
                >
                    <img src="../../assets/image/wx-num.png" width="50px" />
                </div>
                <div
                    v-if="roomInfoList.qqGroupNum && roomInfoList.qqGroupNum.trim()"
                    class="mt-10"
                    @click="openqqGroup(roomInfoList.qqGroupNum)"
                >
                    <img src="../../assets/image/qq2-num.png" width="50px" />
                </div>
            </div>
            <div v-if="num === 1">
                <div class="fx justify-between tabcontent" v-if="isShowGif">
                    <div>
                        <div class="fs-12 c-f8">
                            {{ roomInfoList.userName }}
                        </div>
                        <div class="fs-12">送出了</div>
                    </div>
                    <div>
                        <img :src="gifUrl" width="30px" />
                        <!--              <img src="https://1-1305184012.cos.ap-nanjing.myqcloud.com/live/44613687503949.jpg" width="30px"/>-->
                    </div>
                </div>
                <div class="tab-content" ref="main">
                    <div class="c-7">
                        <img
                            src="../../assets/image/system_message.png"
                            width="15px"
                            style="vertical-align: center"
                        />
                        <span class="fw-700 c-0">系统消息：</span
                        >欢迎进入本直播间，请友善发言。本平台明确禁止讨论任何违法、违规、低俗、涉赌内容，一经发现作封禁帐号和直播间处理。防丢失请下载M直播app。
                    </div>
                    <div ref="content">
                        <div v-for="(item, index) in chatContent">
                            <!--                <span class="leave">LV{{item.askLevel}}</span>-->
                            <span class="c-3B">{{ item.askName }}：</span>
                            <span
                                class="c-28"
                                v-html="renderTxt(item.askContent)"
                            ></span>
                        </div>
                    </div>
                </div>
                <div class="chat-emoji">
                    <chat-emoji
                        :showModal="showModal"
                        v-on:selectEmoji="showChatEmoji"
                    ></chat-emoji>
                </div>
                <div
                    class="fx align-items justify-between pt-10 gif-box"
                    v-if="isShowGifBox"
                >
                    <div
                        v-for="(item, index) in giftList"
                        class="ta-c ml-20"
                        @click="sendGift(item)"
                    >
                        <div><img :src="item.giftImg" width="30px" /></div>
                        <div class="fs-12 c-9D">{{ item.giftName }}</div>
                        <div class="fs-12 c-f8">{{ item.gold }}金币</div>
                    </div>
                </div>
                <div class="tab-foot">
                    <div class="fx align-items justify-between">
                        <div style="padding-top: 10px">
                            <img
                                src="../../assets/image/Happy.png"
                                class="cursor"
                                @click="checkEmoji"
                            />
                        </div>
                        <div @click="openCity" style="padding-top: 14px">
                            <img
                                src="../../assets/image/gifi.png"
                                width="25px"
                            />
                        </div>
                        <div style="width: 70%">
                            <input type="text" v-model="contentTxt" />
                        </div>
                        <div class="send" @click="sendRoomTextBtn">发送</div>
                    </div>
                </div>
            </div>
            <div class="live-room-div" v-if="num === 2">
                <div class="room-info">
                    <div class="fs-20 fw-700 mt-10">
                        {{ roomInfoList.roomName }}
                    </div>
                    <div class="mt-5 c-9D">
                        房间号<span class="ml-5">{{
                            roomInfoList.roomId
                        }}</span>
                    </div>
                    <div class="fx align-items justify-between mt-30">
                        <div class="fx align-items">
                            <div>
                                <img
                                    :src="roomInfoList.anchorAvatar"
                                    class="head-img"
                                />
                            </div>
                            <div class="ml-10">
                                <div class="fs-16">
                                    {{ roomInfoList.anchorName }}
                                </div>
                                <div class="c-9D fs-12 mt-5">
                                    {{ roomInfoList.anchorDesc }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-gray"></div>
                <div class="room-info">
                    <div class="fs-20 fw-700 mt-10">主播公告</div>
                    <div class="mt-10 c-9D">
                        {{ roomInfoList.roomAnnouncement }}
                    </div>
                </div>
            </div>
            <div
                class="live-room-div"
                v-if="
                    num === 3 && leaderboardList && leaderboardList.length !== 0
                "
            >
                <div
                    class="rank-content"
                    v-for="(item, index) in leaderboardList"
                    :key="index"
                >
                    <div class="fx align-items">
                        <div>
                            <img :src="item.userAvatar" class="head-img" />
                        </div>
                        <div class="ml-10">
                            {{ item.userName
                            }}<span class="leave">LV{{ item.userLevel }}</span>
                        </div>
                    </div>
                    <div class="fs-12 c-9D">贡献度 {{ item.goldNum }}</div>
                </div>
            </div>
            <div
                class="live-room-div"
                v-if="num === 4 && hotRankList && hotRankList.length !== 0"
            >
                <div
                    v-for="(item, index) in hotRankList"
                    :key="index"
                    class="pl-10 hotRankList"
                    @click="toPage('hotBank', item.id)"
                >
                    <div class="fx align-items justify-between">
                        <div class="fx align-items">
                            <div>
                                <img
                                    :src="item.anchorIcon"
                                    style="
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                    "
                                />
                            </div>
                            <div class="ml-10 fs-16 fw-700">
                                {{ item.anchorName }}
                            </div>
                            <div class="fx ml-10">
                                <div class="jx">
                                    <div class="jx2">
                                        <div class="content1">
                                            {{ item.continuousWin }}
                                        </div>
                                    </div>
                                    <div
                                        class="content1"
                                        style="margin-left: 2px"
                                    >
                                        选红
                                    </div>
                                </div>
                                <div class="jx ml-10">
                                    <div class="content1">
                                        近{{ item.sum }}中{{ item.wins }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="red-box">红</div>
                    </div>
                    <div
                        class="fs-16 text-overflow pr-10"
                        v-if="
                            item.anchorDesc !== null || item.anchorDesc !== ''
                        "
                    >
                        {{ item.anchorDesc }}
                    </div>
                    <div
                        class="fs-16 text-overflow pr-10"
                        v-if="
                            item.anchorDesc === null || item.anchorDesc === ''
                        "
                    >
                        {{ item.title }}
                    </div>
                    <div class="fs-12 mt-10 fx justify-between pr-10">
                        <div class="c-9D">{{ item.releaseTime }}</div>
                        <div style="color: red">竞足｜查看</div>
                    </div>
                </div>
            </div>
            <div
                class="ta-c no-data"
                v-if="
                    (num === 3 &&
                        (leaderboardList === undefined ||
                            leaderboardList.length <= 0)) ||
                    (num === 4 &&
                        (hotRankList === undefined || hotRankList.length <= 0))
                "
            >
                <div>
                    <img src="../../assets/image/no-data.png" width="100px" />
                </div>
                <div class="c-9D ta-c">暂无数据</div>
            </div>
            <input id="copy" type="text" value="" style="opacity: 0" />
        </div>
    </div>
</template>

<script>
import down from '../../components/down/index.vue';
import chatEmoji from '../../components/chatEmoji/index.vue';
import emoji from '../../config/emoji.js';
import Cookie from '../../api/cookie.js';
export default {
    name: 'index',
    data() {
        return {
            num: 1,
            rangeValue: 10,
            recommendList: [],
            leaderboardList: [],
            roomInfoList: [],
            giftList: [],
            isDanmu: true,
            token: '',
            isShowGif: false,
            isShowGifBox: false,
            contentTxt: '',
            gifUrl: '',
            chatContent: [],
            hotRankList: [],
            isFrist: 1,
            showModal: false,
            pageNo: 1,
            volume: 30,
            isMute: true,
            showDanmu: false,
            timerToken: null,
            isPlay: false,

            player: null,
            notice: '',
            timerNotice: null,
        };
    },
    components: { chatEmoji, 'v-down': down },
    created() {
        window.addEventListener('beforeunload', (e) =>
            this.beforeunloadHandler(e),
        );
    },
    destroyed() {
        window.removeEventListener('beforeunload', (e) =>
            this.beforeunloadHandler(e),
        );
        clearInterval(this.timerToken);
    },
    mounted() {
        this.token = Cookie.get('token');
        this.getList();
        this.getRecommend();
        this.leaderboard();
        this.getGiftList();
        this.getRoomInfo(1);
        if (!this.token) {
            this.timerToken = setInterval(this.get, 60000);
        }
    },
    methods: {
        show() {
            if (this.timerNotice != null) return;
            this.timerNotice = setInterval(() => {
                // 获取到头的第一个字符
                let start = this.notice.substring(0, 1);
                // 获取到后面的所有字符
                let end = this.notice.substring(1);
                // 重新拼接得到新的字符串，并赋值给this.message
                this.notice = end + start;
            }, 300);
        },
        // stop () {
        //   // 清除定时器
        //   clearInterval(this.timerNotice)
        //   // 清除定时器之后，需要重新将定时器置为null
        //   this.timerNotice = null
        // },
        toRegister() {
            this.$router.push({ name: 'register' });
        },
        goBack() {
            this.$router.push({
                name: 'home',
                query: { token: this.$route.query.token },
            });
        },
        // 暂停
        pause() {
            this.isPlay = true;
            this.player.pause();
        },
        // 播放
        play() {
            this.isPlay = false;
            this.player.play();
        },
        // 音量
        getVolume() {
            this.player.volume(this.volume / 100);
        },
        getMute(data) {
            if (data === false) {
                this.isMute = true;
            } else {
                this.isMute = false;
            }
            this.player.mute(data);
        },
        toPage1(name) {
            this.$router.push({ name: name });
        },
        toPage(name, id) {
            // let routeData = this.$router.resolve({
            //   name: name,
            //   query: {id: id}
            // })
            // window.open(routeData.href, '_blank')
            this.$router.push({ name: name, query: { id: id } });
            // location.reload()
        },
        // 全屏
        fullscreen() {
            this.player.fullscreenService.requestFullScreen();
        },
        formatTooltip(val) {
            return val / 100;
        },
        // 显示进度条
        openjindu() {
            console.log(this.showDanmu);
            if (this.showDanmu) {
                this.showDanmu = false;
            } else {
                this.showDanmu = true;
            }
        },
        // 打开-关闭弹幕
        closeDanmu() {
            if (this.isDanmu) {
                this.isDanmu = false;
            } else {
                this.isDanmu = true;
            }
        },
        danmu(value) {
            this.list = value;
            setInterval(() => {
                var item = null;
                if (this.idx === 3) {
                    // c 位
                    item = this.clist.shift();
                }
                if (!item) {
                    item = this.list.shift();
                }
                if (item) {
                    item.line = this.idx;
                    this.idx = (this.idx % 5) + 1;
                    this.bulletlist.push(item);
                } else {
                    if (this.clist.length) {
                        item = this.clist.shift();
                        item.line = 3;
                        this.idx = 3;
                        this.bulletlist.push(item);
                    }
                }
            }, 1000);
        },
        showChatEmoji(data) {
            this.contentTxt = this.contentTxt + data;
        },
        checkEmoji() {
            console.log(this.showModal);
            if (this.token) {
                if (this.showModal) {
                    this.showModal = false;
                } else {
                    this.showModal = true;
                }
            } else {
                this.$router.push({ name: 'login' });
            }
        },
        checkTab(num) {
            this.num = num;
        },
        // [beforeunloadHandler 浏览器关闭时进行用户提示]
        beforeunloadHandler() {
            let options = {
                roomId: this.roomInfoList.roomId, // 聊天室id
            };
            this.$imconn.quitChatRoom(options).then((res) => {
                console.log(res);
            });
        },
        // 红榜
        getHotRankList(matchId) {
            let param = {
                matchId: matchId,
                pageNum: 1,
                pageSize: 15,
            };
            this.$axios('post', '/match/getHotRankList', param).then((res) => {
                if (res.code === 200) {
                    this.hotRankList = res.data.dataList;
                }
            });
        },
        // 获取礼物列表
        getGiftList() {
            this.$axios('post', '/room/getGiftList').then((res) => {
                if (res.code === 200) {
                    this.giftList = res.data;
                }
            });
        },
        // 赠送礼物
        sendGift(item) {
            if (this.token) {
                let param = {
                    giftId: item.id,
                    roomId: this.$route.query.id,
                };
                this.$axios('post', '/room/sendGift', param).then((res) => {
                    if (res.code === 200) {
                        this.gifUrl = item.giftImg;
                        this.roomInfoList.userGold =
                            this.roomInfoList.userGold - item.gold;
                        this.isShowGif = true;
                        const TIME_COUNT = 2;
                        var timer = null;
                        let count = 0;
                        if (!timer) {
                            count = TIME_COUNT;
                            timer = setInterval(() => {
                                if (count > 0 && count <= TIME_COUNT) {
                                    count--;
                                } else {
                                    this.isShowGif = false;
                                    clearInterval(timer);
                                    timer = null;
                                }
                            }, 1000);
                        }
                        this.isShowGifBox = false;
                        this.leaderboard();
                    }
                });
            } else {
                this.$toast({
                    message: '请先登录！',
                });
            }
        },
        // 加入聊天室
        getJoinChatRoom() {
            let options = {
                roomId: this.roomInfoList.roomId, // 聊天室id
                message: 'reason', // 原因（可选参数）
            };
            this.$imconn.joinChatRoom(options).then((res) => {
                this.sendRoomText('进入直播间');
                this.getChatHistoryMessage();
                this.getChat();
                this.getChatMessage();
            });
        },
        // 获取聊天室详情
        getChat() {
            // let options = {
            //   chatRoomId: this.roomInfoList.roomId   // 聊天室id
            // }
            // this.$imconn.getChatRoomDetails(options).then((res) => {
            //   console.log(res)
            // })
            let options = {
                pageNum: 1,
                pageSize: 10,
                chatRoomId: this.roomInfoList.roomId,
            };
            this.$imconn.listChatRoomMember(options).then((res) => {
                console.log(res);
            });
        },
        // 登录账号
        loginWebIM(id) {
            // 这儿是测试用的账号和密码
            this.$imoption.user = id;

            this.$imconn.open(this.$imoption);
            let _this = this;
            // 监听回调
            this.$imconn.listen({
                onOpened: function (message) {
                    console.log('用户已上线', message);
                    _this.getJoinChatRoom();
                },
                onClosed: function (message) {
                    console.log('用户下线');
                    _this.$emit('isclose', true);
                },
                // 收到文本消息
                onTextMessage: function (message) {
                    console.log(message);
                    _this.chatContent.push({
                        // 把发送者的头像和文本数据push到数组中在页面上展示
                        askName: message.ext.user_nick,
                        askLevel: message.ext.user_level,
                        askContent: message.data,
                    });
                    _this.$nextTick(() => {
                        _this.$refs.main.scrollTop =
                            _this.$refs.content.scrollHeight;
                    });
                    if (message.data === '进入直播间') {
                        this.getChatMessage();
                    }
                },
                onEmojiMessage: function (message) {
                    console.log('onEmojiMessage', message);
                    // const { type } = message;
                    // type === 'chat' && ack(message);
                },
            });
        },
        getChatMessage() {
            let param = {
                sportsType: this.roomInfoList.matchInfo.sportsType,
            };
            this.$axios('post', '/V1/room/getChatMessageBySports', param).then(
                (res) => {
                    if (res.code === 200) {
                        // this.chatMessageData = res.data
                        for (let i = 0; i < res.data.length; i++) {
                            this.sendRoomText2(
                                res.data[i].nickName,
                                res.data[i].msg,
                            );
                        }
                        // this.sendRoomText2(res.data.sendUser, res.data.msgContent)
                    }
                },
            );
        },
        getChatHistoryMessage() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/room/getChatHistoryMessage', param).then(
                (res) => {
                    if (res.code === 200) {
                        // this.chatMessageData = res.data
                        for (let i = 0; i < res.data.length; i++) {
                            this.sendRoomText2(
                                res.data[i].sendUser,
                                res.data[i].msgContent,
                            );
                        }
                    }
                },
            );
        },
        sendRoomTextBtn(msgTxt) {
            if (!this.token) {
                this.$router.push({ name: 'login' });
            } else {
                this.sendRoomText(msgTxt);
            }
        },
        // 发送文本消息
        sendRoomText(msgTxt) {
            let _this = this;
            let id = this.$imconn.getUniqueId(); // 生成本地消息id
            // eslint-disable-next-line no-undef,new-cap
            let msg = new WebIM.message('txt', id); // 创建文本消息
            let option = {
                msg: this.contentTxt || msgTxt, // 消息内容
                to: this.roomInfoList.roomId, // 接收消息对象(聊天室id)
                chatType: 'chatRoom', // 群聊类型设置为聊天室
                ext: {
                    user_nick: _this.roomInfoList.userName,
                    user_level: _this.roomInfoList.userLevel,
                }, // 扩展消息
                success: function () {
                    console.log(msg);
                    _this.chatContent.push({
                        // 把发送者的头像和文本数据push到数组中在页面上展示
                        askName: _this.roomInfoList.userName,
                        askLevel: _this.roomInfoList.userLevel,
                        askContent: msg.value,
                    });
                    _this.contentTxt = '';
                    _this.showModal = false;
                    _this.$nextTick(() => {
                        _this.$refs.main.scrollTop =
                            _this.$refs.content.scrollHeight;
                    });
                }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
                fail: function () {
                    console.log('failed');
                }, // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
            };
            msg.set(option);
            this.$imconn.send(msg.body);
        },
        sendRoomText2(msgUser, msgTxt) {
            let _this = this;
            let id = this.$imconn.getUniqueId(); // 生成本地消息id
            // eslint-disable-next-line no-undef,new-cap
            let msg = new WebIM.message('txt', id); // 创建文本消息
            let option = {
                msg: msgTxt, // 消息内容
                to: this.roomInfoList.roomId, // 接收消息对象(聊天室id)
                chatType: 'chatRoom', // 群聊类型设置为聊天室
                ext: {
                    user_nick: msgUser,
                    user_level: 1,
                }, // 扩展消息
                success: function () {
                    _this.chatContent.push({
                        // 把发送者的头像和文本数据push到数组中在页面上展示
                        askName: msgUser,
                        askLevel: 1,
                        askContent: msgTxt,
                    });
                    _this.contentTxt = '';
                    _this.showModal = false;
                    _this.$nextTick(() => {
                        _this.$refs.main.scrollTop =
                            _this.$refs.content.scrollHeight;
                    });
                }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
                fail: function () {
                    console.log('failed');
                }, // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
            };
            msg.set(option);
            this.$imconn.send(msg.body);
        },
        // 根据房间id获取主播赛程
        getList() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/room/getAnchorMatch', param).then((res) => {
                if (res.code === 200) {
                    this.matchList = res.data.matchLists;
                }
            });
        },
        // 播放器
        playerVideo(img, url) {
           
            this.player = new Aliplayer(
                {
                    id: 'player-con',
                    source: url,
                    width: '100%',
                    height: '230px',
                    autoplay: true,
                    isLive: true,
                    rePlay: false,
                    cover: img,
                    playsinline: true,
                    preload: true,
                    controlBarVisibility: 'click',
                    useH5Prism: true,
                },
                function (player) {
                    console.log('The player is created');
                },
            );
      
        },
        // 精彩推荐
        getRecommend() {
            let param = {
                pageNum: this.pageNo,
                pageSize: 30,
                roomId: this.$route.query.id,
            };
            this.$axios('post', '/live/getVideoRecommendList', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.recommendList = res.data.dataList;
                    }
                },
            );
        },
        // 获取送礼排行版
        leaderboard() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/room/leaderboard', param).then((res) => {
                if (res.code === 200) {
                    this.leaderboardList = res.data;
                }
            });
        },
        // 获取房间信息
        getRoomInfo(num) {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/room/getRoomInfo', param).then((res) => {
                if (res.code === 200) {
                    this.roomInfoList = res.data;
                    // '0e1ab4b9e8214ee09b05c1a9e07a41f2'
                    this.getHotRankList(this.roomInfoList.matchId);
                    this.notice = this.roomInfoList.roomAnnouncement;
                    this.show();
                    this.loginWebIM(res.data.huanXinUserId);
                    if (num === 1) {
                        if (this.roomInfoList.roomStatus === 1) {
                            this.playerVideo(
                                this.roomInfoList.matchCutImg,
                                this.roomInfoList.liveUrl,
                            );
                        }
                    }
                }
            });
        },
        // 关注
        userFollowAnchor() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/match/userFollowAnchor', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.getRoomInfo(2);
                    }
                },
            );
        },
        // 取消关注
        userUnFollowAnchor() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/match/userUnFollowAnchor', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.getRoomInfo(2);
                    }
                },
            );
        },
        // 转换成表情图片
        customEmoji(value) {
            return `<img src="../../../static/faces/${value}" style="width:20px"/>`;
        },
        renderTxt(txt = '') {
            let rnTxt = [];
            let match = null;
            const regex = /(\[.*?\])/g;
            let start = 0;
            let index = 0;
            while ((match = regex.exec(txt))) {
                index = match.index;
                if (index > start) {
                    rnTxt.push(txt.substring(start, index));
                }
                if (match[1] in emoji.obj) {
                    const v = emoji.obj[match[1]];
                    rnTxt.push(this.customEmoji(v));
                } else {
                    rnTxt.push(match[1]);
                }
                start = index + match[1].length;
            }
            rnTxt.push(txt.substring(start, txt.length));
            return rnTxt.toString().replace(/,/g, '');
        },
        openCity() {
            if (this.token) {
                if (this.isShowGifBox) {
                    this.isShowGifBox = false;
                } else {
                    this.isShowGifBox = true;
                }
            } else {
                this.$router.push({ name: 'login' });
            }
        },
        cotyTxt(text) {
            // 获取隐藏的input，并写入text内容，在进行复制
            var input = document.getElementById('copy');
            input.value = text;
            input.select();
            input.setSelectionRange(0, input.value.length); // 兼容ios
            document.execCommand('Copy');
            input.blur();
        },
        openQQ(text) {
            this.cotyTxt(text);
            this.$toast({
                message: 'QQ号：' + text + '，已复制成功',
            });
            // window.open(
            //     'tencent://message/?Menu=yes&uin=' +
            //         text +
            //         '&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45',
            //     '_blank',
            // );
        },
        openWx(text) {
            this.cotyTxt(text);
            this.$toast({
                message: '微信号：' + text + '，已复制成功',
            });
            // window.open('weixin://');
        },
        openqqGroup(text) {
            this.cotyTxt(text);
            this.$toast({
                message: 'QQ群号：' + text + '，已复制成功',
            });
            // window.open(
            //     'tencent://message/?Menu=yes&uin=' +
            //         text +
            //         '&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45',
            //     '_blank',
            // );
        },
    },
};
</script>

<style scoped lang="scss">
.mr-18 {
    margin-right: 19px;
}
.padding-15 {
    padding: 15px;
}
.room-box {
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    /*overflow-y: scroll;*/
}
.down-wrap {
    background: rgba(0, 0, 0, 0.8);
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    /*padding: 10px 20px;*/
}
.video {
    width: 100%;
}
.c-3B {
    color: #3b6de2;
}
.c-28 {
    color: #282828;
}
.room-nav {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border-top: 1px solid #f1f1f1;
}
.liveRoom-wrapper {
    color: #8f8f8f;
    height: 100%;
    text-align: center;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.live-room-div {
    width: 100%;
    /*height: 100%;*/
    position: absolute;
    top: 366px;
    left: 0px;
    bottom: 0;
    overflow-y: scroll;
}
.btn-add-screen {
    color: #fff;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
    line-height: 30px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 6px;
    padding: 0px 8px;
}
.subscribe {
    color: white !important;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
}
.c-f8 {
    color: #f8413d;
}
.gary {
    color: white !important;
    background: #ececec;
}
.no-data {
    height: 100vh;
    padding-top: 30%;
    background: #f7f7f7;
}
.tab-content {
    width: 100%;
    background: #f4f4f4;
    position: absolute;
    top: 366px;
    left: 0px;
    bottom: 60px;
    /*height: 45vh;*/
    overflow-y: scroll;
    padding: 10px;
}
.copy-div {
    position: fixed;
    right: 10px;
    top: 420px;
    z-index: 9;
}
.tab-foot {
    width: 100%;
    background: white;
    line-height: 50px;
    padding: 0px 10px;
    position: absolute;
    bottom: 0;
}
.tab-foot input {
    border-radius: 44px;
    width: 100%;
    border: 1px solid #ececec;
    line-height: 40px;
    padding-right: 10px;
    padding-left: 10px;
    box-sizing: border-box;
}
.chat-emoji {
    position: absolute;
    bottom: 71px;
    background: white;
}
.gif-box {
    width: 100%;
    position: absolute;
    bottom: 65px;
    background: white;
    padding-left: 10%;
    padding-right: 10%;
}
.send {
    width: 50px;
    line-height: 30px;
    text-align: center;
    border-radius: 50px;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
    color: white;
}
.new-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    word-break: break-all; /* 内容自动换行 */
    margin-top: 5px;
    font-size: 13px;
}
.active {
    color: #f8413d !important;
    @include flexColumnCenter();
    &::after {
        display: block;
        content: '';
        width: 20px;
        height: 2px;
        background: linear-gradient(180deg, #ff8d86 0%, #f8413d 100%);
        border-radius: 1px;
        transform: translateY(10px);
    }
}
.ml-40 {
    margin-left: 40px;
}
.match-header-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    margin-top: 10px;
    padding: 13px 0px;
    border-bottom: 1px solid #ececec;
}
.new-box {
    width: 49%;
    margin-top: -8px;
}
.roomName-box {
    color: white;
    width: 100%;
    /*border: 1px solid red;*/
    position: absolute;
    top: 0;
    padding: 10px;
    font-size: 16px;
    z-index: 14;
    overflow: hidden;
    text-overflow: ellipsis;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0) 0, #000 100%);
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    word-break: break-all; /* 内容自动换行 */
}
.new-box-img {
    width: 100%;
    height: 110px;
    border-radius: 6px;
}
.living {
    width: 40px;
    background: #fa3434;
    border-radius: 2px;
    vertical-align: middle;
    color: white;
    display: flex;
    font-size: 12px;
}
.jian {
    position: relative;
    top: 24px;
    left: 6px;
    height: 18px;
}
.hit-bottom {
    width: 100%;
    padding: 5px 10px;
    margin-top: -30px;
    color: white;
    font-weight: 700;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.8) 100%
    );
    position: relative;
}
.content {
    /*position: absolute;*/
    /*top: 350px;*/
    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*overflow: hidden;*/
    /*overflow-y: scroll;*/
}
.rank-content {
    border-bottom: 1px solid #ececec;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
}
.leave {
    background: rgb(0, 142, 168);
    font-size: 12px;
    color: white;
    margin-left: 5px;
    padding: 1px 2px;
}
.head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.room-info {
    padding: 15px;
}
.anchor-subscribe {
    color: #fff;
    background: linear-gradient(132deg, #ff8d86 0%, #f8413d 100%);
    border-radius: 8px;
    padding: 8px 20px;
    font-weight: 700;
}
.border-gray {
    height: 10px;
    background: rgb(244, 244, 244);
}
.tabcontent {
    width: 200px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 5px 20px 5px 15px;
    position: absolute;
    bottom: 30%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    -webkit-animation: fadeEffect 1s;
    animation: fadeEffect 1s;
    z-index: 9;
}

/* Fade in tabs */
@-webkit-keyframes fadeEffect {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeEffect {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.danmu {
    position: absolute;
    top: 34%;
    right: 25%;
    z-index: 12;
}
.notice {
    width: 100%;
    height: 26px;
    background: #ffeddc;
    color: #fe9102;
    padding-left: 10px;
    overflow: hidden;
    font-size: 12px;
    font-weight: 700;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 5px;
}
.hide {
    /*animation: fadeOut ease .8s;*/
    /*animation-fill-mode: forwards;*/
    /*-webkit-animation-fill-mode: forwards;*/
    display: none;
}
.show {
    /*animation: fadeIn ease .8s;*/
    /*animation-fill-mode: forwards;*/
    /*-webkit-animation-fill-mode: forwards;*/
}
.video-footer {
    width: 100%;
    height: 40px;
    position: absolute;
    /*border: 1px solid red;*/
    top: 250px;
    left: 0;
    z-index: 12;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0,
        #000 100%
    ) !important;
}

.no-live {
    width: 100%;
    height: 230px;
    background: #797979;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
}
.mr-20 {
    margin-right: 30px;
}
/*灰色遮罩层*/
.fade {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
}
/*弹出层*/
.succ-pop {
    width: 70%;
    height: 300px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
    border-radius: 5px;
    text-align: center;
}
.pop-txt {
    font-size: 12px;
    margin: 20px;
    color: #707070;
}
.c-ffa {
    color: #f8413d;
}
.hotRankList {
    border-bottom: 1px solid #f3f3f3;
    padding-top: 10px;
    padding-bottom: 10px;
}
.jx {
    transform: skew(-10deg);
    width: 41px;
    height: 21px;
    color: red;
    border: 1px solid red;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
    cursor: pointer;
    margin-left: 10px;
}
.jx2 {
    background: red;
    color: white;
    margin-left: -10px;
    width: 15px;
    height: 21px;
    transform: skew(-6deg);
    font-size: 12px;
    text-align: center;
}
.content1 {
    transform: skew(10deg);
}
.red-box {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    width: 30px;
    color: white;
    background: red;
    text-align: center;
    font-size: 13px;
}
</style>
<style>
.prism-player {
    /*margin-top: -100px!important;*/
    z-index: 2;
    background-image: url('../../assets/image/noImg.png');
    background-size: cover;
    /*background-size: 100% auto;*/
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    height: 290px !important;
}
.prism-controlbar {
    display: none !important;
}
.vcp-timelabel {
    display: none !important;
}
.vcp-slider {
    display: none !important;
}
.vcp-panel-bg {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0,
        #000 100%
    ) !important;
}
.vcp-controls-panel {
    display: none !important;
}
.vcp-panel-bg {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0,
        #000 100%
    ) !important;
}
.vcp-controls-panel {
    display: none;
}
.mt-range-progress {
    background-color: #f8413d !important;
}
.mt-range-runway {
    border-top-width: 4px !important;
}
.mt-range-thumb {
    width: 13px;
    height: 13px;
    top: 8px !important;
}

.bullet-wrap {
    height: 200px;
    position: relative;
    top: 10%;
    left: 0;
    z-index: 11;
    overflow: hidden;
    font-size: 16px;
    font-weight: 700;
}
.bullet-item {
    text-shadow: 1px 1px #000;
    color: white;
    white-space: nowrap;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
}
.on {
    top: 0px;
}
.off {
    top: 80px;
}
.bullet-animation {
    animation: right2left 7s linear both;
}

@keyframes right2left {
    0% {
        transform: translate(100vw);
    }
    100% {
        transform: translate(-100%);
    }
}

.prism-detect-info {
    display: none;
}
.prism-error-operation {
    display: none;
}
.prism-error-content {
    display: none;
}
.prism-ErrorMessage {
    /*width: 100%;*/
    /*height: 100%;*/
    background-image: url('../../assets/image/noImg.png') !important;
    background-size: 100% 100% !important;
}
video {
    object-fit: cover;
}
</style>

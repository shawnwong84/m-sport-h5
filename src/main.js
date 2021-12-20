import Vue from 'vue';
import router from './router';
import Store from './vuex';
import App from './App';
import './assets/css/base.css';
import './assets/css/content.css';
import './assets/css/swiper.min.css';
import './assets/scss/global.scss'

import 'babel-polyfill';
import ax from './api/index';
import Utils from './assets/js/utils.js';
import { Toast, DatetimePicker, Popup, Picker, Range } from 'mint-ui';
// import Des from './assets/js/des.js'
import Vuetify from 'vuetify';
import VueLazyload from 'vue-lazyload';
import 'vuetify/dist/vuetify.min.css';
import webimconfig from './utils/webim.config.js';
import websdk from 'easemob-websdk';
// 环信
// 环信
let WebIM = (window.WebIM = websdk);
WebIM.config = webimconfig;
// 环信实例
// eslint-disable-next-line new-cap
var conn = (WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.socketServer,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery,
}));
// 账号密码登录配置
var optionsIm = {
    apiUrl: WebIM.config.apiURL,
    user: '', // 换成自己申请的账号就行，密码也需要换
    pwd: '123456',
    appKey: WebIM.config.appkey,
    success: function (re) {
        console.log('登陆成功');
    },
    error: function (err) {
        console.log(err);
    },
};
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Range.name, Range);
Vue.prototype.$WebIM = WebIM;
Vue.prototype.$imconn = conn;
Vue.prototype.$imoption = optionsIm;
Vue.use(Vuetify);
Vue.use(websdk);
// Vue.use(Timeline)
// Vue.use(TimelineItem)
Vue.prototype.$tost = Toast;
Vue.prototype.$utils = Utils;
// Vue.prototype.$des = Des
Vue.use(ax);
Vue.use(VueLazyload, {
    error: require('./assets/image/noImg.png'),
    loading: require('./assets/image/noImg.png'),
    attempt: 1,
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    router,
    store: Store,
    el: '#app',
    render: (h) => h(App),
});
const setHtmlFontSize = () => {
    const htmlDom = document.getElementsByTagName('html')[0];
    let htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
    if (htmlWidth >= 750) {
        htmlWidth = 750;
    }
    if (htmlWidth <= 320) {
        htmlWidth = 320;
    }
    htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();
import Vue from 'vue';
import router from './router';
import Store from './store';
import App from './App';
import './assets/css/base.css';
import './assets/css/content.css';
import './assets/scss/global.scss';
import 'swiper/css/swiper.min.css';

import 'babel-polyfill';
import ax from './api/index';
import Utils from './assets/js/utils.js';
import { Popup, Range } from 'mint-ui';
import moment from 'moment';
import {
    Toast,
    List,
    Form,
    Field,
    Button,
    Tag,
    NavBar,
    Uploader,
    Picker,
    DatetimePicker,
    Cell,
} from 'vant';
import 'vant/lib/index.css';
Vue.use(Toast)
    .use(List)
    .use(Field)
    .use(Form)
    .use(Button)
    .use(Tag)
    .use(NavBar)
    .use(Uploader)
    .use(Picker)
    .use(DatetimePicker)
    .use(Cell);

import VueLazyload from 'vue-lazyload';

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

Vue.component(Popup.name, Popup);
Vue.component(Range.name, Range);
Vue.prototype.$WebIM = WebIM;
Vue.prototype.$imconn = conn;
Vue.prototype.$imoption = optionsIm;
Vue.prototype.$moment = moment;

Vue.use(websdk);
// Vue.use(Timeline)
// Vue.use(TimelineItem)
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

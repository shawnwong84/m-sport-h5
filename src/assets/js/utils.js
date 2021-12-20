// import Vue from 'vue'
import $router from '../../router';
import { Cookie } from '../../api/cookie';
export default {
    getDeviceId() {
        if (!Cookie.get('deviceId')) {
            let date = new Date().getTime();
            let id = date + this.randomCoding() + 'H5';
            Cookie.set('deviceId', id);
        }
    },
    goBack() {
        $router.go(-1);
    },
    toPage(name) {
        $router.push({ name: name });
    },
    randomCoding() {
        var result = [];
        let n = 3; // 这个值可以改变的，对应的生成多少个字母，根据自己需求所改
        for (var i = 0; i < n; i++) {
            // 生成一个0到25的数字
            var ranNum = Math.ceil(Math.random() * 25);
            // 大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
            // 然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
            result.push(String.fromCharCode(65 + ranNum));
        }
        return result.join('');
    },
    formatDate(value) {
        var secondTime = parseInt(value); // 秒
        var minuteTime = 0; // 分
        var hourTime = 0; // 小时
        if (secondTime > 60) {
            // 如果秒数大于60，将秒数转换成整数
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if (minuteTime > 60) {
                hourTime = parseInt(minuteTime / 60);
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let hourTime1 =
            parseInt(hourTime) < 10
                ? '0' + parseInt(hourTime)
                : parseInt(hourTime);
        let minuteTime1 =
            parseInt(minuteTime) < 10
                ? '0' + parseInt(minuteTime)
                : parseInt(minuteTime);
        let secondTime1 =
            parseInt(secondTime) < 10
                ? '0' + parseInt(secondTime)
                : parseInt(secondTime);
        return hourTime1 + ':' + minuteTime1 + ':' + secondTime1;
    },
    formatTime(date) {
        // a     Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)
        var aa = new Date(parseInt(date));
        var d = new Date(aa);
        var datetime =
            d.getFullYear() +
            '-' +
            (d.getMonth() + 1) +
            '-' +
            d.getDate() +
            ' ' +
            d.getHours() +
            ':' +
            d.getMinutes() +
            ':' +
            d.getSeconds();
        return datetime;
    },
};

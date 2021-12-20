<template>
    <div class="newDeatils">
        <div class="back" @click="goBack()">
            <i class="go-back"></i>
            <!--      <span>返回</span>-->
        </div>
        <div class="title">资讯详情</div>
        <div class="content">
            <div>
                <h2>{{ title }}</h2>
            </div>
            <div class="mt-10 mb-10 fx align-items">
                <div>
                    <img :src="newData.authorAvatar" class="authorAvatar" />
                </div>
                <div>
                    <div>{{ newData.authorName }}</div>
                    <div class="fs-12 c-9D">{{ newData.releaseTime }}</div>
                </div>
            </div>
            <div v-html="content"></div>
            <div class="fx align-items mt-10">
                <div
                    v-for="(value, i) in tags"
                    :key="i"
                    v-if="i < 3"
                    class="tags"
                >
                    {{ value.name }}
                </div>
            </div>
            <div class="fx justify-center mt-20">
                <div
                    style="
                        width: 50%;
                        text-align: center;
                        border-right: 2px solid #eeeeee;
                    "
                    @click="topage2"
                >
                    <img src="../../assets/image/fenx.png" width="20px" />
                </div>
                <div
                    style="width: 50%; text-align: center"
                    class="fs-18"
                    v-if="!liked"
                    @click="likeArticle(1)"
                >
                    <img
                        src="../../assets/image/zan2.png"
                        width="20px"
                        class="mr-5"
                    />{{ likeCount }}
                </div>
                <div
                    style="width: 50%; text-align: center"
                    class="fs-18"
                    v-if="liked"
                    @click="likeArticle(2)"
                >
                    <img
                        src="../../assets/image/zan3.png"
                        width="20px"
                        class="mr-5"
                    />{{ likeCount + 1 }}
                </div>
            </div>
            <div
                class="fx align-items"
                style="margin-top: 30px; margin-bottom: 10px"
                v-if="newList"
            >
                <div><img src="../../assets/image/xiangg.png" /></div>
                <div class="ml-10">相关文章</div>
            </div>
            <div
                v-if="newList"
                class="fx align-items justify-between new-list"
                v-for="(item, index) in newList"
                :key="index"
                @click="toPage('newDeatils', item.id)"
            >
                <div class="fs-16">{{ item.title }}</div>
                <div class="ml-10">
                    <img :src="item.coverPicture" class="new-img" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            content: '',
            liked: false,
            title: '',
            newData: [],
            id: 0,
            tags: [],
            likeCount: 0,
            newList: [],
        };
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        topage2() {
            this.$router.push({ name: 'home' });
        },
        toPage(name, id) {
            this.$router.push({ name: name, query: { id: id } });
            location.reload();
        },
        goBack() {
            this.$router.go(-1);
        },
        likeArticle(num) {
            let param = {
                id: this.id,
            };
            this.$axios('post', '/article/likeArticle', param).then((res) => {
                if (res.code === 200) {
                    if (num === 1) {
                        this.liked = true;
                    } else {
                        this.liked = false;
                    }
                }
            });
        },
        getInfo() {
            let param = {
                id: this.$route.query.id,
            };
            this.$axios('post', '/article/getArticleInfoById', param).then(
                (res) => {
                    if (res.code === 200) {
                        this.id = res.data.id;
                        this.newData = res.data;
                        this.content = res.data.content;
                        this.title = res.data.title;
                        this.liked = res.data.liked;
                        this.tags = res.data.tags;
                        this.likeCount = res.data.likeCount;
                        this.newList = res.data.associateArticle;
                    }
                },
            );
        },
    },
};
</script>

<style scoped>
.tags {
    font-size: 12px;
    color: #007aff;
    margin-right: 10px;
    background: rgba(0, 122, 255, 0.1);
    padding: 2px 3px;
}
.new-list {
    margin: 10px;
    padding-top: 10px;
    border-top: 1px solid #eeeeee;
}
.content {
    position: absolute;
    top: 50px;
    bottom: 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
    /*display: flex;*/
    /*flex-direction: column;*/
    padding: 10px;
}
.authorAvatar {
    width: 36px;
    height: 36px;
    /*border: 1px solid;*/
    border-radius: 50%;
    margin-right: 10px;
}
.back {
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: 11;
    color: #4a4c5b;
}
.go-back {
    display: inline-block;
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
    border: 1px solid #4a4c5b;
    border-bottom: none;
    border-right: none;
}
.title {
    text-align: center;
    margin-top: 10px;
    font-weight: 700;
}

.new-img {
    border-radius: 5px;
    width: 110px;
    height: 83px;
}
.lodding {
    width: 100%;
    position: absolute;
    top: 30%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}
</style>
<style>
p img {
    width: 100% !important;
}
p {
    margin-top: 10px;
}
h1 {
    display: none;
}
</style>

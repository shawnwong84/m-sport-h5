<template>
    <div>
        <div
            ref="popover5"
            placement="top-start"
            width="348"
            v-show="showModal"
            class="ta-c"
        >
            <img
                v-for="(v, i) in emojiList"
                :src="require(`../../../static/faces/${v}`)"
                :key="i"
                @click="selectEmoji(i)"
                class="img-style"
            />
        </div>
        <!--    <van-icon name="smile-o" size="20" color="rgba(0, 0, 0, 0.65)" v-popover:popover5 />-->
    </div>
</template>

<script>
import emoji from '../../config/emoji.js';

export default {
    data() {
        return {
            emojiList: emoji.obj,
            currentEmoji: '',
            // showModal: true
        };
    },
    methods: {
        selectEmoji(e) {
            let value = (this.inpMessage || '') + e;
            this.$data.showModal = false;
            this.$emit('selectEmoji', value);
        },
    },
    props: ['inpMessage', 'showModal'],
    // : String,
    // : Boolean
    // }
};
</script>
<style scoped>
.img-style {
    width: 22px;
    margin: 5px;
    cursor: pointer;
}
.img-style:hover {
    background-color: aquamarine;
}
</style>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { isMobile } from './utils/tools';
export default {
    name: 'App',
    mounted() {
        this.toPlatform();
    },
    methods: {
        toPlatform() {
            const { NODE_ENV } = process.env;

            if (NODE_ENV !== 'development') {
                if (!isMobile()) {
                    window.location.href = '//www.mzhibo.cc/';
                }
            }
        },
    },
};
</script>

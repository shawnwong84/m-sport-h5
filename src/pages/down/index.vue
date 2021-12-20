<template>
    <div>
        <a
            class="copy"
            id="iosSign"
            data-type="iosSign"
            onclick="return handleDownload(this)"
            data-clipboard-text=""
            href=" "
        >
            <i class="iconfont icon-appstore"></i>
            <span>添加到主屏幕</span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'index',
};
</script>

<style scoped></style>

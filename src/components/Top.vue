<template>
    <header class="m-logo">
        <a :href="homepage">
            <img class="u-pic" svg-inline src="../../node_modules/@jx3box/jx3box-common/img/logo.svg" />
        </a>
        <hr />
        <p>搜索中心</p>
    </header>
</template>

<script>
export default {
    name: "Logo",
    data: function() {
        return {
            homepage: this.$root.JX3BOX.__Root
        };
    }
};
</script>

<style lang="less">
//TODO: 💤之后可能搞点什么logo动画,还没想好
.m-logo {
    margin: 0 auto;
    text-align: center;

    .u-pic {
        width: 60px;
        height:60px;
        vertical-align: top;
    }
    a {
        display: inline-block;
        font-size: 60px;
        line-height: 60px;
        font-family: Trebuchet MS, Calibri, -apple-system, BlinkMacSystemFont,
            Segoe UI, Helvetica Neue, Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        -webkit-font-smoothing: antialiased;
        margin: 0;
        color: @black;
    }
    hr {
        border: none;
        max-width: 40%;
        height: 1px;
        background-color: @border;
        margin: @space auto;
    }
    p {
        position: relative;
        font-size: 13px;
        letter-spacing: @space;
        top: -42px;
        background: @bg;
        display: inline-block;
        padding-left: @space;
        color: #777;
    }
}
@media screen and (max-width: @ipad-y) {
    .m-logo {
        margin-bottom: -40px;
    }
}
</style>

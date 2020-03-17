<template>
    <footer class="m-footer">
        &copy;
        <a :href="homepage" target="_blank">{{ domain }}</a>
        <a class="u-feedback" href="https://github.com/JX3BOX/jx3box.github.io/issues" target="_blank"
            >❤ 反馈建议</a
        >
    </footer>
</template>

<script>
export default {
    name: "Bottom",
    data: function() {
        return {
            homepage: this.$root.JX3BOX.__Root,
            domain : this.$root.JX3BOX.__Domain
        };
    }
};
</script>

<style lang="less">
.m-footer {
    font-size: 12px;
    color: @gray;
    margin-top: @space;

    a {
        color: @gray;
        &:hover {
            color: @pink;
        }
    }

    .u-feedback {
        float: right;
    }
}
</style>

<template>
    <footer class="m-footer">
        &copy;
        <a :href="homepage" target="_blank">JX3BOX.COM</a>
        <a class="u-feedback" :href="feedback" target="_blank"
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
            feedback : this.$root.JX3BOX.feedback
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

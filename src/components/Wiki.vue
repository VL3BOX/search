<template>
    <div class="m-wiki">
        <ul v-if="data.length">
            <li v-for="(item, i) in data" :key="'wiki-' + i">
                <a class="u-mark" href="https://剑网3.com" target="_blank"
                    >剑网3.com</a
                >
                <a
                    class="u-title"
                    :href="'https://剑网3.com/' + item.key"
                    target="_blank"
                    >剑网3.com/{{ item.key }}</a
                >
                <div class="u-desc">
                    {{ item.desc }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Wiki",
    props: ["data"],
    methods: {}
};
</script>

<style lang="less">
@import "../assets/css/var.less";
//百科词条
.m-wiki {
    ul{
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin-top: 20px;
        background-color: #fff;
        padding: 10px;
    }

    li {
        list-style: none;
    }

    .u-title {
        font-size: 14px;
        color: @blue;
        text-decoration: none;
        box-shadow: 0 1px 0 @blue;
        &:hover {
            color: @hover;
            box-shadow: 0 1px 0 @hover;
        }
    }
    .u-desc {
        font-size: 13px;
        line-height: 1.6;
        margin-top: 5px;
        color: #909399;
    }

    position: relative;
    .u-mark {
        background-color: @black;
        color: #fff;
        border-radius: 2px;
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
        padding: 2px 4px;
        font-style: normal;
    }
}
</style>

<template>
    <div class="m-post">
        <div v-if="q">
            <ul class="u-list" v-if="data.length">
                <li class="u-item" v-for="(item, i) in data" :key="'item-' + i">
                    <a class="u-title" v-bind:href="formatURL(item)" target="_blank">{{
                        item.post_title
                    }}</a>
                    <span class="u-link"><time class="u-date">{{formatDate(item.post_modified)}}</time> {{ formatURL(item) }}</span>
                    <span class="u-desc">{{ formatContent(item.post_content) }}</span>
                </li>
            </ul>
            <el-alert v-show="status" title="未检索到相关结果" type="info"></el-alert>
        </div>
        <div v-else>
            <el-alert title="请在上方搜索框输入内容" type="success"></el-alert>
        </div>
    </div>
</template>

<script>
const dateFormat = require('../utils/dateFormat');

export default {
    name: "Post",
    props: ["data","q","status"],
    methods: {
        formatURL: function(item) {
            // TODO:转rewrite新版地址
            return `${this.$root.JX3BOX.__Root}?p=${item.ID}`;
        },
        formatContent: function(content) {
            return content
                .replace(/<[^>]*>|/g, "")
                .replace(/&nbsp;/g, "")
                .slice(0, 200);
        },
        formatDate : function (date){
            return dateFormat(new Date(date))
        }
    },
};
</script>

<style lang="less">
//搜索结果
.m-post {
    background-color: #fff;
    border-radius: 6px;
    padding: @space;
    margin-top: @space;

    a {
        color: @color-link;
    }
    .u-list {
        padding: 0;
        margin: 0;
    }

    .u-item {
        margin-bottom: @space;
        list-style: none;
        *zoom: 1;
        &:after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .u-link {
        display: block;
    }

    .u-title {
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.6px;
        b {
            color: @pink;
        }
        &:hover {
            box-shadow: 0 1px 0 @color-link;
        }
    }
    .u-link {
        font-size: 12px;
        line-height: 2;
        color: @gray;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .u-date{
        background-color: @bg;
        color:@pink;
        border-radius:2px;
        padding:2px 5px;
        font-weight:600;
    }

    .u-pic {
        float: left;
        margin-right: 10px;
    }

    .u-desc {
        font-size: 13px;
        line-height: 1.6;
        color: @desc;
        letter-spacing: 0.6px;
        b {
            color: @pink;
        }
    }
}
</style>

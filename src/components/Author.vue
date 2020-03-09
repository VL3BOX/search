<template>
    <div class="m-author">
        <div v-if="q">
            <ul class="u-list" v-if="data.length">
                <li class="u-item" v-for="(item, i) in data" :key="'item-' + i">
                    <a class="u-author" v-bind:href="formatURL(item)" target="_blank">
                        <img class="u-avatar" :src="formatAvatar(item.avatar)" :alt="item.display_name">
                        <b class="u-name">{{item.display_name}}</b>
                        <span class="u-desc" v-html="item.description"></span>
                    </a>
                </li>
            </ul>
            <el-alert v-show="status" title="未检索到相关结果" type="info"></el-alert>
        </div>
        <div v-else>
            <el-alert title="请输入搜索内容" type="success"></el-alert>
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Author",
    props: ["data","q","status"],
    methods: {
        formatURL: function(item) {
            return `${JX3BOX.__Root}author/${item.ID}`;
        },
        formatAvatar : function (url){
            return url 
            ? url.replace(JX3BOX.__ossRoot,JX3BOX.__ossMirror) + JX3BOX.avatar_suffix_s
            : JX3BOX.__ossMirror + JX3BOX.default_avatar + JX3BOX.avatar_suffix_s
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/var.less";
//搜索结果
.m-author {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    margin-top: 20px;

    a {
        color: @hover;
    }
    .u-list {
        padding: 0;
        margin: 0;
    }

    .u-item {
        margin-bottom: 20px;
        list-style: none;
    }

    .u-author{
        display: block;
        padding:10px;
        border:1px solid #eee;
        border-radius:3px;
        *zoom: 1;
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        background-color: #fafbfc;
        &:hover{
            border-color:#ddd;
        }
    }

    .u-avatar{
        float:left;
        margin-right:20px;
    }

    .u-name {
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.6px;
        color: @hover;
        display:block;
    }

    .u-desc {
        display:block;
        font-size: 14px;
        line-height: 1.6;
        color: @desc;
        letter-spacing: 0.6px;
        b {
            color: @pink;
        }
    }
}
</style>

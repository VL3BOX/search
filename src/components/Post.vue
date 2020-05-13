<template>
    <div class="m-post" v-if="show">
        <ul class="u-list" v-show="status == true">
            <li class="u-item" v-for="(item, i) in list" :key="'item-' + i">
                <a
                    class="u-title"
                    v-bind:href="formatURL(item)"
                    target="_blank"
                    >{{ item.post.post_title }}</a
                >
                <span class="u-link"
                    ><time class="u-date">{{
                        formatDate(item.post.post_modified)
                    }}</time>
                    {{ formatURL(item) }}</span
                >
                <span class="u-desc">{{
                    formatContent(item.post.post_content)
                }}</span>
            </li>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="changePage"
                hide-on-single-page
            >
            </el-pagination>
        </ul>
        <el-alert
            v-show="status == false"
            title="未检索到相关结果"
            type="info"
        ></el-alert>
    </div>
</template>

<script>
const dateFormat = require("../utils/dateFormat");

export default {
    name: "Post",
    data: function() {
        return {
        };
    },
    computed: {
        status: function() {
            return this.$store.state.q ? !!this.$store.state.post.total : null
        },
        total : function (){
            return this.$store.state.post.total
        },
        list : function (){
            return this.$store.state.post.list
        },
        show : function (){
            return this.$store.state.type == 'post'
        }
    },
    methods: {
        formatURL: function(item) {
            // TODO:转rewrite新版地址
            return `${this.$root.JX3BOX.__Root}?p=${item.post.ID}`;
        },
        formatContent: function(content) {
            return (
                content &&
                content
                    .replace(/<[^>]*>|/g, "")
                    .replace(/&nbsp;/g, "")
                    .slice(0, 200)
            );
        },
        formatDate: function(date) {
            return dateFormat(new Date(date));
        },
        changePage: function(i) {
            this.$store.commit('search',{page:i})
        },
    },
    mounted: function() {
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

    .u-date {
        background-color: @bg;
        color: @pink;
        border-radius: 2px;
        padding: 2px 5px;
        font-weight: 600;
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

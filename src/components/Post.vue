<template>
    <div class="m-post m-block" v-loading="loading">
        <ul class="u-list" v-if="data.length">
            <li class="u-item" v-for="(item, i) in data" :key="'item-' + i">
                <a
                    class="u-title"
                    v-bind:href="item | formatURL"
                    target="_blank"
                    >{{ item.post.post_title }}</a
                >
                <span class="u-link"
                    ><time class="u-date">{{
                        item.post.post_modified | formatDate
                    }}</time>
                    {{ item | formatURL }}</span
                >
                <span class="u-desc">{{
                    item.post.post_content | formatContent
                }}</span>
            </li>
        </ul>
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
        <el-button
            class="m-archive-more"
            type="primary"
            :class="{ show: hasNextPage }"
            :loading="loading"
            @click="appendPage(++page)"
            icon="el-icon-arrow-down"
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            layout="prev, pager, next"
            background
            hide-on-single-page
            :page-size.sync="per"
            :total="total"
            :current-page.sync="page"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import dateFormat from "../utils/dateFormat";
import { postLink } from "@jx3box/jx3box-common/js/utils";
import { getPost } from "@/service/search";
export default {
    name: "Post",
    data: function() {
        return {
            loading: false,
            data: [], //数据列表
            total: 1, //总条目数
            pages: 1, //总页数
            page: 1, //当前页数
            per: 10, //每页条目
        };
    },
    computed: {
        q: function() {
            return this.$store.state.q;
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    filters: {
        formatURL: function(item) {
            return postLink(item.post.post_type, item.post.ID);
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
    },
    methods: {
        loadData: function(i = 1, append = false) {
            this.loading = true;
            getPost(this.q, i)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.loadData(i);
        },
        appendPage: function(i) {
            this.loadData(i, true);
        },
    },
    watch: {
        q: function() {
            this.page = 1
            this.loadData();
        },
    },
    mounted: function() {
        this.loadData();
    },
};
</script>

<style lang="less">
//搜索结果
.m-post {
    
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

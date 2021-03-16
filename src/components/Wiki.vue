<template>
    <div class="m-wiki m-block" v-loading="loading">
        <ul class="u-list" v-if="data.length">
            <li
                class="u-item"
                v-for="(item, i) in data"
                :key="i"
            >
                <a class="u-title" :href="item.id | url" target="_blank">{{ item.title }}</a>
                <span class="u-desc">{{ item.tag.join(',') }}</span>
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
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            layout="prev, pager, next"
            background
            hide-on-single-page
            :page-size.sync="per"
            :total="total"
            :current-page="page"
            @current-change="changePage"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getWiki } from "@/service/search.js";
import {__Root} from '@jx3box/jx3box-common/data/jx3box.json'
export default {
    name: "Wiki",
    props: [],
    data: function (){
        return {
            loading: false,
            data: [], //数据列表
            total: 1, //总条目数
            pages: 1, //总页数
            page: 1, //当前页数
            per: 10, //每页条目
        }
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
        url: function(id) {
            return __Root + "wiki/?pid=" + id;
        },
    },
    methods: {
        loadData: function(i = 1, append = false) {
            this.loading = true;
            getWiki(this.q, i)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.data);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.data;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.last_page;
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
            this.loadData();
        },
    },
    mounted: function() {
        this.loadData(1);
    },
};
</script>

<style lang="less">
//百科词条
.m-wiki {
    a {
        color: @color-link;
    }
    .u-list {
        padding: 0;
        margin: 0;
    }

    .u-item {
        margin-bottom: @space;
        padding: 0;
        list-style: none;
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

    .u-desc {
        .db;
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

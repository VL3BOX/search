<template>
    <div class="m-author" v-if="show">
        <ul class="u-list" v-show="status == true">
            <li class="u-item" v-for="(item, i) in list" :key="'item-' + i">
                <a
                    class="u-author"
                    v-bind:href="formatURL(item)"
                    target="_blank"
                >
                    <img
                        class="u-avatar"
                        :src="formatAvatar(item.user_avatar)"
                        :alt="item.display_name"
                    />
                    <b class="u-name">{{ item.display_name }}</b>
                    <span class="u-desc" v-html="item.user_bio"></span>
                </a>
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
const { Utils } = require("@jx3box/jx3box-common");

export default {
    name: "Author",
    data: function() {
        return {
        };
    },
    computed: {
        status: function() {
            return this.$store.state.q ? !!this.$store.state.author.total : null
        },
        total : function (){
            return this.$store.state.author.total
        },
        list : function (){
            return this.$store.state.author.list
        },
        show : function (){
            return this.$store.state.type == 'author'
        }
    },
    methods: {
        formatURL: function(item) {
            // TODO:转`换rewrite新版地址
            return `${this.$root.JX3BOX.__Root}author/${item.ID}`;
        },
        formatAvatar: function(url) {
            return Utils.showAvatar(url, "s");
        },
        changePage: function(i) {
            this.$store.commit('search',i)
        },
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
//搜索结果
.m-author {
    background-color: #fff;
    border-radius: 6px;
    padding: @space;
    margin-top: @space;

    a {
        color: @hover;
    }
    .u-list {
        padding: 0;
        margin: 0;
    }

    .u-item {
        margin-bottom: @space;
        list-style: none;
    }

    .u-author {
        display: block;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 3px;
        *zoom: 1;
        img {
            width: 68px;
            height: 68px;
        }
        &:after {
            content: "";
            display: table;
            clear: both;
        }
        background-color: #fafbfc;
        &:hover {
            border-color: #ddd;
        }
    }

    .u-avatar {
        float: left;
        margin-right: @space;
    }

    .u-name {
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.6px;
        color: @hover;
        display: block;
    }

    .u-desc {
        display: block;
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

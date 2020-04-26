<template>
    <div id="app">
        <Top />
        <main>
            <div class="m-search">
                <el-input
                    placeholder="请输入内容"
                    v-model="q"
                    class="input-with-select"
                    @change="search"
                    clearable
                >
                    <el-select
                        v-model="type"
                        slot="prepend"
                        placeholder="请选择"
                        class="m-search-type"
                        @change="typeChange"
                    >
                        <el-option label="作品" value="all">作品</el-option>
                        <el-option label="作者" value="author">作者</el-option>
                        <el-option label="谷歌" value="google"
                            >Google</el-option
                        >
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <Wiki :data="wiki" />
            <Post :data="post" v-show="isPost" :q="q" :status="postIsNull" />
            <Author :data="author" v-show="isAuthor" :q="q" :status="authorIsNull"/>
            <Google v-if="isGoogle" :q="q" />
        </main>
        <Bottom />
    </div>
</template>

<script>
const axios = require("axios");
const URI = require("urijs");

import Top from "@/components/Top.vue";
import Bottom from "@/components/Bottom.vue";
import Wiki from "@/components/Wiki.vue";
import Post from "@/components/Post.vue";
import Author from "@/components/Author.vue";
import Google from "@/components/Google.vue";

export default {
    name: "App",
    data: function() {
        return {
            //搜索词
            q: "",
            //类型
            type: "",
            //结果
            wiki: [],
            post: [],
            author: [],
            //状态
            postIsNull: false,
            authorIsNull: false
        };
    },
    computed: {
        isPost: function() {
            return this.type == "all";
        },
        isAuthor: function() {
            return this.type == "author";
        },
        isGoogle: function() {
            return this.type == "google";
        }
    },
    methods: {
        init() {
            let query = URI(location.href).query(true)
            this.q = query.q || ''
            this.type = query.type || 'all'
        },
        clearStatus() {
            this.postIsNull = false;
            this.authorIsNull = false;
        },
        getResultFromWiki() {
            //TODO:wiki结果返回
        },
        getResultFromPost() {
            axios
                .get(this.$root.JX3BOX.__server + "search/post", {
                    params: {
                        q: this.q
                        // type : this.type
                    }
                })
                .then(res => {
                    this.post = res.data;
                    if (!res.data.length) this.postIsNull = true;
                })
                .catch(err => {
                    console.error("[API/post] post api exception");
                });
        },
        getResultFromAuthor() {
            axios
                .get(this.$root.JX3BOX.__server + "search/user", {
                    params: {
                        q: this.q
                    }
                })
                .then(res => {
                    this.author = res.data;
                    if (!res.data.length) this.authorIsNull = true;
                })
                .catch(err => {
                    console.error("[API/author] author api exception");
                });
        },
        // postRecord() {
        //     axios
        //         .post(this.$root.JX3BOX.__spider + "jx3stat/search", {
        //             q: this.q,
        //             type: this.type
        //         })
        //         .then(res => {
        //             // console.info(res)
        //         });
        // },
        search() {
            if (!this.q) return;

            //清空状态
            this.clearStatus();

            //加载结果  
            switch(this.type){
                case 'all':
                    this.getResultFromPost();
                    break;
                case 'author':
                    this.getResultFromAuthor();
                    break;
                case 'wiki':
                    this.getResultFromWiki();
                    break;
            }

            //统计记录
            // this.postRecord();
        },
        typeChange(){
            this.search()
        }
    },
    filters: {
        // cseExtract : function (url){
        //     let uri = new URI(url)
        //     return uri.search(true).q
        // },
    },
    mounted: function() {
        this.init();
        this.search();
    },
    components: {
        Top,
        Bottom,
        Wiki,
        Post,
        Author,
        Google
    }
};
</script>

<style lang="less">
html {
    background-color: @bg;
}
body {
    padding: 100px 10px @space 10px;
    max-width: 880px;
    margin: 0 auto;
    a {
        text-decoration: none;
    }
    font-family: -apple-system, "Microsoft YaHei", Trebuchet MS, Calibri,
        BlinkMacSystemFont, Segoe UI, Helvetica Neue, Helvetica, sans-serif;
    text-rendering: optimizelegibility;
}
@media screen and (max-width: @ipad) {
    body {
        max-width: 90%;
    }
}
@media screen and (max-width: @ipad-y) {
    body {
        padding-top: 40px;
    }
}
//搜索框
.el-input-group__prepend .el-select {
    width: 80px;
}
.el-select-dropdown__item img {
    width: @space;
    vertical-align: middle;
    position: relative;
    top: -2px;
    margin-right: 5px;
}
@media screen and (max-width: @ipad-y) {
    .m-search-type {
        display: none;
    }
}
</style>

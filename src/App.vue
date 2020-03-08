<template>
    <div id="app">
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
                >
                    <el-option label="作品" value="all">作品</el-option>
                    <el-option label="作者" value="author">作者</el-option>
                    <el-option label="谷歌" value="google">Google</el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        
        <Wiki :data="wiki"/>
        <Post :data="post" v-show="isPost" :q="q"/>
        <Author :data="author" v-show="isAuthor" :q="q"/>
        <Google v-if="isGoogle" :q="q"/>
    </div>
</template>

<script>
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
// const URI = require('urijs');

import Wiki from '@/components/Wiki.vue';
import Post from '@/components/Post.vue';
import Author from '@/components/Author.vue';
import Google from '@/components/Google.vue';

export default {
    name: "App",
    data: function() {
        return {
            //搜索词
            q: "",
            //类型
            type: "all",
            //结果
            wiki: [],
            post:[],
            author:[]
        };
    },
    computed : {
        isPost : function (){
            return this.type == 'all'
        },
        isAuthor : function (){
            return this.type == 'author'
        },
        isGoogle : function (){
            return this.type == 'google'
        }
    },
    methods: {
        init(){
            let _q = location.search.slice(3);
            this.q = _q ? decodeURIComponent(_q) : "";
        },
        clearExistData(){
            this.wiki = []
            this.post = []
            this.author = []
        },
        getResultFromWiki(){
            //TODO:wiki结果返回
        },
        getResultFromPost(){
            axios.get(JX3BOX.__server + 'search/post/',{
                params: {
                    q : this.q,
                    // type : this.type 
                }
            }).then((res) => {
                console.log(res.data)
                this.post = res.data
            }).catch((err) => {
                console.error('[Server/search] post api exception')
            })
        },
        getResultFromAuthor(){
            axios.get(JX3BOX.__server + 'search/author/',{
                params: {
                    q : this.q,
                }
            }).then((res) => {
                this.author = res.data
            }).catch((err) => {
                console.error('[Server/search] author api exception')
            })
        },
        postRecord(){
            axios.post(JX3BOX.__spider + "jx3stat/search",{
                q : this.q,
                type : this.type 
            }).then(res => {
                // console.info(res)
            });
        },
        search() {
            //清空数据
            this.clearExistData()

            //加载wiki结果
            this.getResultFromWiki()
            this.getResultFromPost()
            this.getResultFromAuthor()

            //统计记录
            this.postRecord()
        }
    },
    filters:{
        // cseExtract : function (url){
        //     let uri = new URI(url)
        //     return uri.search(true).q
        // },
        // ossMirror : function (url){
        //     return url.replace(JX3BOX.__ossRoot,JX3BOX.__ossMirror)
        // },
    },
    mounted: function() {
        this.init();
        this.search();
    },
    components : {
        Wiki,
        Post,
        Author,
        Google
    }
};
</script>

<style lang="less">
@import "./assets/css/var.less";
@ipad: 1024px;
@ipad-y: 767px;
html {
    background-color: @bg;
}
body {
    padding: 100px 10px 20px 10px;
    max-width: 880px;
    margin: 0 auto;
    a {
        text-decoration: none;
    }
}
@media screen and (max-width: @ipad) {
    body {
        max-width: 90%;
    }
}

//logo
.m-logo {
    margin: 0 auto;
    text-align: center;

    img {
        width: 60px;
        vertical-align: middle;
        margin-right: 10px;
    }
    a {
        display: inline-block;
        vertical-align: middle;
        font-size: 42px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
            Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        -webkit-font-smoothing: antialiased;
        margin: 0;
        color: @black;
    }
    hr {
        border: none;
        max-width: 40%;
        height: 1px;
        background-color: @border;
        margin: 20px auto;
    }
    p {
        position: relative;
        font-size: 13px;
        letter-spacing: 20px;
        top: -42px;
        background: @bg;
        display: inline-block;
        padding-left: 20px;
        color: #777;
    }
}
@media screen and (max-width: @ipad-y) {
    body {
        padding-top: 40px;
    }
    .m-logo {
        margin-bottom: -40px;
    }
}

//搜索框
.el-input-group__prepend .el-select {
    width: 80px;
}
.el-select-dropdown__item img {
    width: 20px;
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

//底部
.m-footer{
    font-size:12px;
    color:@gray;

    a{
        float:right;
        color:@gray;
        &:hover{
            color:@pink;
        }
    }
}
</style>

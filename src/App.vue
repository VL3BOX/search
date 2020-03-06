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
                <!-- <template slot="prepend">JX3BOX</template> -->
                <el-select
                    v-model="type"
                    slot="prepend"
                    placeholder="请选择"
                    class="m-search-type"
                >
                    <el-option label="全站" value="all">全站</el-option>
                    <!-- <el-option label="宏库" value="macro">宏库</el-option>
                    <el-option label="副本" value="fb">副本</el-option>
                    <el-option label="职业" value="bps">职业</el-option> -->
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <ul class="m-wiki" v-if="wiki.length">
            <li v-for="(item, i) in wiki" :key="'wiki-' + i">
                <a class="u-mark" href="https://剑网3.com" target="_blank">剑网3.com</a>
                <a
                    class="u-title"
                    :href="'https://剑网3.com/' + item.key"
                    target="_blank"
                    >剑网3.com/{{ item.key }}</a>
                <div class="u-desc">
                    {{ item.desc }}
                </div>
            </li>
        </ul>
        <div class="m-result">
            <ul class="u-list">
                <template v-if="cseapi.length">
                    <li class="u-item" v-for="(item,i) in cseapi" :key="'cseapi-'+i">
                        <a class="u-title" v-bind:href="item.formattedUrl" v-html="item.title" target="_blank"></a>
                        <span class="u-link">{{item.url}}</span>
                        <!-- <img class="u-pic" v-if="item.richSnippet.cseImage" :src="item.richSnippet.cseImage.src | ossMirror" :height="item.richSnippet.cseThumbnail.height | shrinkPic"> -->
                        <span class="u-desc" v-html="item.content"></span>
                    </li>
                </template>
            </ul>
            <template v-if="isnull">
                <el-alert title="未检索到相关结果" type="info"></el-alert>
            </template>
        </div>
        <p class="m-footer">
            &copy; www.jx3box.com
            <a href="https://www.jx3box.com/feedback" target="_blank">❤ 反馈建议</a>
        </p>
    </div>
</template>

<script>
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-config");
const URI = require('urijs');

function googlecse(data){
    window.__cse_result = data
}

export default {
    name: "App",
    data: function() {
        return {
            //搜索词
            q: "",
            //类型
            type: "all",
            //wiki 结果
            wiki: [],
            //cse api结果
            cseapi:[],
            //local api结果
            localapi:[],
            //代理请求状态
            proxy:true,
            //loading
            isnull:false
        };
    },
    computed: {
        url_jsonapi: function() {
            return JX3BOX.__proxy + 'gsearch/jsonapi?q=' + this.q
        },
        url_cseapi : function (){
            return JX3BOX.__proxy + 'gsearch/cseapi?q=' + this.q
        },
    },
    methods: {
        init(){
            let _q = location.search.slice(3);
            this.q = _q ? decodeURIComponent(_q) : "剑网3";
        },
        getResultFromWiki(){
            //TODO:wiki结果返回
        },
        getResultFromPorxy(){
            return axios.get(this.url_cseapi).then((res) => {
                if(res.data){
                    eval(res.data)
                    this.cseapi = window.__cse_result.results || []
                    this.proxySuccess()
                    console.dir(this.cseapi)
                }else{
                    this.proxyFailed()
                }
            })
        },
        clearExistData(){
            this.isnull = false
            this.wiki = []
            this.cseapi = []
            this.localapi = []
        },
        proxySuccess(){
            this.proxy = true
        },
        proxyFailed(){
            this.proxy = false
            //TODO:管理通知
        },
        getResultFromLocal(){
            //TODO:本地查询
        },
        checkNull(){
            if(!this.cseapi.length && !this.localapi.length){
                this.isnull = true
            }
        },
        postRecord(){
            axios.post(JX3BOX.__spider + "jx3stat/search",{
                q : this.q,
                type : this.type 
            }).then(res => {
                // console.log(res)
            });
        },
        search() {
            //清空数据
            this.clearExistData()

            //加载wiki结果
            this.getResultFromWiki()

            //尝试从代理获取结果
            this.getResultFromPorxy().then((proxy_result) => {
                //如果代理都失败，请求本地接口
                if(!this.cseapi.length){
                    this.getResultFromLocal()
                }
            }).finally(() => {
                this.checkNull()
            })

            //统计记录
            this.postRecord()
        }
    },
    filters:{
        // cseExtract : function (url){
        //     let uri = new URI(url)
        //     return uri.search(true).q
        // },
        ossMirror : function (url){
            return url.replace(JX3BOX.__ossRoot,JX3BOX.__ossMirror)
        },
        shrinkPic : function (val){
            return 60
        }
    },
    mounted: function() {
        this.init();
        this.search();
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

//百科词条
.m-wiki {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;

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

//搜索结果
.m-result{
    background-color: #fff;
    border-radius:6px;
    padding:20px;
    margin-top:20px;

    a{
        color:@hover;
    }
    // a:visited{
    //     color:@visited;
    // }

    .u-list{
        padding:0;
        margin:0;
    }

    .u-item{
        margin-bottom:20px;
        list-style:none;
        *zoom:1;
        &:after{content:"";display:table;clear:both;}
    }

    .u-title,.u-link{
        display: block;
    }

    .u-title{
        font-size:16px;
        line-height: 1.5;
        letter-spacing: 0.6px;
        b{color:@pink;}
        &:hover{
            text-decoration:underline;
        }
    }
    .u-link{
        font-size:12px;
        line-height: 2;
        color:@gray;
    }

    .u-pic{
        float:left;
        margin-right:10px;
    }

    .u-desc{
        font-size:14px;
        line-height: 1.6;
        color:@desc;
        letter-spacing: 0.6px;
        b{
            color:@pink;
        }
    }
}
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

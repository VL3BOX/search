<template>
    <div id="app">
        <div class="c-logo">
            <img src="./assets/img/logo.png" alt="JX3BOX" />
            <a href="https://www.jx3box.com">JX3BOX</a>
            <hr />
            <p>搜索中心</p>
        </div>
        <div class="c-search">
            <el-input
                placeholder="请输入内容"
                v-model="q"
                class="input-with-select"
                @change="search"
                clearable 
            >
                <template slot="prepend">JX3BOX</template>
                <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="百度" value="百度"
                        ><img
                            src="./assets/img/baidu.png"
                            alt="百度"
                        />百度</el-option
                    >
                    <el-option label="Google" value="Google"
                        ><img
                            src="./assets/img/google.png"
                            alt="Google"
                        />Google</el-option
                    >
                </el-select> -->
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <ul class="c-wiki" v-if="wiki.length">
            <li v-for="(item,i) in wiki" :key="'wiki-' + i">
                <a class="u-mark" href="https://剑网3.com" target="_blank"
                    >剑网3.com</a
                >
                <a class="u-title" :href="'https://剑网3.com/' + item.key" target="_blank"
                    >剑网3.com/{{item.key}}</a
                >
                <div class="u-desc">
                    {{item.desc}}
                </div>
            </li>
        </ul>
        <el-tabs v-model="activeTab">
            <el-tab-pane name="baidu">
                <span slot="label"
                    ><img src="./assets/img/baidu.png" alt="百度" />百度</span
                >
                <div class="c-baidu">
                    <p class="u-tip">
                        使用百度进行站内搜索时，请勿删除前面的<em
                            >site:jx3box.com</em
                        >
                    </p>
                    <iframe
                        ref="iframe_baidu"
                        :src="url_baidu"
                        frameborder="0"
                    ></iframe>
                </div>
            </el-tab-pane>
            <el-tab-pane name="google">
                <span slot="label"
                    ><img
                        src="./assets/img/google.png"
                        alt="Google"
                    />Google</span
                >
                <div class="c-google">
                    <iframe ref="iframe_google" :src="url_google" frameborder="0"></iframe>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
const axios = require('axios');
const baidu_path = 'https://www.baidu.com/s?word=site%3Ajx3box.com+'
const google_path = './google_proxy.html?q='
const {JX3BOX} = require('@jx3box/jx3box-config');
export default {
    name: "App",
    data: function() {
        return {
            q: "",
            //select: "百度",
            activeTab: "baidu",
            wiki : [],
            url_baidu: '',
            url_google: '',
            };
    },
    computed: {
        s: function() {
            return encodeURIComponent(this.q);
        },
    },
    methods: {
        init(){
            //get query words, update base data
            let _q = location.search.slice(3);
            this.q = _q ? decodeURIComponent(_q) : "剑网3";
        },
        search() {
            //load iframe
            this.build()

            //record for statistics
            axios.post(JX3BOX.__spider + 'jx3search?q=' + this.q).then((res) => {
                console.log('i o u')
            })
        },
        build(){
            this.url_baidu = baidu_path + this.s
            this.url_google = google_path + this.s
        },
    },
    mounted: function() {
        this.init()
        this.build()

        //TODO:init wiki results
        // {
        //     key : '关键词',
        //     desc : '描述',
        //     url : 'link'
        // }
    }
};
</script>

<style lang="less">
@import "./assets/css/var.less";
@ipad : 1024px;
@ipad-y : 767px;
html {
    background-color: @bg;
}
body {
    padding: 100px 10px 20px 10px;
    max-width: 62%;
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
.c-logo {
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
    .c-logo {
        margin-bottom: -40px;
    }
}

//搜索框
.el-input-group__prepend .el-select {
    width: 100px;
}
.el-select-dropdown__item img {
    width: 20px;
    vertical-align: middle;
    position: relative;
    top: -2px;
    margin-right: 5px;
}
@media screen and (max-width:@ipad-y){
    .el-input-group__prepend{
        display:none;
    }
}

//百科词条
.c-wiki {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;

    li{
        list-style:none;
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
.el-tabs {
    margin-top: 20px;
    background-color: #fff;
    padding-top: 10px;
}
.el-tabs__header {
    padding: 0 15px;
}
.el-tabs__item img {
    width: 20px;
    vertical-align: middle;
    position: relative;
    top: -2px;
    margin-right: 5px;
}

//百度搜索
.c-baidu {
    .u-tip {
        margin: 5px 10px;
        background-color: @bg;
        padding: 5px;
        border: 1px solid @border;
        border-radius: 4px;
        font-size: 14px;
        color: #555;
        em {
            color: @blue;
        }
        display: none;
    }
}
iframe {
    width: 100%;
    height: 1500px;
}
// @media screen and (max-width: 767px) {
//     .c-baidu iframe {
//         margin-top:-60px;
//     }
// }
</style>

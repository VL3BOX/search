<template>
    <div id="app">
        <div class="c-logo">
            <img src="./assets/img/logo.png" alt="JX3BOX" />
            <a href="https://www.jx3box.com">JX3BOX</a>
            <hr />
            <p>搜索中心</p>
        </div>
        <!-- TODO: 词条接口 -->
        <!-- <div class="c-wiki">
            <a class="u-mark" href="https://www.jx3box.com" target="_blank"
                >剑网3.com</a
            >
            <a class="u-title" href="https://www.jx3box.com" target="_blank"
                >剑网3.com/词条</a
            >
            <div class="u-desc">
                Description for wiki
            </div>
        </div> -->
        <el-tabs v-model="activeTab" @tab-click="tabChange">
            <el-tab-pane name="baidu">
                <span slot="label"
                    ><img src="./assets/img/baidu.png" alt="百度" />百度</span
                >
                <div class="c-baidu">
                    <p class="u-tip">使用百度进行站内搜索时，请勿删除前面的<em>site:jx3box.com</em></p>
                    <iframe
                        :src="'https://www.baidu.com/s?word=site%3Ajx3box.com+' + s"
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
                <div class="gcse-search"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "App",
    data: function() {
        return {
            q : "",
            activeTab: "baidu"
        };
    },
    computed: {
        s: function() {
            return encodeURIComponent(this.q);
        }
    },
    methods: {
        tabChange(tab, event) {
            //console.log(tab, event);
        }
    },
    mounted: function() {
        let _q = location.search.slice(3);
        this.q = _q ? decodeURIComponent(_q) : '剑网3'
    }
};
</script>

<style lang="less">
@import "./assets/css/var.less";
body {
    padding: 100px 10px 20px 10px;
    background-color: @bg;
    max-width: 62%;
    margin: 0 auto;
    a {
        text-decoration: none;
    }
}
@media screen and (max-width:1024px){
    body{
        max-width:90%;
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

//百科词条
.c-wiki {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    //margin-top: 20px;
    background-color: #fff;
    padding: 10px;

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
    // margin-top: 20px;
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

//谷歌搜索样式重定义
body {
    &.gsc-overflow-hidden {
        overflow: auto !important;
    }
    .gsc-modal-background-image-visible,
    .gsc-results-close-btn {
        display: none !important;
    }
    .gsc-results-wrapper-overlay {
        position: static !important;
        box-shadow: none !important;
        width: 100% !important;
        height: auto !important;
        padding: 0;
        overflow: visible;
    }
}

//百度搜索
.c-baidu {
    .u-tip{
        margin:5px 10px;
        background-color: @bg;
        padding:5px;
        border:1px solid @border;
        border-radius:4px;
        font-size:14px;
        color:#555;
        em{
            color:@blue;
        }
    }
    iframe {
        width: 100%;
        height: 2400px;
    }
}
</style>

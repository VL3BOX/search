<template>
    <div id="app">
        <header>
            <Top />
            <Search/>
        </header>
        <main v-if="q" >
            <Post v-if="type == 'post'"/>
            <Author v-if="type == 'author'"/>
            <Cj v-if="type == 'cj'"/>
            <Item v-if="type == 'item'"/>
            <Wiki v-if="type == 'wiki'"/>
            <Google v-if="type == 'google'"/>
        </main>
        <footer v-show="q">
            <Bottom />
        </footer>
    </div>
</template>

<script>
import Top from "@/components/Top.vue";
import Bottom from "@/components/Bottom.vue";
import Search from "@/components/Search.vue";
import Wiki from "@/components/Wiki.vue";
import Post from "@/components/Post.vue";
import Author from "@/components/Author.vue";
import Cj from "@/components/Cj.vue";
import Item from "@/components/Item.vue";
import Google from "@/components/Google.vue";

export default {
    name: "App",
    data: function() {
        return {
            
        };
    },
    computed: {
        type : function (){
            return this.$store.state.type
        },
        q : function (){
            return this.$store.state.q  
        },
    },
    methods: {},
    mounted: function() {},
    components: {
        Top,
        Bottom,
        Search,
        Wiki,
        Post,
        Author,
        Cj,
        Item,
        Google,
    },
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
.m-block{
    background-color: #fff;
    border-radius: 6px;
    padding: @space;
    margin-top: @space;

    .u-list{
        padding:0;
        margin:0;
    }

}
// 为空
.m-archive-null {
    margin-top: 10px;
}

// 加载更多
.m-archive-more {
    .mb(10px);
    .w(100%);
    .none;
}
.m-archive-more.show {
    .db;
}

// 分页
.m-archive-pages {
    overflow-x: auto;
}
</style>

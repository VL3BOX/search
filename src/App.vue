<template>
    <div id="app">
        <header>
            <Top />
            <Search/>
        </header>
        <main :class="{notNull:notNull}">
            <!-- <Wiki/> -->
            <Post />
            <Author />
            <Google />
        </main>
        <footer>
            <!-- <Bottom /> -->
        </footer>
    </div>
</template>

<script>
import Top from "@/components/Top.vue";
// import Bottom from "@/components/Bottom.vue";
import Search from "@/components/Search.vue";
import Wiki from "@/components/Wiki.vue";
import Post from "@/components/Post.vue";
import Author from "@/components/Author.vue";
import Google from "@/components/Google.vue";


export default {
    name: "App",
    data: function() {
        return {
            
        };
    },
    computed: {
        notNull : function (){
            return !!this.$store.state.q.trim()
        }
    },
    methods: {},
    mounted: function() {},
    components: {
        Top,
        // Bottom,
        Search,
        // Wiki,
        Post,
        Author,
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
main{
    display:none;
    &.notNull{
        display: block;
    }
}
</style>

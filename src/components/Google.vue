<template>
    <div class="m-google" :style="{height:H + 'px'}">
        <iframe :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Google",
    props: ["q"],
    data : function (){
        return {
            H : 100
        }
    },
    computed : {
        url : function (){
            return './google_proxy.html?q=' + this.q
            //https://cse.google.com/cse?cx=011450975203877314992:itycvatvhcp&q=
        }
    },
    methods: {
    },
    mounted : function (){
        window.addEventListener('message',(e)=>{
            this.$nextTick().then(()=>{
                this.H = e.data + 50;
            });
        })
    }
};
</script> 

<style lang="less">
@import "../assets/css/var.less";
//搜索结果
.m-google {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    margin-top: 20px;

    iframe{
        width:100%;
        height:100%;
    }

    height:100px;
}
</style>

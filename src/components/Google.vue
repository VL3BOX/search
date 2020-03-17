<template>
    <div class="m-google" :style="{height:H + 'px'}">
        <el-alert v-if="!q && isfirst" title="国内用户无梯子将无法使用本功能，请知晓" type="warning" show-icon></el-alert>
        <iframe v-show="q && !vpnerror" :src="url" frameborder="0"></iframe>
        <el-alert v-show="vpnerror" title="你的梯子出现故障啦，无法连接到谷妈~" type="error" show-icon></el-alert>
    </div>
</template>

<script>
export default {
    name: "Google",
    props: ["q"],
    data : function (){
        return {
            H : 37,
            vpnerror : false,
            isfirst : true  //仅显示一次
        }
    },
    computed : {
        url : function (){
            return this.q ? './google_proxy.html?q=' + this.q : ''
            //https://cse.google.com/cse?cx=011450975203877314992:itycvatvhcp&q=
        }
    },
    mounted : function (){
        window.addEventListener('message',(e)=>{
            console.log(e);
            e.data.code ?
            this.$nextTick().then(()=>{
                this.H = e.data.H;
            }) :
            this.vpnerror = true

            this.isfirst = false
        });
    }
};
</script> 

<style lang="less">
//搜索结果
.m-google {
    background-color: #fff;
    border-radius: 6px;
    padding: @space;
    margin-top: @space;

    iframe{
        width:100%;
        height:100%;
    }
}
</style>

// 第三方UI组件
import Vue from "vue";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
// import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
// Vue.use(JX3BOX_UI);

const JX3BOX = require("@jx3box/jx3box-common/js/jx3box");
import store from "./store";
import App from "./App.vue";
new Vue({
    store,
    render: (h) => h(App),
    data: { JX3BOX },
}).$mount("#app");

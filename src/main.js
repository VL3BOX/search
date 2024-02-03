// 第三方UI组件
import Vue from "vue";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
Vue.use(ElementUI);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import i18n from "@jx3box/jx3box-common/i18n";

// 通用UI模块
// import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
// Vue.use(JX3BOX_UI);

import store from "./store";
import App from "./App.vue";
new Vue({
    i18n,
    store,
    render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import ElementUI from 'element-ui';
import echarts from "echarts";
import "normalize.css";
import "./assets/css/common.less";
import "./assets/css/public.less"
import axios from 'axios';
import isUtils from './utils/data_processing';
import eventBus from "./eventBus";
import lodash from "lodash"
import 'lib-flexible'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(echarts);

//移动端时间选择插件

/**
 * axios 配置, 超时时间为30s
 */
const $axios = axios.create({
  timeout: 30000,
});
Vue.prototype._ = lodash;
Vue.prototype.$axios = $axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$utils = new isUtils;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

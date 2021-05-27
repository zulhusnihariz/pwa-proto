import Vue from "vue";
import axios from "axios";
import VueQrcodeReader from "vue-qrcode-reader";
import router from "../router/router";

Vue.use(VueQrcodeReader);
Vue.use(router);

Vue.prototype.$axios = axios;

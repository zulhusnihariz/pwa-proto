import Vue from "vue";
import axios from "axios";
import firebase from "firebase";
import "firebase/auth";
import store from "../store/";
import VueQrcodeReader from "vue-qrcode-reader";

const firebaseConfig = {
  apiKey: "AIzaSyB_wCZ-zfyTqnpx07fsN4iFtNnCLOBPgrg",
  authDomain: "qpwa-dba28.firebaseapp.com",
  projectId: "qpwa-dba28",
  storageBucket: "qpwa-dba28.appspot.com",
  messagingSenderId: "792097141349",
  appId: "1:792097141349:web:7b79cbfa5ec508375d8c8c"
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueQrcodeReader);
// Vue.use(router);

Vue.use(store);

Vue.prototype.$axios = axios;

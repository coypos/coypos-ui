import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "./axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

console.log(process.env.VUE_APP_API_URL);
createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(axios, {
    baseUrl: process.env.VUE_APP_API_URL || "http://localhost:5016",
  })
  .mount("#app");

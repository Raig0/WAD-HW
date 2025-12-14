import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import axios from "axios";

const token = localStorage.getItem("token");
if (token) {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

createApp(App).use(store).use(router).mount("#app");

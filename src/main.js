import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./style/public.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useThemeStore } from "./store/theme";
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
const themeStore = useThemeStore();

themeStore.initTheme();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

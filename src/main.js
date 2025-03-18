import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);


import "./style/public.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {useThemeStore} from "./store/theme";
import 'element-plus/theme-chalk/dark/css-vars.css'

app.use(pinia);
app.use(ElementPlus);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const themeStore = useThemeStore();
themeStore.initTheme();

app.mount("#app");

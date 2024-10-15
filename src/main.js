import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import store from "./store";

const vuetify = createVuetify();
const app = createApp(App);
app.use(vuetify);
app.use(store);
app.mount("#app");

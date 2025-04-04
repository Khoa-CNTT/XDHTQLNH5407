import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import Default from "./layout/admin/index.vue";
// import Default from "./layout/client/index.vue";
// import Admin from "./layout/admin/index.vue";

const app = createApp(App);

app.use(router);
app.component("default-layout", Default);
// app.component("admin-layout", Admin);

app.mount("#app");

import { createApp } from "vue";
import twemoji from "twemoji";
import App from "./App.vue";

import "./modules/tweet";
import "./modules/disqus-comments";

import "./assets/css/app.scss";

createApp(App).mount("#blog-vue-app");

twemoji.parse(document.body, {
  ext: ".svg"
});

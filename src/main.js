import { createApp } from "vue";
import twemoji from "twemoji";
import App from "./App.vue";
import "./modules/tweet";

import "./assets/css/design-system.scss";
import "./assets/css/jekyll-components/avatar-hero.scss";
import "./assets/css/jekyll-components/header.scss";
import "./assets/css/jekyll-components/footer.scss";
import "./assets/css/vendor/twemoji.scss";

createApp(App).mount("#blog-vue-app");

twemoji.parse(document.body);

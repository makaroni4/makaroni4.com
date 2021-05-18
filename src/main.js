import { createApp } from "vue";
import twemoji from "twemoji";
import App from "./App.vue";

import "./modules/tweet";
import "./modules/disqus-comments";

import "./assets/css/design-system.scss";

import "./assets/css/jekyll-components/btn.scss";
import "./assets/css/jekyll-components/avatar-hero.scss";
import "./assets/css/jekyll-components/header.scss";
import "./assets/css/jekyll-components/footer.scss";
import "./assets/css/jekyll-components/post-list.scss";
import "./assets/css/jekyll-components/project-list.scss";
import "./assets/css/jekyll-components/project.scss";
import "./assets/css/jekyll-components/projects-page.scss";
import "./assets/css/jekyll-components/article-page.scss";
import "./assets/css/jekyll-components/article-info.scss";
import "./assets/css/jekyll-components/article-footer.scss";
import "./assets/css/jekyll-components/share-on-twitter.scss";
import "./assets/css/jekyll-components/sql-habit-banner.scss";
import "./assets/css/jekyll-components/small-review.scss";
import "./assets/css/jekyll-components/articles-page.scss";
import "./assets/css/jekyll-components/index-page.scss";

import "./assets/css/vendor/twemoji.scss";
import "./assets/css/vendor/code-highlight.scss";

createApp(App).mount("#blog-vue-app");

twemoji.parse(document.body);

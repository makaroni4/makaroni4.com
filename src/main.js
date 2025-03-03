import { createApp } from 'vue';
import App from './App.vue';
import twemoji from 'twemoji';

import './controllers/mobile-header';

import './modules/tweet';
import './modules/disqus-comments';

import './assets/css/app.scss';

// Create the Vue application
const app = createApp(App);

// Mount the app
app.mount('#app');

// Apply twemoji after app mounting
twemoji.parse(document.body, {
  folder: 'svg',
  ext: '.svg',
});

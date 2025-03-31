import twemoji from 'twemoji';

import './controllers/mobile-header';

import './modules/tweet';
import './modules/disqus-comments';

import './assets/css/app.scss';

twemoji.parse(document.body, {
  folder: 'svg',
  ext: '.svg',
});

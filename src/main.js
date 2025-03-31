import twemoji from 'twemoji';

import './controllers/mobile-header';

import './modules/tweet';
import './modules/disqus-comments';

import './assets/css/app.scss';

// Apply twemoji after app mounting
twemoji.parse(document.body, {
  folder: 'svg',
  ext: '.svg',
});

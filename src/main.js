import twemoji from 'twemoji';

import './controllers/mobile-header';

import './modules/tweet';
import './modules/disqus-comments';

import './assets/css/app.scss';

// Since we can't set makaroni4.com/focused-youtube as  an extension URL in Chrome Store, let's check if a visitor is coming from Chrome Web Store and redirect to Focused YouTube page:
if (document.referrer.includes('chromewebstore.google.com')) {
  window.location.href = '/focused-youtube';
}

twemoji.parse(document.body, {
  folder: 'svg',
  ext: '.svg',
});

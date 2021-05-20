(function () {
  const $articlePage = document.querySelector('.article-page');

  if (!$articlePage) {
    return;
  }

  const $viewCommentsLink = $articlePage.querySelector('.js-show-disqus-comments');
  const $commentsSection = $articlePage.querySelector('.article-page__comments');

  $viewCommentsLink.addEventListener('click', (e) => {
    e.preventDefault();

    $viewCommentsLink.classList.add('article-footer__show-comments--hidden');
    $commentsSection.classList.add('article-page__comments--active');

    (function () { // DON'T EDIT BELOW THIS LINE
      const d = document; const
        s = d.createElement('script');
      s.src = 'https://makaroni4.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }());
  });
}());

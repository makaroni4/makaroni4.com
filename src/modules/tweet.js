document.addEventListener('click', (e) => {
  const tweetButton = e.target && e.target.closest('.js-tweet');

  if (!tweetButton) {
    return;
  }

  e.preventDefault();

  const width = 575;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const opts = `width=${width
  } ,height=${height
  } ,top=${top
  } ,left=${left}`;

  let tweet = document.title;
  const maxLength = 140 - (window.location.href.length + 1);

  if (tweet.length > maxLength) {
    tweet = `${tweet.substr(0, (maxLength - 3))}...`;
  }

  const twitterLink = `http://twitter.com/home?status=${
    encodeURIComponent(`${tweet} ${window.location.href}`)}`;

  window.open(twitterLink, 'twitter', opts);
});

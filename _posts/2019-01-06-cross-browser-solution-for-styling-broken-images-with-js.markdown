---
layout: article_page
title:  "Cross browser solution for styling broken images"
description: "Let's explore Vanilla JS cross browser solution for styling broken images."
date: 2019-01-06
start_emoji: 🖼
finish_emoji: 🔨
published: true
---

You may have seen some web pages with broken images. It diminishes website trustworthiness and it just looks bad. Let's explore some solutions to broken images and have a reliable fallback in all browsers.

<!--more-->

## Intro

This is how our problem looks like. Note that this line of copy (next to the image icon) comes from the `alt` property of the `<img>` tag.

<p data-height="300" data-theme-id="0" data-slug-hash="WLzgpN" data-default-tab="html,result" data-user="makaroni4" data-pen-title="WLzgpN" class="codepen">See the Pen <a href="https://codepen.io/makaroni4/pen/WLzgpN/">WLzgpN</a> by Anatoli (<a href="https://codepen.io/makaroni4">@makaroni4</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Common solution

The most popular solution atm is to use `:before/:after` pseudo elements. Idea is that we position pseudo element absolutely over the image and fill it with color/gradient. Here's a CSS snippet:

```scss
.img {
  /* Otherwise pseudo element will fill
  in the whole page (because of width: 100%) */
  position: relative;
}

&:before {
  width: 100%; /* Make sure we fill in the whole image area */
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  /* We want to center copy from alt tag horizontally & vertically */
  align-items: center;
  justify-content: center;

  /* Nice gradient from https://cssgradient.io */
  background: linear-gradient(to right, #fa709a 0%, #fee140 100%);

  color: #FFF;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;

  /* Cool trick: we're using CSS attr() function to retrieve alt property copy */
  content: attr(alt);
}
```

This is a live example of this approach:

<p data-height="300" data-theme-id="0" data-slug-hash="maxQem" data-default-tab="result" data-user="makaroni4" data-pen-title="Broken image styling with :before pseudo element" class="codepen">See the Pen <a href="https://codepen.io/makaroni4/pen/maxQem/">Broken image styling with :before pseudo element</a> by Anatoli (<a href="https://codepen.io/makaroni4">@makaroni4</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

It's very elegant, CSS-only. It has a major drawback though – it doesn't work in Safari (neither on desktop nor on mobile) :warning: For example, this blog has about 30% of visits from Safari. It is simply unacceptable.

## JS solution

It's quite hard to think of a pure CSS solution which would be 100% cross browser. Let's use `onerror` event handler which is [supported by all browsers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Browser_compatibility). We'll simply replace broken image tag with a div of the same size, fill it with gradient and use `alt` tag's content. IMO it's the best way because it keeps our `<img>` tags untouched (so we don't need to extra markup manually). Here's a JS snippet with the solution:

```js
document.querySelector(".img").onerror = function() {
  const img = this;

  img.style.display = "none";

  const imgFallback = document.createElement("div");
  imgFallback.className = "img-fallback";
  imgFallback.innerHTML = img.alt;
  imgFallback.style.width = img.width ? img.width + "px" : "300px";
  imgFallback.style.height = img.height ? img.height + "px" : "300px";

  img.parentNode.insertBefore(imgFallback, img.nextSibling);
}
```

Here it is in action:

<p data-height="300" data-theme-id="0" data-slug-hash="ZVxmOZ" data-default-tab="result" data-user="makaroni4" data-pen-title="Styling broken image with JS" class="codepen">See the Pen <a href="https://codepen.io/makaroni4/pen/ZVxmOZ/">Styling broken image with JS</a> by Anatoli (<a href="https://codepen.io/makaroni4">@makaroni4</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Note, that we still use some CSS to style a fallback `<div>` block (we gave it a class `img-fallback`):

```css
.img-fallback {
  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);

  color: #FFF;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;
}
```

Let's sum up. We have ~20 LOC no-external-dependencies solution to keep your website free from broken images. Not so bad, right? :beers:

P.S. If you know a better way to handle broken images – let everyone know in comments.

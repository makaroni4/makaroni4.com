---
layout: article_page
title: "Making a serverless incremental counter for a static webpage via Firebase"
description: "Let's explore the way of shipping a static page with some dynamic content that is synced between all users via Firebase."
date: 2018-12-18
published: true
start_emoji: 💪
finish_emoji: ⏱
related_posts: ["/2017/07/10/guitar-bro/", "/2018/06/22/img-lint/"]
permalink: rad-workout
---

Say, you've made a little browser app, in our case it'll be a workout app. It's just a static web page hosted on Github pages. Now we want to show the number of workouts completed. As the title suggests, we don't need to set up a server ourselves to make it happen.

<!--more-->

## Intro

Note a workouts counter below the "Start workout" button:

<figure>
  <img src="/images/posts/firebase_counter/rad_workout_app_snapshot.jpg" width="600px" />
  <figcaption>It's called <a href="https://makaroni4.github.io/rad-workout-app/#/">RAD workout app</a> (Reactive Agility Drill)</figcaption>
</figure>

We want to increment the counter every time someone clicks on it.

## Firebase

[Firebase](https://firebase.google.com/) is a database platform from Google designed to power all your apps – iOS, Android, Web and more. So you can focus on development the app and not managing the database. Firebase has tons of products (different types of databases, ML and A/B-testing kits), but we'll focus on Firebase Realtime Database – cloud-hosted NoSQL DB. It's free up to 1Gb storage and 100 simultaneous connections, exactly what we need to implement a simple counter for our serverless browser application.

<p data-height="661" data-theme-id="dark" data-slug-hash="jXyRYb" data-default-tab="js,result" data-user="makaroni4" data-pen-title="Incremental counter via Firebase" class="codepen">See the Pen <a href="https://codepen.io/makaroni4/pen/jXyRYb/">Incremental counter via Firebase</a> by Anatoli (<a href="https://codepen.io/makaroni4">@makaroni4</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<figure>
  <img src="/images/posts/firebase_counter/realtime_db_data.png" width="600px" />
  <figcaption>This is how data looks like in the UI of Realtime Database</figcaption>
</figure>

See how simple it is? We just loaded Firebase from Google CDN, initialized our DB and we're ready to read and write from the database. Wait a second, read and write from the database? What about security? Out of the box there's a read & write permission for every user to your Realtime Database. Scary, right? Let's see how we can configure the access:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "incremental_counter": {
      ".validate": "newData.isNumber() && newData.val() === data.val() + 1",
      ".read": true,
      ".write": true
    }
  }
}
```

The config is a JSON file with 3 keys to descrube security rules: `.read`, `.write` and `.validate`. We'll enable access only to the key where we store our counter (`incremental_counter`). To allow only increments of one we can write plain JS and use some predefined variables (`newData` – the value we're about to write, `data` – old value [etc](https://firebase.google.com/docs/database/security/securing-data)).

With such validations we can easily make a "backend" for many applications: voting, polls and quizzes, NPS scores and so on. As for our workout app: check out the final implementation with Vue.js at [https://makaroni4.github.io/rad-workout-app/#/](https://makaroni4.github.io/rad-workout-app/#/). One detail you might like – the value of the animated and counted up from 0 to the value.

I hope it was a useful read for you, just in case you were looking for the full source of the Vue app – here's a [Github repo](https://github.com/makaroni4/rad-workout-app). Cheers! 🍻

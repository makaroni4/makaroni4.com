---
layout: post
title: "Making a serverless incremental counter for a static webpage via Firebase"
date: 2018-12-18
published: true
---

Say, you've made a little browser app, in our case it'll be a workout app. It's just a static web page hosted on Github pages. Now we want to show the number of workouts completed. As the title suggests, we don't need to set up a server ourselves to make it happen.

<!--more-->

## Intro

Here's our workout browser app, note a workouts counter below the "Start workout" button:

<figure>
  <img src="/images/posts/firebase_counter/rad_workout_app_snapshot.jpg" width="600px" />
  <figcaption>It's called <a href="https://makaroni4.github.io/rad-workout-app/#/">RAD workout app</a> (Reactive Agility Drill)</figcaption>
</figure>

We want to increment the counter every time someone clicks on it.

## Firebase

[Firebase](https://firebase.google.com/) is a database platform from Google designed to power all your apps – iOS, Android, Web and more. So you can focus on development the app and not managing the database. Firebase has tons of products (different types of databases, ML and A/B-testing kits), but we'll focus our attention on Firebase Realtime Database – cloud-hosted NoSQL DB. It's free up to 1Gb storage and 100 simultaneous connections, exactly what we need to implement a simple counter for our serverless browser application.

<p data-height="661" data-theme-id="dark" data-slug-hash="jXyRYb" data-default-tab="js,result" data-user="makaroni4" data-pen-title="Incremental counter via Firebase" class="codepen">See the Pen <a href="https://codepen.io/makaroni4/pen/jXyRYb/">Incremental counter via Firebase</a> by Anatoli (<a href="https://codepen.io/makaroni4">@makaroni4</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

See how simple it is? We just loaded Firebase from Google CDN, initialized our DB and we're ready to read and write from the database. Wait a second, read and write from the database? What about security? Out of the box there's a read & write permission for every user to your Realtime Database, but one can easily configure access and make it as sophisticated as needed.

<figure>
  <img src="/images/posts/firebase_counter/realtime_db_data.png" width="600px" />
  <figcaption>This is how data looks like in the UI of Realtime Database</figcaption>
</figure>

Let's look at the security config of our incremental counter:

<script src="https://gist.github.com/makaroni4/11977820558ea9e93d6bc99f944d4b88.js"></script>

As you can see it's just a JSON file. There are 3 keys to configure security: `.read`, `.write` and `.validate`. We store our counter in `incremental_counter` key of the DB, so let's define a special security rules for it. We'll allow everyone to read the data by setting `.read` to `true`. There are many approaches on how to secure writing here: we may want only 1 increment per user (as in voting), we probably want increments of 1 at a time etc. In the config above you see the basic validation – that our new value is a number and it equals to the current value plus one. Simple, right? Here's an [intro to Firebase security](https://firebase.google.com/docs/database/security/quickstart) and more [advanced settings](https://firebase.google.com/docs/database/security/securing-data).

As you can see with such validations we can easily make a "backend" for many applications: voting, polls and quizzes, NPS scores and so on. As for our workout app: check out the final implementation with Vue.js at [https://makaroni4.github.io/rad-workout-app/#/](https://makaroni4.github.io/rad-workout-app/#/), where counter is wrapped into a Vue component and the number is animated.

I hope it was a useful read for you, just in case you were looking for the full source of the Vue app – here's a [Github repo](https://github.com/makaroni4/rad-workout-app). Cheers! :beers:

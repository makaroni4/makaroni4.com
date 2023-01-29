---
layout: article_page
title:  "Brute-forcing password of a COVID test PDF with Ruby"
description: "Learn how to use basic combinatorics methods in Ruby to brute-force passwords"
date: 2021-12-07
published: false
start_emoji: 🦠
finish_emoji: 🤖
published: false
permalink: brute-forcing-password-of-a-covid-test-pdf-with-ruby
---

It really happened. After a long time working from home I wanted to visit Blinkist HQ and see my dear teammates in real life. On my way to the office I stopped for a quick COVID test just to be sure we all will have a safe day at the office and can hug each other. :heart:

<!--more-->

Usually, a test center sends a PDF with your result after ~20min, exactly the time I need to get to the office. It's 9AM, I just made it to our front door and the email with PDF arrived. I was so excited to meet everyone! There was a tiny problem though – a PDF file was password protected and I had no clue what the password was.

A test center's website had no phone, neither had Google Maps. I called a friend who recommended me this test center and she said that a password must be some combination of my birthday digits, but she doesn't remember exactly which combination.

"Feb, 7, 1989"? "2-7-89"? "1989-2-7"? "02/07/89"? There're so many! 🙀

## Combinatorics with Ruby

I was desperate to get into the office that day. 😤 I started a timer and in the best traditions of hacker movies started writing a script to crack the password.

I knew I had to get all the possible combinations (or permutations? 🤔) of my bday digits (hello, [Combinatorics](https://en.wikipedia.org/wiki/Combinatorics)👋).

**Combination** is a selection of items where order does not matter (for example, `["2", "7"]`).

**Permutation** is a selection where order does not matter (`["2", "7"]` and `["7", "2"]` are different permutatoins).

Anyways, Ruby supports both out of the both [Array#combination](https://ruby-doc.org/core-3.0.3/Array.html#method-i-combination) and [Array#permutation](https://ruby-doc.org/core-3.0.3/Array.html#method-i-permutation).

```ruby
["07", "02", "1989"].combination(2).to_a
# [["07", "02"], ["07", "1989"], ["02", "1989"]]

["07", "02", "1989"].permutation(2).to_a
# [["07", "02"], ["07", "1989"], ["02", "07"], ["02", "1989"], ["1989", "07"], ["1989", "02"]]
```

## Generating all possible passwords

My plan was to generate all possible **permutations** of my bday digits, then join them in all possible ways to form passwords like **02.07.1989**, **7-2-89**, **2/7/89**, **02071989**, etc.

```ruby
BDAY_DIGITS =
```

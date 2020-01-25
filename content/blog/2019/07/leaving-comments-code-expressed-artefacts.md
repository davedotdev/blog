---
title: "Leaving Comments in Code Expressed Artefacts"
date: 2019-07-01T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Leaving Comments in Code Expressed Artefacts"
signoff: Dave
categories:
- Development
tags:
- Developer
---

Week of 24th June 2019 was interesting. We had #ferrogate which made a lot of network engineers very unhappy and also an ongoing social media thread on code comments. For this discussion, I’m going with the title of "leaving comments in code expressed artefacts" because code represents more than writing software. I feel quite passionately about this having been on the raw end of no code comments and also being guilty of leaving plenty of crappy and unhelpful comments too.

#### The Mystic Arts

Let’s set a scene. You’ve had a long day and you’re buckled in for what can only be described as a mentally exhausting night. The system architecture is clearly formed in your head and you’re beginning to see issues ahead of time. You can’t quite justify any premature optimisation, but you know this current design has a ceiling. You also know there are system wide intricacies that are not obvious at the component level.

Normality in these scenarios is to insert context based comments, which make perfect sense at 2am, but next day 9am exhausted you may be confused as to what on earth happened in the early hours. We’ve all been there.

There are multiple trains of thought for this subjective topic:

* Leave meaningful comments to help other people or future versions of you unpick the mental spaghetti
* Create documentation for the design and link back in code
* Write comment-less code
  
Simple blobs of code one would argue do not need line-by-line explanations, but what about a factory function? What if you write a scheduler or pipeline code that deals with creating and setting up parts of an intricate set of concurrent operations? Cognitive load is a real issue. Everyone’s ability to do this is different and it’s dangerous to either assume everyone can do it or put yourself in the picture as a hero.

Leaving links in your code to a design is a great idea barring the obvious issue of not having a design. This might be a tipping point for your organisation. Moving fast and light is great, but without a design, how do you know where you’re going? If you’re laughing whilst reading this and out-loud asking the obvious question, it’s true! Many projects lack a formal design. I treat designs as living documents. They change with lessons learnt and can become highly valued artefacts. I can assure you as the industry dances with Microservice patterns, designs will become more important.

Meaningful comments are those that contain a set of mental steps to help build a cognitive state. A better way would to describe what Mars looks like then leaving enough telescope setup tips so a reader can see and recognise it. Meaningful comments can be formed from multiple lines and also contain internal and external links.

#### Close

As with everything in IT, this is subjective and leaving comments depends on many factors. My preference is to provide a tour guide manual or script for whatever it is you are building. If you build complex workflows in automation, this information still stands. Code can represent mechanical states, software imperatives and communication methodologies. The things we humans build are formed in a part of us that scientists themselves don’t fully understand. Your brain’s view is unique to you and anything you can do to help someone else view the world through your eyes, especially regarding complex systems, will be greatly received. It can be the difference between success and failure.

This post is a set of my views and as always, I welcome discussion and engagement. Thanks for reading.
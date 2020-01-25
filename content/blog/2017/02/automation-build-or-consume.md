---
title: "Automation: Build or Consume?"
date: 2017-02-04T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation: Build or Consume?"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

![Fry Build](/images/blog/fry_build.jpg#center)

The question of “home grown vs. off the shelf” comes up a lot. It comes up both in a professional capacity and social.

Home grown, usually born out of frustration to solve an immediate problem, often is a path that leads to consuming something off the shelf either Open Source or commercial. Home grown can deliver rapid results for simple things but has an exponential learning growth curve to do something more complex.

Why learn the oddities and nuances of a full programming language to write a multi-threaded application that automates concurrently, when you can write simple instructions that makes something else takes care of all of that mucking about in parallelism, logging and worrying about covering every use case. If you like hacking and building things, is it not better to apply that yearning solving rapidly rewarded challenges or to work on building something that starts off fragile and like all babies, has to learn to crawl, walk and be weened off milk?

Good tools deal with things like input, decision making and invoking output. It’s always better to control the pipeline and write linkages than to build the whole thing. After all, the problem with software is, you write something and people use it. Solve the problems you have to and take the reward for it instead of trying to create another small or wider version of a wheel.

Most networking (and if not all) automation problems can be distilled down to the following:

(All of the below is a block which can be invoked in individual time/space. If two sets of inputs happen at the same time, neither should interfere or block each other)

1. Input
2. Normalising input
3. Making a decision on the input on what to do
4. Do the thing using the input
5. Do something based in the outcome of the doing the thing (pass/fail)
6. Log it all

You really want to build this? What if there is a community? The ability to consume what other people have wrote? Sharing ideas? Best practices? You really really want to build this and ignore all the time savings and sharing of expertise?

The aim with anything like this is to define what input to expect, create the decision logic and define the action based on input. These things might be YAML scripts, Python scripts (which are handled by this pipeline, no need to worry about parallelism) or even other applications.

Why might you want to build something? A constrained system or specific challenge or customer (think government etc) might remove any choice to consume. Memory constrained? A script that’s triggered via a cron job might suite the purpose perfectly. This post isn’t to steer you actively away from building, it’s a thought provoker in terms of why you might do either.

Remember, whatever you choose to do, do it the [Unix Way](https://en.wikipedia.org/wiki/Unix_philosophy). Simple, re-usable and flowing.

Someone once said, just because you can, doesn’t mean you should. Fun wasn’t mentioned however, so if you want to build it, go ahead! You might come to appreciate platforms that exist if you don’t already!
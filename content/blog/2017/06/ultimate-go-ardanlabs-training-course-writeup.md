---
title: "Ultimate Go, Ardanlabs, Training Course Writeup"
date: 2017-06-03T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Ultimate Go, Ardanlabs, Training Course Writeup"
signoff: Dave
categories:
- Go
tags:
- Go
---

![Bill and Dave](/images/blog/bill_and_dave.jpg#center)

After being in the IT industry for a while, courses generally don’t impress or engage you for very long. If it’s something you’re interested in, you stand a better chance of hanging on in there, but even then, someone talking at you is always difficult. Those that attend conferences regularly will appreciate the shift to ‘brown bag’ lightening talks where a nervous energy fuelled speaker delivers the interesting snippets of a topic with the knowledge to guide question asking talk goers to the right info if they have beyond surface level curiosity.

Therefore, many of us don’t attend classroom based training anymore. Short webinars and self-lead courses are generally the way forward for those of us not in college or university. I need to add here, technology itself is changing too. Gone are the days where Microsoft, Oracle and Cisco lead the world. Sorry folks, they truly are gone. Technology now is ‘passing through’. I have a transformed view of technology akin to cattle herding; rope it, guide it to the right place to feed, then shoot it, eat it and make some handbags. Technology is more and more transient. It’s not about being an expert, it’s about the techniques of being a cattle herder.

All of that said, with AI, automation, RPI and other crappy buzz phrases like IoT and IoE, I find myself looking back at my roots in embedded engineering; build the black box, write software and firmware for the black box and keep it alive in the field. This context requires tools and with the networking industry beginning to leave sleepy hollow, client integration, automation and programmability is key (took long enough to catch-up!). It shouldn’t be any surprise that network engineers, both veterans and new comers want to learn Python and automation tooling. It’s the first step forward towards this flexible and programmable world we find ourselves in. Trends always happen and Python it seems is still the lightening rod that most people are heading towards. It’s a bit better than BASIC and wielded correctly, is very flexible. However, I wouldn’t classify it as the right language for absolute control, high performance, readability or even simplicity. Python can be VERY verbose and the concurrency aspects are enough to break you to insanity. I will make it clear, I do not hate Python. I hate very little in life (1. mushrooms, 2. squidgy sea food) but there are requirements for specific types of programming languages in different situations. Also, I need to add, I’m not one of those people that can retain endless amounts of information. I tend to pick things that satisfy my requirements, then ditch them when they’re no longer suitable. For a short while I have got behind Python for my day to day goings on, but it lacked attributes that I adore C for. Also, with Python, on larger more complex projects, I don’t know if I’m making a Duck speak, or a car that ran over the Duck. Python isn’t going anywhere and I need to level up with a strongly typed language for building services.

#### Golang….get on with it

Despite studying and learning go for a few months, [Matt Oswalt](https://github.com/Mierdin) showed me the light when we were on the Shinkansen in Japan 2015. Through the early version of [ToDD](https://github.com/toddproject/todd), I saw something of beauty in the language and figured this was the level up I’d been looking for. I wasn’t wrong.

So, I did what most people do. Build some stuff! To start with I handled Go just like C. Whilst the apps worked, I didn’t take advantage of any Go idioms, nor compiler cleverness. Round two, I used Channels, Go Routines, and went concurrency mad. It was great! Everything was spawned into Goroutines and signalled via Channels! Boo yah!

Eventually, realising this was also foolish, I wound back the complexity and started looking at more simple approaches. Looking at subtle consumption of the Go features to get my code to where it needs to be. I realised I had a gap in my knowledge and figured it was about time I attended a classroom based training session to get that knowledge. It wasn’t that I couldn’t build relliable code, it was I didn’t know what the most minimal code was to achieve my requirements. A big difference.

[This](http://ipengineer.net/2017/04/developing-software-the-right-way-with-intent-and-carefulness/) blog article was inspired after Tweeting with [Bill Kennedy (Ardanlabs)](https://twitter.com/goinggodotnet), who also happened to be one of the delivery tutors for the [Ultimate Go](https://www.ardanlabs.com/ultimate-go) course. Was this fate? When the opportunity presented itself to attend the Ultimate Go, I couldn’t resist. Previously having read Ardanlabs originated blog articles, Tweets and hearing things from colleagues and friends, the arrangements were made at hurricane speed.

Writing this very article, I’m sitting in Starbucks at Schiphol airport in the Netherlands having just finished day three of the Ultimate Go course. I’m exhausted, mentally beaten up and overloaded with thoughts. I need time to allow those thoughts to bed in and validate through prototyping concepts that I didn’t grasp 100%. The course has flown by and was one of thee best training experiences I’ve ever had. This article is a brain dump but it might help you if you’re in a similar position.

Switching back to objective mode, here’s a breakdown of what those three days looked like.

#### Three day 

Bill made an instant impression and got things off to a flying start on day one. The attendees wanted to be there and even background conversation during breaks and lunch was about Golang. Day one was mostly about Types and the ground rules. Ground rules which are seriously important. These ground rules paved the way for the three and brought an immense amount of clarity. With every hour, people in the room were looking through their own code muttering about how the most fundamental of rules were broken. This included me. Statements like “less is more” and “type is life” hit home. It needs to be said, this was not a beginner course. If you don’t know the syntax and basic semantics, you’re going to struggle. It was pretty apparent that everyone in the room had Go experience and the questions backed that up. Once the ground rules were in place, Bill also made seemingly simple work of explaining how Go deals with the heap, stacks, processes and the scheduler. It was staggering with determinism to predict how our simple example code was going to work and why. Occasionally glancing around the room, I could see lots of the attendees, again including myself, writing simple functions to test our learning. Why has this stack grown? Did this variable escape to the heap? What is the garbage collector doing? These thoughts you can pretty much discard when working with languages like Python, Java and .Net, but with Go, to really tweak its behaviour, understanding this stuff is key.

Again, and again, myths were dispelled and challenges were thrown out to the room. The pattern was a true challenge. Show some code, ask for opinion then walk through it in immense detail. This went from the simplest exercises to the most complex. Bill’s philosophies of behaviour and writing code for correctness drove the whole three days. Write for correctness, readability and behaviour and your code transforms in to amazingly simple blobs instead of cross wired complex arrangements. This isn’t to be misunderstood with not doing clever things, but be clever and write readable code that’s engineered to be solid instead of by luck.

The ground rules and basics were hammered home on day one. Concurrency, more on the inner workings of Go and some patterns were dealt with on day two, along with packaging approaches which were excellent. This left some more concurrency subjects, profiling, tracing and benchmarking for day three. I’ve never heard so many experienced developers with outbursts of “Whoaaaaa!!!” in one session. Other than working in the embedded world, I have never measured, benchmarked or traced to the level that was explored on this course. Want to know how to optimise? You must find the right place first and the thing is, it’s never where you expect it to be. The simple design rule of “do not optimise beyond your point of constraint” is something I preach and practice, but it’s clear to see, I’ve optimised in places I shouldn’t have previously. Print statements just do not cut it. They only present Heisenbug problems! Especially when you involve the Goscheduler. Less is more and simple changes lead to drastic improvements in performance, that in its left alone state would leave Python spinning in dust. It was engineering at its best to see the tools and methods available to the Go community.

Most of the people in the room were comfortable with Python and had intermediate to advanced Go experience. During the breaks, conversations rotated around the language, penny dropping thoughts and being in awe of what they were seeing. This is a testament to three things: Bill Kennedy, [the material](https://github.com/ardanlabs/gotraining/tree/master/topics/go) developed by Ardanlabs (which includes Bill) and the Go language.

I would attend this again just to pick up on things I’ve missed and have another opportunity to ask questions in real time.

#### Summary

I’ve handled Go like a kid in a candy shop up to this point. Just because it can do something, doesn’t mean you should do it. I’ve prototyped an idea out three different ways and haven’t known what was good and bad in terms of design do and don’ts. All three worked and all three worked well. After three days, I have skills that would have taken me months to learn about on my own. Running in one Go routine in some examples worked out to be better than spinning up multiple Goroutines. I didn’t realise how powerful the Goscheduler was until this week and have a new respect for the core language team. With so many good patterns explored by Bill and the class, it’s been like having my eye balls put in a dishwasher and re-inserted.

This course is for you if:

1. You have some Go experience and a sense of wanting to build things the right way.
2. If you want to read and write efficient, behaviour driven, correct and readable code.
3. If you’re sick to death of trying to make a Duck speak only to find the Duck is on the bottom of a fender.
   
__Five lessons__

<em>Just because you can, doesn’t mean you should

Type is life

Less is more

Design for behaviour

Don’t guess about performance</em>

I’ll leave you with this final thought: After day two, I reduced one of my projects down by two thirds. It worked smoothly, without race conditions and was super readable, which for a noisy TCP/IP small service, is nothing short of amazing.

__Responsible Employer__

One of the course delegates emailed shortly after to mention that Bol.com sponsored the preparations, rooms, parking and food. In a time where employers are constantly looking at ways to cut numbers, having an employer sponsor a training session like this not only shows a commitment to the staff it employs, but also to the promotion and stewardship of the technology itself.

__Disclaimer__

This overly shining report from the course is as unbiased as possible. I am a systems architect and network developer working with Python and Go and work for a vendor. My employer funded the travel and cost of the course. Ardanlabs did not fund or provide any cash or non-cash incentive to write this post.
---
title: "Automation: Easy Button vs Sentient Voodoo Magic Button"
date: 2018-02-20T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation: Easy Button vs Sentient Voodoo Magic Button"
signoff: Dave
categories:
- Easy Button
tags:
- Easy Button
---

![tea_chaos](/images/blog/tea_chaos.jpg#center)

Automation has become this “all-encompassing thingy” much like SDN. It’s a software industry problem and it’s critical more now than ever that we do not slip backwards by trying to drag a broken idea forwards.

This post contains nothing new and should act as polish on common sense. If you’re on the look-out for removing pain and getting stuff done with the power of automation, read on.

If your processes and operating handbook for your team or organisation is in disarray, it will not come too much as a surprise when your automation team implements something inherently broken. Naturally the technology, shortly followed by the team will take a boat load of blame. Whilst artificial intelligence and machine learning is promising, unless you have a team of subject matter experts or have very deep pockets, automation today is simple and the patterns are hard wired. Even decision making logic has been should be pre-thought. Automation platforms do not today think creatively and do not possess sentient capabilities. If they did, I would be on a beach right now drinking mojitos, smoking cigars and wondering what to do with my time on this rock (the answer by the way would be activities like climbing and golf).

#### Push Them Buttons

Pressing buttons can be fun especially if it has a flashing light. A button however, can be an opinionated jerk. Once pressed, it might do the correct thing once, then spit half finished items off the end of the production line whilst at the same time claiming success and running for cabinet.

Boiling down a set of operations to be started and repeated idempotently by the same button is the result of a team designing a process and taking it through governance to ensure it will do the absolutely required tasks.

> A button represents a well thought out atomic unit of logic that has deterministic decision branching.

If your atomic unit of logic is broken, so will be your button. If you don’t know what API calls to make, the type and content of data then you’re button will be loosely comparable to a deranged and angry gorilla navigating its way through your operational stack.

Decision branching is synonymous to a decision block in a flow chart. First, you need the information to be able to answer the question. Just because we can use variables doesn’t mean we can perform arcane black magic. If you’re thinking “But we can make decisions dynamically, that makes it clever”, then go without your treat at the weekend. Converted manual processes that are technically accurate at the time of creation matched against the version of API or SDK in use, yield the best foundation for automated processes. Each automation platform offers varying levels of finesse and logic control to manifest the process. Mastery of a platform goes along way to clean and deterministic automations.

For example:

`If {{ data }} is "foo" then do X`

By the above, if data is a number and the underlying logic does not type cast the type of data to a string, because “foo” is a string, then this might actually crash your button. Your intent is misguided and lack of thought is on display here.

What is even more common:

`If {{ data }} is bar, then do something magic automation thingy because software`

This is all too real unfortunately. The lesson and closing thought is this: If you want to simplify automation operations down to fool-proof buttons, make your processes fool-proof. Once humans can operate the process without error then an automation platform stands a chance.

Once your process is proven, then it can be converted to the parlance of your chosen automation tool. Your automation tool will have integration modules to push and pull data and it will have the decision making logic capabilities required to make informed and accurate decisions.

When interacting with an API of any kind, your surface area for problems increases by magnitudes. Writing reliable code is one thing and writing integrations against someone else’s is a time problem. It might work today, but what about the next minor library update?

#### Chaos Gorilla and Using Your Credits

Let’s pretend for a second that your well honed processes are automated with these “super” buttons. The irony here is that without exercise, your team’s ability to mend things quickly diminishes as familiarity drops with the various interfaces your automation integrates against.

It’s quite well known that some organisations have ‘game days’ where a [pack of monkeys](https://github.com/Netflix/SimianArmy) is let loose on infrastructure. I’m not so sure it’s true where automation is turned off. By engaging your team to manually work through normally automated tasks, it enables technical skills to be retained and also serves to validate automated processes. Teams should not be afraid to restart or upgrade services and automation has the adverse affect of removing confidence and introducing guess work.

Automation can end with grey failures and as software moves ever forward, these kinds of game days give you an opportunity to keep your automated processes current and your team sharp.

As we engineer more reliable systems, it’s entirely normal for people to expect less downtime and the pressures of ever available systems means we get might get scared to do anything “just in case”. Normality however lends us “downtime tokens” in the form of uptime demands. If you get used to spending your “downtime tokens” you can also exercise the organisations ability to execute business-as-usual operations without feeling like everything is on fire.

Some of this might make you feel uncomfortable and this post came out of trying to assist conversations going forward specifically in bravery and organisational evolution.

Close
Whilst this post sounds awfully negative on the whole, it’s supposed to be an expectation setter. When automation is done wrong from both a skill set and technological point of view, the outcome can be disastrous. Automation when done and controlled correctly can improve the velocity of innovation and business on the whole.
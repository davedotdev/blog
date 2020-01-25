---
title: "Event-Driven Automation: The TL;DR No One Told You About"
date: 2019-01-31T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Event-Driven Automation: The TL;DR No One Told You About"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

Event-Driven automation is an umbrella term much like "coffee" (also see [here](/blog/2018/04/describing-network-automation-automate-coffee/), it turns out I’ve used coffee anecdotes way too much). How many times do you go to a popular chain and just blurt out "coffee". At 5am, it might be the nonsensical mysterious noise automagically leaving one’s mouth but once we decide it’s bean time, we get to the specifics.

There are multiple tools that give you different capabilities. Some are easier to get started with than others and some are feature rich and return high yields of capability against invested time.

Friendly dictator advice; try not to get wrapped up in the message bus used or data encapsulation methodologies. Nerdy fun, but fairly pointless when it comes to convincing anyone or organisation to make a fundamental shift.

__Event-Driven is about receiving a WebHook and annoying people on Slack__

This is a terrible measure and one we needed to have dropped yesterday. In more programming languages than I can remember, I’ve written the infamous "Hello World" and played with such variables, struct instances and objects as the infamous "foo" and the much revered "bar". Using an automation platform to receive an HTTP post and updating a support ticket or ruining someone’s day on Slack is a great 101 example for new-comers and at the same time, a terrible measure of a system.

What about pulling data from InfluxDB on a change, gRPC streaming telemetry or Git repo changes? Actions and integrations range from low and high level APIs from Kubernetes to honking a Tesla horn, so keep your mind open to your target challenges.

__What if a Human Wants to Start a Process__

Event-Driven has no bearing on this. Your process is mechanised into some domain-specific language asset which a given system executes. Event-Driven implies that this logic or process can be triggered automatically. Any system entirely closed is a bad system and you should avoid it. Every one of these systems has the event-driven part as optional and usually made operational by a rule base. No rules, no event-driven. A human can input the data by hand (if introducing errors is your thing) and trigger the mechanised process.

Event-Driven Should Have Batteries Included; If It Doesn’t, It Sucks

*TL;DR – every business, every person and every version of the same software has variance. Product completeness will never happen. Get over it*

If two people are tasked with mechanising the same source process, I’m willing to bet money that you get two marginally different mechanised processes that display the same black-box behaviour. Looking at the sheer number of processes any given organisation can have, differences will happen. We’re humans, so even the understanding of the human written source process can be different. Compare this batch of stuff against the combinations of processes across every applicable industry and we have an almost perfect storm of variance. We haven’t even touched on integrations yet. What about integrations with Terraform v0.11 versus 0.12, or VMware 5.0 vs 5.2? These are challenges most automation focussed engineers deal with every day and just have to get on with. Anyone new to this will complain about these points in a seemingly valid way and it’s mostly ignorance at play here.

1. You will have to create your own composite workflows. The same with CI-CD pipelines.
2. Integrations might have a baseline and that baseline for your variance may require shifting. Things like HTTP, gRPC and NETCONF make all the difference here. Get used to semantic versioning and learning how to release versions for your environment.
3. These challenges are what will keep your people employed and you will also save money from your software vendors because you need to take less product from them.

Every platform and tool requires that you know how to create flow-charts and create a Rosetta stone translation mechanism from your business lingo to the language of choice for your platform or tool.

__We Can’t Use Open Source__

Get yourself acquainted with software houses that can provide support contracts. They exist and will remove your roadblock. If your issue is "not built here" then good luck.

__I Don’t Know X…But__

Then you’re not qualified to ask the question you were about to. Go away, learn about your challenges and the implemented ways of solving your challenges on readily available platforms. ~~You should also do this if you’re at a conference.~~ Running snippets of code isn’t just constrained to containers or serverless and you may be surprised how some of your favourite tools work if you just look a little closer.

__EDA__
Sometimes known as EDI (…infrastructure) and it boils down to three things: input, do-logic, integrations. From this triad, we can create both open and closed-loop automations, event-driven and traditional automation amplifiers for engineer-drive automation like multi-device targeting.

Close
I’m in a weird mental phase currently. The most simple concepts in automation are decades old and yet in our industry we’re just beginning to stoke the fire. The worry of repeating failures and accidents thanks to not passing on lessons learnt is real and we can avoid them proactively for the better good. Sometimes it’s good to back over the basics so we have strong foundations. If you have a free few hours in March (2019) then also think about joining my session on [ipspace.net](https://www.ipspace.net/Building_Network_Automation_Solutions) all around getting the basics right for your automation challenge.

It might be worth checking [here](https://my.ipspace.net/bin/list?id=xNetAut181#EDA) too for pre-recorded sessions on event-driven which includes lengthy discussions on signals versus events and the fundamentals of data flows.
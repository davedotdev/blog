---
title: "To Code Or Not To Code: Expression & Symbiosis"
date: 2019-02-25T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "To Code Or Not To Code: Expression & Symbiosis"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

There is still an ongoing debate over the need for network engineers to pick up some software skills. Everything network engineers touch in more recent times has some programmatic means of control and these interfaces can be used to scale out engineer workflows or for abstract systems to drive. The bottom up view is to write scripts or use tools like Terraform or Ansible to use them. In engineer driven workflows, I see regular usage of Salt Stack as an abstraction layer over the top of a target group of devices to do very human tasks with! The latter use case is interesting because it follows a very basic system rule of high gain from abstraction. In this instance, the programmatic interfaces are used to amplify human capabilities. If that’s the bottom up view, the top down view is to embrace the world of RPA (Robotic Process Automation). We’ve been calling this "big button" automation for years now and we can view this as human driven tasks, mechanised to run on a platform or framework. It’s a case of "Back to the Future" and it comes straight out the 1970s.

When a network engineer goes on a Python course to learn some programming skills, the question I always have is "for what purpose"? Beyond personal interest or fear, which is totally legitimate by the way, do you know and can you quantify it? It’s safe to say, most network engineers feel enormous responsibility and care to what they do and it’s terrifying to let some of that go.

#### Expression

Workflows are expressed as a flowchart of tasks, with input and outputs normalised to a standard. The more complete a process is, the more complex it appears.
State-tracking for a stateless process, layering in constraints and dealing with non-real time activities like authorization and timing, leads to complex representations. It’s possible to simplify complexity, but not remove it.

I believe there is value in a network engineer being able to understand how to express a flow of a workflow in pseudo-programmatic terms. For instance, a network engineer in a workflow should not be saying "YAML goes here and JSON goes there, YANG is validated here and this Python class deals with X", but instead should be saying "Data is gathered here from a database query and then stored in memory as a variable and presented to the task logic". Time is finite and being an expert on multiple domains is NP hard.

You have a valuable place in making sure developers understand network logic and how to embrace programmatic interfaces. You can also point developers to consumable SDKs (software development kits) and libraries to achieve integration between a framework and the network control substrate.

#### Silo Smashing

The best way to meet in the middle is via common ground, or something like a demilitarised zone. Being able to speak the same language helps to reduce the height of the walls around a silo. Where specialisms exist, there will always be mental silos and cases of "you don’t understand". The challenge is, can you or your organisation help the developers to meet you in the middle? Developers that take the time to talk with you, the experts of the network realm, will they take enough away to speak some of your language? I’m not referring to the intricacies of packet forwarding engines, P4 or BGP, I’m talking about the basics. Do the developers truly understand why they should use NETCONF with XML instead of JSON over REST? If they’re a primary developer like you’re a primary network engineer, then moving away from their comfort zone with REST and JSON should be achievable. Network devices are not web-services and it’s within your domain to show them why and what they are. You can still ensure that the job gets done without taking control of the programming!

#### Distributed Consensus

This is something developers always struggle with. Distributed computing and eventual consistency is hard. Entire careers are devoted to this topic and as network engineers, you have a gut feeling about how these things work. Networking protocols via whatever means necessary share information for each router to build a picture of the network. It might be enough to form a graph or it might be just enough information to make a decision. Whether it’s link-state, distance vector, path vector or something else, it doesn’t matter. The result is for a device to have enough information to decide on what to put in the forwarding table based on certain constraints. Your job is to know how what a chain reaction looks like within your domain of control. We do exams on it and prove to ourselves again and again we can handle this cognitive load. That’s your domain and not theirs. Just because a developer might write an Open DayLight application or agent to manipulate the ephemeral state of a device, it does not mean they have any clue on this topic. They consult a domain expert and acquire the logic.

Going on a programming course will help you to express what happens and how their logic should be. Sometimes it takes one expert to learn the language of another to explain in their terminology and get the company moving. Meeting in the middle sometimes doesn’t work.

#### Developer Symbiosis

My day job is a privilege and one that permits me to meet a tremendous number and variety of organisations and people. I’m so lucky to see what I see day to day and week to week and without getting myself sued, I want to help the industry as much as possible in making great decisions. Most of the itches and niggles that you feel, I’ve felt and rest assured, you’re not alone. If your organisation wants to embrace automation and is pondering what to do, having some programming knowledge is a huge gain. I believe the absolute value is symbiosis and not for you to be a secondary developer and primary network engineer. I write code and do not consider myself a developer, but an automation architect that knows how to express a solution to a challenge.

Sometimes, no matter how hard you try, you cannot communicate how things work nor how they should work. Taking the popular view that Python is the access door, Python scripts are useful for knowledge encapsulation and with some developer guidance along with basic training, it’s possible to encapsulate workflow knowledge, handle errors and failure conditions gracefully, then return structured data for something else in the workflow to make sense of what you did.

I believe having programming experience is helpful to achieve symbiosis and not independence. A full-time experienced development team might own the responsibility of the application landscape and with some low-level learning and guidance from the software community, your knowledge and expertise can be programmatically expressed and encapsulated into the wider architecture.

Any code you generate will be reviewed and you will receive requests to change aspects of it. You will be criticised and, in some instances, mauled. During your early days, it can be gut wrenching. Communication is key and nothing works better than a face-to-face chat or phone conversation. This topic is complex; the written word rarely helps to solve disagreements or clarify misunderstandings. Over time, like anything else, it gets easier and the result is the injection of your expertise into your business, one that is more software driven.

Programmatic expression and symbiosis are I think the most two important aspects of learning to program and the trend towards Python means it’s relatively easy to do so.

#### Close

I’ve tried to avoid talking about engineers writing rubbish code and performing miracles. This is a subjective matter and have tried hard to make this about real gains and not pulling apart arguments. I hope you find this useful.
---
title: "NetDevOps: Delivering Network Levers"
date: 2015-07-09T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "NetDevOps: Delivering Network Levers"
signoff: Dave
categories:
- NetDev
tags:
- NetDev
---

As a recent transition from the VAR side of the room to that of the vendor, it’s been eye opening and a great reset experience to view the world from a previously unexperienced angle. Truly.

Just for clarity, this post contains my own views. Period.

What is so apparent and this falls perfectly inline with [Matt Oswalt’s floweringly hilarious post](http://keepingitclassless.net/2015/07/big-flowering-thing/), is we’re moving to a period where sexy has to be real and functional. It could be an easy button (something that makes your life easier as an operator of network infrastructure) or an insight shared with your customer that results in infrastructure being used or consumed slightly differently to solve a real business problem. After all, the infrastructure wouldn’t exist without the business requirement to consume it. The days of huge world changing massive behemoth solutions has died a death. Why would an enterprise change their entire operational procedures and practices just because “MEGA SOLUTION-TRON” can make an omelette? The NOC team doesn’t even eat omelettes!

Take the story of Software Defined Networking. Starting out as a centralised control-plane for distributed data paths and being churned up by the stampeding vendor crusades, it’s now a $variable that covers simple automation via APIs (NETCONF, REST, CLI, SNMP – whatever) to fully complex overlay solutions with NFV. As tech types, we get all excited by something cool coming out to tweak and play with and find a solution that’s looking for a problem. What’s the view of the potential consumer?

![silent willy](/images/blog/Silent_Willy.jpg#center)

Not one person wants lock in, but we all need stability, supportability and reliability. We want to make simple changes rapidly without things blowing up, or a crazy software bug taking down the whole network. More importantly, once the silence starts, it continues. Your once important customers just stop making decisions out of confusion. This is true of consultancy and sales of equipment.

Trying to explain why *you* absolutely need this technology is hinged on the requirement for usage and consumption. OpenFlow is hugely misunderstood (expect it to be even more so with PIF, P4 and POF), but frame a consumption model that’s easy and reliable and you generate interest. Forget pure OpenFlow environments, but where *could* you use it to deliver an easy button? Protecting your public facing application servers? How about controlling elephant flows on a high output DMZ? Where might you want to drive something via overlays because doing it the traditional way is so damned hard and time consuming? Can you remove a bottleneck by introducing bits of seemingly sexy technology? Maybe if you make the sexy a bit frumpy and less scary, you might get taken seriously. No one likes to hear how you’re the best person ever. Not to mention, if the wonder solution puts people out of work, expect layer 8 issues. Your intended audience might not even turn up to hear your ground breaking world news.

Serious question: Would you use the technology you promote yourself given your business objectives? Can you do more than talk about it?

As a closing statement and thought, the purpose of DevOps and NetOps (netdevops?) when the focal point sits over network infrastructure, is to solve real issues and help customers and consumers increase business velocity in this ever increasingly new world we live in. Let’s not unicorn-ise/bacon-ise/rainbow-ise this. This doesn’t need super-selling with rockets on. It needs customer empathetic understanding and an approach that helps to mend and improve the performance and reliability of business critical infrastructure.
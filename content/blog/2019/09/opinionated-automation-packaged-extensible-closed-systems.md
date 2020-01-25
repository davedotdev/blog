---
title: "Opinionated Automation: Packaged, Extensible & Closed Systems"
date: 2019-09-20T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Opinionated Automation: Packaged, Extensible & Closed Systems"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

Network engineers for the last twenty years have created networks from composable logical constructs, which result in a network of some structure. We call these constructs “OSPF” and “MPLS”, but they all inter-work to some degree to give us a desired outcome. Network vendors have contributed to this composability and network engineers have come to expect it by default. It is absolute power from both a design and an implementation perspective, but it’s also opinionated. For instance, spanning-tree has node level opinions on how it should participate in a spanning-tree and thus how a spanning-tree forms, but it might not be the one you desire without some tweaks to the tie-breaker conditions for the root bridge persona.

Moving to the automated world primarily means carrying your existing understanding forward, adding a sprinkle of APIs to gain access to those features programmatically and then running a workflow, task or business process engine to compose a graph of those features to build your desired networks in a deterministic way.

This is where things get interesting in my opinion. Take Cisco’s ACI platform. It’s closed and proprietary in the sense of you can’t change the way it works internally. You’re lumped with a set of operations that you use or do not. You’re also forced to deploy it in a low number of ways. I’m not bad mouthing Cisco here, I’m just merely pointing out it’s closed and prescribed in nature. I have no opinion on whether this is good or bad in the context of this post.

If ACI was built from off-the-shelf Nexus platforms and ACI was a configuration construct, would the users of ACI be happy with the opinions shipped on the controllers? It would force the devices to be configured in some best practice way that may differ from your best practice. The devices you choose in the Nexus range may not be suitable for the ACI configuration construct, but hell, you want them anyway because of the cost or platform hardware configuration.

Given that two major approaches exist, closed and prescribed vs open and flexible, it’s therefore worth talking about extensibility and openness from a workflow perspective. Network vendors deliver prescribed workflows on both of these system approaches to empower users to carry out daily tasks and vendors haven’t figured out yet how to read the minds of their customers. There are workflows that you need that no other customer may have in mind and it’s of paramount importance to be able to extend a solution for custom workflow deployment. If you can’t do this, then you end up running a higher level orchestration workflow over one or more vendor based solutions to drive your own workflows; a fun but complex scenario. I don’t want to get in to diving deeper on this for this short post.

To finish this coffee thought off, I’m of the belief that in automation there is a general notion to be able to solve EVERYTHING so we can solve ANYTHING. Given a vendor solution may deploy an eVPN with iBGP internally vs eBGP, does that irk you because it’s not how you’d do it? What if you couldn’t change it but the vendor offers fantastic support? Sometimes I think we pick faults with solutions because at first glance, given many options, we’re likely to pick something different to someone else. Fewer choices results in lower variance but that also irks us. Opinionated automation i.e. pre-packaged workflows on vendor platforms will always do something you don’t like, but there’s always justification for it.

Is your opinion wrong or is the choice of opinion low? Whatever you choose, it’s someone else’s opinion. Automation in many ways can give us the power to enforce our own opinion on to a design, but are the outcomes worth the investment?
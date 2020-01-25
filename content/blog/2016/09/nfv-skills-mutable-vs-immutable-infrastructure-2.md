---
title: "NFV, Skills & Mutable vs. Immutable Infrastructure"
date: 2016-09-29T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "NFV, Skills & Mutable vs. Immutable Infrastructure"
signoff: Dave
categories:
- NFV
tags:
- NFV
---

![confusion](/images/blog/confusion.jpg#center)

This blog article was inspired by some infuriating reads and blogs doing the rounds doing significant damage to business thinking.

I’ve heard so many conversations that confuse Software Defined Networking with Software Driven Networking, automation mixed up with abstraction and MANO (Management and Orchestration) mixed up with configuration management tools that are used for building mutable infrastructure like Puppet, Chef, Ansible and Salt. Is it possible to cross pollinate all of these technologies? Sure, but do not expect people to happy about it. Nerds will love it, process people will hate it and failures will be dominant. Don’t even go there with failing fast. That statement is out of scope as an excuse.

#### Mutable Infrastructure

Mutable in this sense means to mutate and change. Configuration management tools can create virtual machines, populate them with the packages required to deliver services and place domain specific configuration in order to make them live and in production.

Mutable infrastructure as we know it today is "treat your VMs like cattle, not pets" and this is achieved with well known tools.

#### Immutable Infrastructure

Think about containers here and unikernels. The idea is we build applications with as few dependencies as possible. Ultimately building applications with what’s required to stand them up on a VIM (virtualised infrastructure management system) like OpenStack, or even on a standalone hypervisor.

Immutable infrastructure is not maintained or ‘mutated’, it’s simply destroyed and re-deployed when required.

#### Software Defined Networking (SDN)

We used to say "Still Does Nothing". The reality is, that’s just not true. The notion of end-to-end SDN is a myth and never happened. It was great thinking and if it’s done nothing than accelerate us forward, it’s done something meaningful. 

SDN is now used to augment existing software driven networking (i.e. built in integration) and automated systems. For example, dynamic path selection based on OpenFlow is a manifestation of SDN. Spoiler alert, doing something from a controller with NETCONF is not SDN. It’s configuration management. The control plane is still distributed in a network and no amount of marketing will change that.

#### The Melting Pot

We all know that you can use Puppet to configure an edge port and a load balancer. StackStorm can be used to do the same thing. I could write a Python script and the result is the same.

Our ultimate end place is to use re-usable automation that is easily understood. It saves time, brings orders of efficiency and is easy to maintain should the worst happen.

Using Puppet to deliver MANO? Probably not the best idea. Using the right tool for the right job requires knowledge. There is lots of knowledge to gain before you truly understand all of the choices and no single source is going to give you that.

#### Network Function Virtualisation (NFV)

Finally we get to something meaningful.

Here we get to the crunch. Some of this might be completely logical, but some of it might provoke thoughts.

It is possible to base NFV on both mutable and immutable infrastructure. It is possible with some engineering to build a whole MANO layer using any decent automation tool that has a decent workflow engine for dealing with events, with extensible input and output blocks. We can build a single network function in to a binary, then build that in to a unikernel and push it to a hypervisor. thus "Immutable NFV".

The notion that we need well defined blocks like the below is due to an industry that has consistently built well structured and defined systems that can be manufactured by vendors. Operators do not like building and maintaining their own hardware. The view on software has changed recently and more and more operators are contributing to open source projects and some are even writing their own orchestration engines.

* NFVM (Network Function Virtualisation Manager)
* VIM (Virtualisation Infrastructure Manager)
* NFVO (Network Function Virtualisation Orchestrator)
* EMS (Element Management System)

The blocks above exist because software development costs a lot of money and highly specialised teams that understand the application of the code they write exist in small folds, usually within vendors. It’s a position that the industry is used to. Giants like Facebook, Amazon and Google (I was going to call that group FAG as an acronym, but it doesn’t work so well!!) are happy to engineer their own solutions because they attract some of the best talent. That’s not everyone.

#### Close

If you want to engineer systems that behave, are easy to maintain and functional with high performance, think carefully about the approach. Vendor lock-in still is an issue, despite the noise of innovation. With well structured designs, automation is highly effective and the currency of an organisation (data) flows smoothly.

If one team that uses Puppet to build servers decides it’s the right tool to use for end-to-end network automation, present the domain specific problems of networking. If their areas of impact are minimal, suggest that Puppet feeds into a network automation workflow that the domain expertise understand. Making well understood networking changes is hugely important and requires the right skills to do so. Making configuration changes to Linux requires the same domain level expertise. Depending on which side of the invisible (hrmm) fence you are on, your view will change. Domain level expertise is the centre of the decision making process when deploying automation, the tools can be swapped and some are more suited than others. If you can achieve one thing, try and avoid using too many tools, but accept that some decisions are wrong and one tool cannot do everything effectively.

Go for agility, impact of application, rendering of domain expertise and ease of remote procedure calls and reporting. It’s no surprise that Chatops is on the rise and JSON APIs are coming of age.

Until the next time/rant.
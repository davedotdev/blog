---
title: "Declarative and Imperative Automation Thinking"
date: 2017-09-11T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Declarative and Imperative Automation Thinking"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

![Declarative Stark](/images/blog/declarative_imperative_stark.jpg#center)

Event driven or workflow driven automation for the uninitiated can appear daunting. With the rise of machine learning which adds more complexity to our field, simple rule driven automation feels more in reach than it ever has. This post aims to introduce you to a viewing lens for the world of great automation.

Converting processes in to workflows can be a tough task to accomplish and whilst this is relevant, it isn’t for this post. That’s one for another day but a great talking point and one that will be addressed.

#### The Layer Cake

Good automation tooling offers two views of the world; one high level that you pass arbitrary data around and one that handles interface implementation, which converts the arbitrary data to meaningful contextual data. In other words, a declarative and an imperative view, the ‘what’ and the ‘how’. The dimension that exists between the two can make or break the tool. If we have to care too much about how data is passed from one layer to the other, we’re not users, we’re more co-developers and it’s a kit not a tool.

Our Layer Cake model is simple at a high level. Two layers are enough to think about the high level.

![imperative_declarative](/images/blog/imperative_declarative.png#floatleft)

Descriptions of these two ways of programming have been around for a very long time. If you’re in networking, the phrases might be new, but the understanding of each most certainly isn’t.

Declarative & Imperative 101
Let’s explore declarative and imperative 101. Network engineers use features embedded in to a network operating system. This network operating system has been created by a team of developers. The developers have worried about how BGP offers its NLRI to a peer. Wearing the network engineer hat, we turn the BGP feature on and offer it domain specific information like IP ranges and policy surrounding ASNs. Network engineers deal with the declarative and the developers take care of the imperative. Although it might feel like the ‘how’ to network engineers, only the ‘what’ is considered. You think you’re in control; to a degree you are, but the grit lies with the developers. For a good solid peering session, you have more to thank the developers for than your ego may want you to.

Many conversations are STILL going on surrounding the journey of network engineer to software developer. Unless you want to be a programming language expert, learn how to communicate to software engineers and between you, your employer will be better for it. The middle ground between network engineering and the IO layer is however attainable.

> Network Engineer —> Workflows —> IO Layer

The declarative way of thinking covers the “what”. Keeping this network focussed and using another example, when an interface on a network device needs configuring (let’s pretend only IP exists), attributes like an IP address, subnet mask and protocol options are gathered from the administrator and applied. Do we understand intimately what the feature does at an implementation level to move that arbitrary but domain based contextual data to a hardware or software data-plane? As network designers and engineers, unless you’re optimising for specific things, then that knowledge although interesting is irrelevant and useless in most cases.

So, when do network engineers have to consider the how? Failover and recovery scenarios are a good example. How we want something to fail-over or fall-back, how we want the traffic path to look after condition ‘x’ has occurred. Thinking about the ‘how’ isn’t so foreign, but it feels un-natural mainly due to how we’ve become reliant on network operating systems.

As network engineers do not consider this implementation detail regularly, it’s not surprising that fear runs in the ranks from what automation asks of them. We do not always have to consider both what and how.

Dealing with What and How
Our lives are made immediately easier if we can use a tool which provides us the declarative components (the what) and that in turn deals with the imperative (the how). If we have this available, then dealing with arbitrary data is our game.

Good tools keep the abstraction layer (the ‘what’) clean and normalised. Speaking practically, let’s take the over abused configure a VLAN workflow:

VLAN is a number between 1 and 4096 (int16/uint16) and a text description (string type)[^1].

```plaintext
{
	vlan_number: 42
	vlan_name: VLAN of all the things
}
```

| Device | Delivery Method
| --- | --- |
| Cisco Switch | CLI |
| JunOS Switch | NETCONF |
| Arista Switch | REST |

We can break this task down in to a few steps:

1. Acquire VLAN value
2. Acquire VLAN name
3. Send value dictionary/map/hash off to Cisco IOS CLI integration
4. Send value dictionary/map/hash off to Juniper JunOS NETCONF integration
5. Send value dictionary/map/hash off to Arista eAPI integration
6. Collect values from each and store in a log

This workflow can be executed in parallel and the input data you can see above is the same. Whatever each integration chooses to do with it is private/encapsulated to the integration.

Here’s a visual example of an integration:

![cli_block](/images/blog/cli_block.png#floatleft)

The imperative implementation lives inside the integration. This could be dealing with forming the NETCONF envelope, or pushing the CLI commands. At this level of automation, we only concern ourselves with the data and consume the integration off the shelf instead of creating it.

What if you wanted to create it? Then sure, knowledge of a programming language and how to consume vendor software offerings like an SDK (Software Development Kit), or API is useful. This is one of the drivers for network engineers to learn some programming skills. The notion that network engineers should learn to code to write scripts is a null point. There is no value in point specific scripts that have to be changed regularly. Use that skill to create the integrations which consume the same arbitrary data and what you’ve now got is a set of re-usable components instead of a list with slightly different scripts.

If you want to start with automation today, then take the contents of this blog post, create that dual view mentally and consume what you can and create what you must.

Creating re-usable blocks means you can create engineering flow chart style automations. Data flows through these blocks in the order you want them to be in. This is workflow based automation in a nutshell.

If your brain is new to these concepts, next you’ll be thinking “What if I want to trigger this automatically?”. That is exactly what Event Driven Automation is and welcome to a whole new world.

#### Summary

It’s easy to view a good tool as bad because it doesn’t look and feel like a network operating system. If it did, there is a bad smell. Things that smell bad are normally thrown away (or if you’re like me as a child, hidden away and inspected for interesting biological growth periodically). View the world through the lens of the Layer Cake and your automation journey might begin to make sense in your everyday world and not just when you sit down with a set of documentation.

#### Disclaimer

I currently work for Brocade as a product manager / technical marketing engineer specifically around automation. That means I get to work with cool tools like StackStorm. I have been no way coerced in to writing a blog article focussed on StackStorm and have not received monetary gains as an independent tech writer, critic, reviewer and evangelist. These thoughts are mine and not those of my employer.

[^1]: A VLAN is 12 bits not 16, but our type choices are 8 or 16bit. An unsigned 8bit integer is too small and a signed or unsigned 16bit integer is suitable
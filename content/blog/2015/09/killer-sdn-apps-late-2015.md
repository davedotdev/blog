---
title: "Killer SDN Applications: A view in 2015"
date: 2015-09-16T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Killer SDN Applications: A view in 2015"
signoff: Dave
categories:
- SDN
tags:
- SDN
---

Whilst on the DLR in London earlier this year (2015) a set of thoughts came to light whilst pondering centralised decision making for part of a network. It’s not uncommon to hear “Product X is a great platform that just needs the killer app”. Why the DLR? No drivers, swipe-in-swipe-out ticketing and a well defined service. A train still takes you from A to B, but the whole service around it has completely changed to keep up with the requirements. Thought provoking stuff.

#### TL;DR

Many people talk about killer apps and are seemingly waiting for them to pop in to existence. This post goes someway to come to terms with the lack of emerging killer apps and why we’re one paradigm shift away from seeing it happen.

#### The Rub
I’ve said this a million times, but traditional networking skill sets view the network as a CLI that is linked to features. Separation of the monolith seems mad! Why separate something out when what we have today works? Well, that’s the key issue.

#### The IPEngineer Laws of Humans

Networking as we mostly know it today:

1. Is massively reliant on error prone humans
2. Humans are an expensive resource to have sitting on the CLI all day building out networks
3. Humans can’t work as fast as intent driven mechanisms that take values from a source of truth like a database
4. Humans are good at figuring out fairly static topologies with predicable outcomes for a low number of combinations
5. Humans are terrible at repetitive ‘boring’ changes
6. Humans just can’t react quick enough to environmental changes without going through ITIL CAB bodies
7. Humans need to be thinking of clever stuff for the next big thing and need to deploy fast

Am I ruling out humans? No. Keep reading.

With forwarding and forwarding lookups being made on-box in the traditional sense still (apart from some edge cases where flows aren’t programmed in controller driven edge cases), how does the forwarding information get generated that is pushed down to the forwarding plane? Right now we have more ways than ever of generating this. We can do both pre-emptive forwarding information generation, reactively and in real time. A number of ways follows below:

1. Scripts
2. Linked APIs (like ESXi to a product integration suite like OnePK, pyNOS, PyEZ)
3. Path Computational Elements in the traditional sense
4. Software networking controllers with applications/bundles
5. OSS/BSS generated decisions based on customer service
6. Network renderers that generate forwarding information from intent manifested in policy. Look up GBP and SFC.
7. Traditional network operating system baked in protocols
8. On-box scripts that make decisions based on pre-programmed logical conditions. E.g. IP SLA

If we have all of these ways of generating forwarding information, no wonder the industry is so confused. More than ever, matching the technology to the business problem has to be a priority. Understanding the problem end-to-end is the first step without bias to history or favour.

Ultimately this comes down to knowledge of the network designer and valid information at the time of design. Is it worth partnering with a vendor that has code in development? Right now you want to use available feature 1/5, but 2/5 would be useful in six months. Sure. Just make sure roadmap information has been sponsored and is underwritten by someone in that vendor organisation who can execute and own the relationship.

#### Why Do We Need SDN Killer Applications?

With the influx of Whitebox, Britebox, OCP projects, programmable software data planes on x86 powered by DPDK, traditional networking hardware has a tough job to stay relevant. If your business operates in the field of digital service delivery, then the network has to be capable of providing flexibility. It might not be today or tomorrow, but it could be the day after.

Automating simple deployments today builds knowledge for tomorrow. Knowing what works today can help shape tomorrows development both internally and externally. The organisational automation journey could be considered a scale. On that scale going from 2 to 3 is constituent part of going from 2 to 8. So how do we get from 3 to 4? If 2 to 3 could be provisioning access layer networks using full stack tools like Puppet or an OpenStack ML2 plugin, then 3 to 4 could be implementing NFs (Network Functions) by means of a controller and programmable forwarding planes. Moving from 4 to 5 could be via instantiation of a VNF (simple or complex) via a MANO architecture. [IPEngineer bet for 2015: MANO will be critical in networks of the future, including enterprise, carrier, telco and service provider].

#### Killer App Scenario Time

Your application runs on containers within a tenant on OpenStack. Your tenant network has a virtual edge router which traditionally has pointed to a single router to gain access to the corporate network and beyond, to the internet. Your tenant edge router enforces policy for ingress/egress packets but beyond that, transit on to the corporate network is dealt with via the edge. Let’s assume the core network is now totally programmable and the topology is computed in real-time to make the best of expensive WAN circuits between all of the sites. Your organisation generates a huge amount of data internally via sensor networks and the IoT, so this kind of behaviour is critical to maintain connectivity. Sound far fetched? It’s not.

The network architect introduces a second router that provides access to application tenant networks, which is connected to a diverse transport network. The applications have been deemed too valuable to be offline under failure conditions or diverse backhaul congestion. Having more links means better chances of controlling traffic across the whole organisational network.

Does the network architect choose VRRP? HSRP? GLBP? Under this scenario to provide the FHRP? Any of these common and standard methods of providing resilient and highly available gateways fails to deliver against the criteria and does not mirror the almost fluid biological topology changes taking place in the organisation core network. Here’s a slot for a killer application. If this application could figure out what path was being used to get to the tenant networks, the gateway could move to reflect upstream conditions in unison with the upstream computational change. Let’s call this application “Dynamic Reactive IP Gateway v1.0” and it’s downloadable through the Open DayLight online store. Would you buy it? Is it better than writing code yourself? The last bit depends on the type of consumer you are, but as it becomes commonplace to treat the network and architecture like cattle, then applying such weird thoughts to it will ultimately become common place. It’s weird today due to the way we think about network features and how they’re delivered via network operating systems. Once the architecture is aligned, then the thoughts are normalised and have relevance.

Making this a bit more real, David Barroso of Spotify has the SDN Internet Router (SIR), which is a great concept based on having a cheap Layer 3 switch that can be used as a BGP peering device. If you could turn a switch into a fully-fledged BGP peering point for an IX, would you do it? Ok, SIR has some limitations mainly in the space of number of prefixes programmed to the FIB, but the limitations of doing it in the first place actually triggered its creation. Most networks use a low number of the prefixes they receive from IX peering points, so why take them all? If you could have an application that adds prefixes when you start using them, you have a ‘slow path -> fast path’ scenario that we’re quite used to. If you could have an application that does this for you and even emails the owner of the prefix asking for permission to peer and share prefixes, would you buy it and run it? Would it not make your life easier and allow you to do other things? Check out SIR [here](https://github.com/dbarrosop/sir).

#### Summary and Close Out

We can take what we already know and already do, improve on it and go do something else more interesting if we change our view point to the way we perceive network architecture that provides access to the applications residing on it. No longer should it be ‘us and them’ or ‘that’s the way we’ve always done it’. Is this a solution looking for a problem? You can be the judge of that. This writer firmly believes that as times become fluid and flexible, it is pertinent to stay relevant and provide what is required to enable fluid and flexible businesses to survive.

Personally I think we’re on the verge of something great happening in the networking space. The network does not stop at the underlay and packets traverse physical tin and virtual data path elements to get to endpoints. Packets go through various control and grooming elements on their journeys between consumer and application. As the world of system administration, network administration, application deployment and infrastructure management collide in epic fashion, it might be time to de-construct what it is you actually want to achieve with the network and spend some time figuring out if there are better ways of doing it that are in alignment with the rest of the organisation that needs the network. If there are parts of your architecture that dynamically adjust, get aligned and go talk to the people responsible.
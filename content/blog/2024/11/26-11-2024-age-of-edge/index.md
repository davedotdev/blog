---
title: "Sensible Edge Architecture"
date: 2024-11-26T00:15:00+00:00
image: images/blog/builtfm_header.png
author: David Gee
description: "The edge must be simpler and cheaper!"
signoff: Dave
mermaid: false
categories: 
- blog
tags:
- k8s
- nats
- hardware
---

It's the week after the week after KubeCon 24 North America, which was hosted in Salt Lake City, Utah (US). I must say I thoroughly enjoyed the trip and Salt Lake City was a genuinely lovely surprise! The mountains were just magic, and I'd absolutely go back.

Onwards! Yes, blahblah.AI was everywhere and it was clear to see lots of VC dollars floating around trying to make a profit. This last year for me has been all about the edge and I love SUSE's terminology of the far edge, near edge and tiny edge. SUSE provides a great set of lenses to view the world through and coincidently also wrote a [fantastic book](https://www.amazon.com/Cloud-Native-Edge-Essentials-Strategies/dp/B0DKY92Q71/.)! I also have to admit that I know at least half of the authors and I'm both beyond pleased for them and a little smug that I know them! You can download it for free [here](https://more.suse.com/Cloud_Native_Edge_Essentials_Ebook_LP.html?_gl=1*1qmne9s*_gcl_au*NzA0NjAzNzczLjE3MzI1NzkxODE.*_ga*MTg3MjAzNjIyNS4xNzMyNTc5MTgx*_ga_JEVBS2XFKK*MTczMjU3OTE4MS4xLjEuMTczMjU3OTUzNy42MC4wLjA.). 

{{<img75centerlink href="" src="suse_edge_book.png" alt="SUSE cloud native edge book">}}<br/>

The edge (near and far) demands a handful of things like low(er) power consumption and making the best of lower connectivity speeds than found in bleeding edge data center environments. There is a high probability of edge systems requiring inferencing (sorry to mention AI) and "cache and forward" low disk count RAID based storage. The tiny edge is something else altogether, with more direct actuation against machinery, vehicles or people, but low cost CPUs have changed the industry that used to rely on SCADA systems and microcontrollers and now it's possible to run single core Linux systems on sub $20 hardware. It's mostly thanks to ARM cores.

## Ampere Computing, born for the edge

The ARM revolution continues to deliver. I've had an eye on [Ampere Computing](https://amperecomputing.com/) for a while and its timing couldn't feel more accurate. The criteria for Edge with lower power requirements coupled with core density for running lots of workloads, along with GPU-less inferencing, make Ampere strategically placed for success. Instead of having lots of pizza box machines all running low CPU stress workloads, it makes more sense to dedicate cores for long running systems and save on system complexity. That typically also means Linux everywhere, paving the way from Cloud tech (apps running on Linux, despite being containerised), straight to the edge. Development, compilation, testing and tooling can be familiar without special software. In addition, you can drop the bus speeds marginally and save up to 40% on power, perfect for edge workloads and ever increasing power demands, cooling requirements and bills! 

{{<img75centerlink href="" src="ampere_chips.png" alt="Ampere Chips!">}}<br/>

I met up with some folks on the Ampere stand at KubeCon and realised I knew one of them from the OpenDaylight days (circa Brocade era of SDN). That led to some great conversations, and I walked away convinced that hardware tech for the edge has come of age. My brain also felt robbed of some opportunities in the past with NFV and the ability to throw cores at problems! Never mind, that's just life and timing.

### Networking, k8s and the edge

When I worked for network vendors (Brocade, Extreme, Juniper Networks), I spent a few years thinking about networking technology and how what it could do for the edge, IoT and OT. Think IoT gateways and "on network" features and capabilities to enhance that space. I failed. Providing IPv4 and IPv6 connectivity is non-blocking and prolific, who really cares? Networking is still mostly misunderstood or underestimated, but orchestrated container systems require a fast, low latency (typical) IP fabric underlay network, then the container system provides its own layer of misdirection in the form of compute based overlays. Overlay networks are like a virus in the Kubernetes world and it makes me cringe a bit when I think about all the encapsulation and decapsulation packets go through that form a service's network flow. Let's just throw another overlay at it!

Disclaimer alert, I work with NATS.io every day and I'm lucky to have been able to get intimate with it. Building applications with NATS gives you a super power and for me, the chance to simplify network flows and remove as many components as possible went beyond a nice to have. It became a way of life and I swing the axe of complexity reduction with passion. That means removing overlays, removing service meshes and going back to basics in a world that seems intent on unfathomable complexity through great software design and implementation instead of pouring more glue.

By the end of KubeCon NA 24, I remain convinced if edge application developers took Ampere's AmpereOne chip that delivers a brain warping core count of 192, an architect's eye of distributed systems thinking through NATS style architecture and the challenging demands of edge, something special will happen. The good comes in the form of power savings, simpler operations, a shallow network stack, a comprehensible system architecture and much less physical hardware like GPUs and CPUs etc. What's not to love!

All of this said, I've not kicked the tyres yet on any of the Ampere hardware so this is more of a brain dump and fan boy post, but even after time to think and reflect, I'm still excited by the combo.
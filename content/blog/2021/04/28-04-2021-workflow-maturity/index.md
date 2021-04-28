---
title: "Workflow Based Automation: Maturity and Abstraction"
date: 2021-04-28T02:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "A thought on the maturity of workflow based network automation and leaky abstraction."
signoff: Dave
mermaid: true
categories: 
- Network Automation
tags:
- workflow
- maturity
- abstraction

---
This short post discusses maturity of automation based on workflow meta-data and proposes that we start tagging workflows, or workflow south-bound interface (SBI) plugins with `leaky requirements`.

## Leaky Abstraction Again Dave? 

*I had a stint with Leaky Abstraction back in 2017, which if you have a few minutes, can read [here](https://dave.dev/blog/2017/10/network-automation-leaky-abstractions/).*

Leaky abstractions. Again. Much like a network leaking through a [TCP socket](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/), the problem with workflows is they offer an abstraction to the user that have underlying implementation requirements. If we are to re-use workflows and make them key components, then we have to consider southbound conditions and capabilities.

Imagine two Ethernet switches, one with a Broadcom ASIC and the other with a custom vendor ASIC. Both chips have some overlap in functionality, difference in operational programming and difference in edge functions and scale. I do not mean edge as in cloud or telco edge, I mean edge as in the Venn diagram edge where the chips do not overlap.

Now, going further, imagine a workflow of some description driven by Ansible, Terraform, Salt (whatever) that implements EVPN-VxLAN with stitching and edge routing, there will be some differences in implementation not only to the network operating system, but also the style of chip and packet circulation within that chip. Let’s ignore for now issues of scale, throughput latency and other fun qualities.

## The NOS Deals with That

Yes. It does. But it doesn’t excuse you from thinking about or dealing with the problems described. I’ll use an old example of a Cisco ME3750 L3 switch. This switch I used operationally and knew well (at the time). It could handle single layer MPLS stacks and served its purpose for AToM style traffic. It did not however end well for those doing L3VPNs with multi-label stacks, because the poor asthmatic CPU had the job of crunching L2.5 frames. Just because the NOS allows you do it and hides the chip’s lack of capability doesn’t mean you should do it. Automation doesn’t change that human behaviour, in fact, it could make it worse as the experienced engineers move further away from operations and “Oh look, this workflow runs on IOS”. This makes me think about error checking too, but that’s for another post perhaps.

## So What Do We Do?

I’m of the belief, that workflows should have meta-data with their desired outcome and those workflows have to compute conditions before executing. That might be a Jinja2 template file that leads to configuration being pushed but having a mechanism to ensure the underlying abstracted away platform meets the objective of the workflow is still key. Today this is still manual, and I would love to see this thinking as a pre-run set of qualifiers for any automation system. It could be a set of simple capability `if x then proceed` type statements, or something fancier. All in the name of reliability and progress.

An ultimate solution could be a device catalogue that listed capabilities, with workflow and SBI plugin tags to aid the match of desired state and function with capability.


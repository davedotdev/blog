---
title: "[2/4] Composition & Service Function Chaining in Network Service Meshes"
date: 2019-11-29T12:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "[2/4] Composition & Service Function Chaining in Network Service Meshes"
signoff: Dave
categories:
- Service Function Chaining
tags:
- Service Function Chaining
---

![WF](/images/blog/Data-Workflow-icon.png#center)

#### Not Storing State in the Network 

OpenFlow (OF) adoption failed due to scalability of forwarding tables on ASICS, not so great controllers, lack of applications and a non-existent community. OpenFlow however is still useful today for overriding forwarding decision making on a hop-by-hop basis and handling exceptions from what would otherwise be a normal steady state forwarding decision. Exceptions like bypassing limited throughput devices like DPI nodes for large known file transfers are a classic use case. We don’t care beyond simple authentication (maybe) who the client is, so take our file and don’t consume resources doing it.

OpenFlow presents flow state to an ASIC, state that can be granular. If we use it for forwarding equivalency classes (FECs) then it’s no different to normal routing and frame forwarding. That wasn’t the goal and thus, it added to the list of failure reasons. A controller programs flows via an OpenFlow interface on a network element, flows which could time out automatically or be long-lived, requiring the controller to remove them. Also, flows can be programmed proactively from a network design, or reactively from the controller receiving a header packet and deciding what to do with it. Vendors naturally added to the complexity of this by throwing in ‘go to normal’ lookup tables type functionality, known as ‘hybrid’ OpenFlow. [OpenVSwitch](https://www.openvswitch.org/) is the most successful artefact that came out of the OpenFlow movement and can be used to create great open network solutions. As a software artefact, it isn’t necessarily bound by hardware limitations. With regards to hardware, vendors have been and gone that have tried to work with granular flow information.

Under failure of a controller, all state has to be re-discovered and handled. It doesn’t feel very natural and it’s a headache. So let’s not do it.

I truly believe OpenFlow however acted as a catalyst for something like [P4](https://p4.org/) to come along and wasn’t an entire waste of time. If you’re interested in programmatic friendly networks, it’s well worth watching P4 evolve.

Taking some inspiration from this, having a controller observe topology and forwarding capabilities of both physical functions (PFs) and virtual functions (VFs), it becomes trivial to enumerate nodes, program some basic index or vector identity on to them and have them behave as a forwarding agent within the domain of a service mesh, irrelevant of how the data-plane functions at this point.

Storing state in the network at scale, doesn’t work as we’ve lightly touched on. The internet consists of approximately 800k routes (at the time of writing), which is a positively large lookup table for performance expected to be in `nS`. Put on to commodity hardware (i.e. enterprise), then it really doesn’t scale or work. We want the network to be a commodity dumb system with as few changes as remotely possible to increase stability and reliability.

Some ~40 years of major IPv4 usage has passed and it would be foolish to assume we could just rip and replace networks globally to make life easier. Within the confines of data centre and service delivery, our upgrade cycle however may let us embrace open standards based technology that vendors support. Let’s assume that’s 80% of standard functionality of something like [SPRING](https://tools.ietf.org/html/rfc7855).

#### Close

[Part three](/blog/2019/11/pt3-composition-in-network-service-meshes) carries on where we left off, with application de-composition and some of the challenges associated with that.
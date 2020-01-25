---
title: "[1/4] Composition & Service Function Chaining in Network Service Meshes"
date: 2019-11-29T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "[1/4] Composition & Service Function Chaining in Network Service Meshes"
signoff: Dave
categories:
- Service Function Chaining
tags:
- Service Function Chaining
---

![WF](/images/blog/Data-Workflow-icon.png#center)

This is part one of a series of posts on Application Composition within Network Service Meshes, otherwise known as Service Function Chaining, but at L7 and not L3/L4.

In Network Service Meshes (NSM), it is a complex affair steering L7 requests and responses through the correct network of components. The current approach at the time of writing (November 27th 2019) is to accept requests on a proxy entity and couple that proxy to an application component through a data-plane. Ideally the model works in both private on-premises and cloud deployment models.

For the sake of building a mental image, this is a graph network that has both control-plane and data-plane attributes on nodes and vertexes.

In IP networking, IP packets are routed to their destination and return to their source, based on their destination IP header field and when policy requires it, we can use other fields like source IP, protocol and port numbers etc. In large networks (like the internet), it’s the destination field in the IP header. In both IPv4 and IPv6 there exists a means to steer packets through a network based on additional fields being present at the point of ingress to a network edge and thanks to Segment Routing and Service Function Chaining, there are multiple choices which may assist us in our problem space exploration.

This post specifically focuses on application composition using exploded application deployment, like microservices or individual functions. See below for a terrible diagram.

![kentucky_fried_service_mesh](/images/blog/kentucky_fried_service_mesh.jpg#center)

For application composition through distributed functions in a service mesh, the challenge is how to process requests hitting a proxy and carrying out service chaining without the network holding service flow state. Flow state grows with each iteration of application de-aggregation or de-composition. Flow state exists within the domain and bounds of a system, irrelevant of where it’s stored. It could be in the control-plane, data-plane, user-land application of in a packet.

Given application composition through microservices and/or individual functions, the granularity must be handled without affecting performance of the network on the whole and for portability, it should require zero or minimum changes to the underlying infrastructure. This means not letting the requirement of state leak on to the underlying network.

This series of posts explores methods of achieving a stateless service mesh for the purposes of application composition through service chaining of individual components, where all state is inferred onto the packets at the service mesh edge. The service mesh can therefore be an overlay or underlay type of network, behind an edge proxy such as [Envoy](https://www.envoyproxy.io/) or other application delivery controller (ADC) with suitable functionality or extensibility.

Something I find interesting, is the domain knowledge difference between network engineering and software development. For example, imagine a conversation between a network engineer and software developer on the merits of an F5 Big IP load balancer vs NGINX. It would be enjoyable to listen!

Some constraints:

__C1.__ Minimal modification of existing IP network.

__C2.__ Ideally cloud friendly for the concept of multi-cloud i.e. making the best of highly available competing cloud offerings for reliable services and also, the all important money saving.

__C3.__ Developer friendly. If it isn’t, it won’t get used. Developers will just find a way not to use it, irrelevant of it being mandated by managers. This isn’t because developers are bad, they are natural shortest-path-to success hunters.

Here are some logical choices:

1. IPv4 Native: Loose Source Routing (LSR) and Strict Source Routing (SSR). It’s also possible to use the Record Route (RR) header to track the path through the mesh.

2. IPv6 / MPLS: Segment Routing groups nodes together into segments and then packets can traverse those segments. It makes traffic engineering simpler on the whole. There is also a source routing header, which was deprecated in favour of SR. [More on SPRING](https://tools.ietf.org/html/rfc7855).

3. Network Services Header (used in service function chaining – [RFC8300](https://tools.ietf.org/html/rfc8300)).

4. Classic SDN using supported means (OpenFlow)

Don’t bother with the network at all and use a message queue 1:1 between constituent components as a forwarding path.

A word on security. There be dragons. I acknowledge this readily and openly. I will not cover that aspect in this post. With my limited security knowledge, I see challenges in creating and managing such a thing.

#### Close

Part two will touch on handling state which can be found [here](/blog/2019/11/pt2-composition-in-network-service-meshes).

This is an interesting topic and it’s an area under constant development!



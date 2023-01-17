---
title: "Moving up the Stack with NATS"
date: 2023-01-16T10:00:00+00:00
image: images/blog/diary_entry_header.png
author: David Gee
description: "Moving from networking to application communication with NATS"
signoff: Dave
mermaid: false
categories: 
- career
- nats
tags:
- career
- nats
---

For as long as I can recall, I have a fascination with communication systems and have a bias for how machines communicate with each other to convey intent and meaning. This fascination has led me down the path of communication theory, graph theory, promise theory, and many other arcane theories and subjects. The flip side is real world implementation and that’s what really flicks my switches.

Over the last two decades, I’ve been involved heavily in computer networks which in their simplest form, move around data payloads between two or more points, all at high speed. These networks feel live living breathing things and the network nodes that move the data, communicate with each other and exchange information, forming partial awareness graphs, which are then rendered to the data forwarding layer. Of course, I’m talking about the control-plane which deals with programming routing and forwarding tables, but in my head, it’s much sexier. These systems are communicating machines and exchange data through protocols that miraculously agree on how to manage various types of state. Some protocols have dedicated IP protocol numbers and some ride over TCP like BGP, which arguably is an application.

I started out in life building systems from tiny devices, way before Arduino or Raspberry Pis came along. Some of these systems communicated over RS232, RS485, I2C, SPI and I wrote framing protocols so they could pass messages. I created a form of XML in the 90s which was compact on the wire and was human readable, making it easy to debug. Now days, you would **JUST** use GPB, XML, JSON (the list goes on) and transport the encoded data over IP. The expected norm is for everything to be IP connected but it’s all a matter of perspective. On a device with a few KB of memory, a TCP/IP stack is a huge set of code for the CPU to execute, with a high burden on memory. Rolling the clock from the 90s to now, device CPU horsepower and memory is more than capable and so building a device that communicates with IP is easier than ever. Take an ESP32 device or Raspberry Pi. No sweat! But much like I wouldn’t dream of writing an optimised TCP/IP stack, I also wouldn’t write a connective substrate for the system either. How devices and systems communicate can be done off-the-shelf and in which everything just works.

Client server, micro-services, IoT, mobile, vehicles and everything I’ve else not mentioned where there are disparate blobs of software communicating, all do so in known forms. Whether that’s 1:1 communication like middleware to a database, or M:N like IoT sensors publishing data into a stream for a consumer to process and store, I consider these patterns solved.

Along comes the newest ripe for abuse term: edge. Along with other terms like multi-cloud, micro-services and serverless, they have many crimes to answer for, but they’re a great way of framing the challenges communication professionals face:

- Things that communicate are smaller and do less stuff
- Many of these systems must be able to find each other easily
- Data transmission and processing is temporally decoupled
- Where they live could be anywhere, from public cloud, on a cellular or license free radio network (mobile, WISP etc),  fixed-line ISP, in a vehicle and in space
- These systems might transmit events, or data that goes into event sourcing and thus, we’re talking stream processing and generation
- These systems may have energy saving requirements like being a sleepy endpoint (running on solar or battery etc)
- Systems are unpredictable in their spawning and death patterns and patterns often follow the sun
- System ephemerality means a system could be short lived but must still take part in a communication structure
- These pathways must self-heal and communication has to be lightning fast
- Security is paramount and least-trust or zero-trust ideally must be followed
- Communication patterns vary between 1:1 and M:N and nothing should be assumed because the problem spaces, performance and healing characteristics requirements change
- Handling synchronous and asynchronous communication methods is normal
- Temporal decoupling, where things communicate at different rates is normal
- The ideal list is huge, and this is just an example exploration!

Then comes the challenge for software developers and engineers needing to move fast without reinventing the wheel time and time again. This is developer experience and solving for DX means supporting multiple programming languages and making it easy to do, with solid examples, docs and empowering tool-chains that can accelerate idea exploration. Our world gets more complex and complicated leading to lots of potential fragility, but system users expect higher levels of reliability with each swing of the entropy pendulum.

Everything above is a terse high-level set of thoughts I have around modern communication system engineering. I haven’t touched on anything research based or sci-fi, like entanglement or quantum $stuff, but the thoughts have burrowed their way in. Networking at L2/L3/L4 is needed to underpin cloud, the internet, service provider and utility networks, but I’ve been struggling with the real value proposition of communication systems for a while in terms of where I want to spend my life’s limited available energy. It’s time for me to go higher up the stack and concentrate on system wide communication instead of just the packets, as important as moving them around is. It's not that I’ve fell out of love with networking, it’s that the love building communication systems has moved up the stack.

{{<img75centerlink href="https://synadia.com" src="synadia.png" alt="Synadia">}} 
<br/>
{{<img75centerlink href="https://nats.io" src="nats.png" alt="NATS.io">}}

As of January 2023, I had the elation to be welcomed by the Synadia team, that created the amazing [NATS.io](https://nats.io) project. I will be focussing on enabling communication patterns at the system level and look forward to being the best tribe member I can be. The NATS project is in the CNCF, written in Go and has a great toolchain that means it’s possible to try out your ideas without writing any code.

NATS can offer a wide range of capabilities from simple to more complex:

- Request / Response
- Publish / Subscribe
- Load balancing worker queues
- Cluster aware RTT load handling
- Jetstream _(replaces STAN)_ - Persistent streams enabling the decoupling of producers and consumers
- KV store enabled through Jetstream which can replace ETCD
- Global clustering capabilities with intelligent leaf nodes at the edge
- Self-recovering connectivity for client-server
- Built in security through least permissions based on operator, account, and user functionality and PKI that's empathic to underlying hardware
- A SaaS version called NGS that has a free account option!

The magic of NATS is that it can be used to build connective substrates for almost infinite use cases. I would have loved to drop NATS on to an operating system like Junos and create a fleet management and data collection overlay. Imagine being able to check the entire state of your network through one command, have distributed and independently acting state machines and even use it as a config store for locally ran workflows, not to mention there’s the whole data management aspect and empowering telemetry. NATS can be used as an off-the-shelf control-plane substrate and it can enable the much-needed management plane for network wide observability and assurance.

TL;DR, NATS is a drop in connective substrate that can be used from everything like building routing protocols, management-planes, telemetry substrates and more. Out of networking, the use-case potential is almost unbound and its future in Micro-Services, FaaS, IoT, Intelligent Cities and Smart Vehicles excites me.

If you want to know more about NATS, here are some resources:

- [NATS By Example](https://natsbyexample.com)
- [NATS Newsletter](https://synadia.com/newsletter)

2023 is shaping up to be a great year and if anyone wants to chat NATS, you know where to find me. I’m on the NATS Slack and my usual social media hangouts.

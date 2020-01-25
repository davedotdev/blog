---
title: "Juniper JET & Golang"
date: 2018-04-05T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Juniper JET & Golang"
signoff: Dave
categories:
- Juniper JET
tags:
- Juniper JET
---

![grpc_square](/images/blog/grpc_square.png#center)

Network programmability and network automation go hand-in-hand (pun intended) and I’ve been waiting for an opportunity to play with the Juniper IDL (.proto) files to build a JET (Juniper Extension Toolkit) application. Thanks to [Marcel Wiget’s](https://marcelwiget.wordpress.com/2018/02/13/inject-routes-with-multiple-next-hops-in-junos/) efforts, the opening I’ve been waiting for came along!

#### So what is JET?

JET is a couple of things:

* Ability to run Python, C and C++ applications onboard both veriexec and non-veriexec enabled Junos
* Ability to create an off-box application using GRPC and MQTT

JET allows you to program Junos out of the normal NETCONF, CLI, SNMP and ephemeral DB methods that we’re all fairly used to. The other thing is, it’s quick. Like really quick. With GRPC and MQTT, we can program a network element using mechanisms the software world is used to. I’ve been saying for a long time our data is no longer our own and JET allows us to bridge organisational worlds in multiple ways. Pretty cool.

#### So what did you do?

Not having a huge amount of time for this, I opted for off-box and took [Marcel’s code](https://github.com/mwiget/jet-bgp-static-routes) as the base for how to use the APIs exposed via GRPC.

The application uses the “bgp_route_service” JET API via GRPC to program and delete BGP routes with multiple next hops.

If you’re curious about the code, you can check it out via the link below. The READMEs should take you from zero to hero and I would love to know how you got on!

[https://github.com/arsonistgopher/junos-jet-demo-apps](https://github.com/arsonistgopher/junos-jet-demo-apps)

#### Update – May 2018

I’ve changed the repository location to my Golang based alter-ego (ArsonistGopher) and there are now multiple apps! This list will probably continue to grow, so it’s worth checking in from time to time.
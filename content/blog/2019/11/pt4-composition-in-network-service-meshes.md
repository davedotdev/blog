---
title: "[4/4] Composition & Service Function Chaining in Network Service Meshes"
date: 2019-11-29T16:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "[4/4] Composition & Service Function Chaining in Network Service Meshes"
signoff: Dave
categories:
- Service Function Chaining
tags:
- Service Function Chaining
---

![WF](/images/blog/Data-Workflow-icon.png#center)

#### Following the Path

Welcome to part four of this series. This this final part, we will explore our options for networking a composed application, from a de-composed monolith or set of microservices.

Here is a logical set of options:

1. Proxy: Having a network kernel, ADC or proxy for every component to handle implementation of the service chain. Sidecars quickly solve an issue, but double component count within a mesh. Proxies work well in public and private clouds, but for commercial applications may incur license costs as well as higher resource utilisation to cover the sidecar container.

2. Language specific libraries: which wrap your application packets in a [NSH](https://tools.ietf.org/html/rfc8300) handling outer encapsulation. No sidecar required, no modification of a host. This adds complexity to software development in terms of modified socket libraries, but a well designed and implemented library does not expose the complexity. All your code has to do, is accept connections through a modified socket library. This works in the cloud providing security policies and routing domains allow it.

3. Overlay: Add flow data to forwarding entities. Let’s face it, this isn’t going to happen in a cloud environment unless you’ve implemented a full overlay. An [OpenVSwitch (OVS)](https://www.openvswitch.org/) overlay network would work along with technology like [Tungsten Fabric](https://tungsten.io/) and the commercial version.

For this to work, we need to enumerate function components (by IP address, socket, protocol, call) and map them to service function chains as per request intent. At the point of the request entering the network domain (i.e. the edge), classification is made on the request and a path is chosen based on some arbitrary metrics like load, response time, locality, whatever.

Flows can be pre-programmed at the point of network domain entry.

Header: A header can be generated at the point of network domain entry.

Once the first hop processes its task, the payload follows the service chain and then can return directly (asymmetric) or return through the same path (symmetric) to the source.

At each touch point, packet headers are re-written regardless. With NSH, more manipulation is done, for example the index with the SFC being traversed, but the network still doesn’t hold state and I see this as the way forward.

#### Mapping Functions to Applications

I’ve been thinking about a topology mapping service for a while for this kind of thing, which will ultimately allow a service-chain to form, rendering an application from its constituent components. Each component would need to follow some basic rules like single in/out, agreed data serialisation and structure and once done, it’s possible to drag and drop components to form an application service function chain. Each component could be collected from the servicing nodes and then through indexing each node in the graph (the network of service nodes), it’s possible to automatically build out the NSH header on ingress to the proxy, expanding capabilities directly from one-to-one mapping of say verbs on a REST application to a function or microservice, to one that contains both one-to-one and chained functionality.

#### Close

I’ve not proved any of this out yet and this is primarily a bunch of notes, thoughts and observations from watching the network service mesh space evolve.

NSH could be a nice winner here for governing data-plane path traversal for application composition. It works today for carrier networks and 5G, so why not application composition for decomposed, F2 type deployments?!

Would love to hear your thoughts on this. Again, this isn’t an academic paper, but a set of blabbering I wanted to share.
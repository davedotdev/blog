---
title: "[3/4] Composition & Service Function Chaining in Network Service Meshes"
date: 2019-11-29T14:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "[3/4] Composition & Service Function Chaining in Network Service Meshes"
signoff: Dave
categories:
- Service Function Chaining
tags:
- Service Function Chaining 
---

![WF](/images/blog/Data-Workflow-icon.png#center)

#### Application De-Composition

Applications are ever evolving and so are the architecture patterns:

![the_three_kings](/images/blog/the_three_kings.jpg#center)

```plaintext
MONOLITH -> MICROSERVICES -> FUNCTIONS(FaaS) + FLOWS
```

Monoliths were easy. Route to them and send the returned packets back to their source.

Microservices (MS) sees a monolith or new application being reduced to smaller self-contained parts, which may talk east-west or north-south. It’s quite common to see a proxy deal with inbound connections and internal communication between components hidden from external interactions. Internal communication typically is either point-to-point (also could be through a load balancer/proxy) or via a message bus of some description.

Functions & Flows makes life even more interesting. We further break down the components of microservices to individual functions that deliver pages, computation and web application components etc. More flow information exists on the whole and the number of points involved in an interaction with an application increase with every de-aggregated component deployed.

*For brevity, I’m going to call Functions & Flows, F2. I’ve never seen it shortened to this, so if you see it elsewhere, let me know!*

o add to this, MS and F2 components may reside on different infrastructure, separated by the internet and differing policies. Thus, deduced, different IP underlying capabilities.

Let’s use a web service that’s been ‘functionised’ as an example. A common model is to have a proxy which accepts the initial connection and deals with requests to individual components based on arbitrary rules like response time and load. But what about composition of an application? In networking, we call this service function chaining (SFC) and the concept is as old as networking itself. A loose description would be a request results in a blob of data being passed through a chain of processing components, that performs extraction, transformation and loading functionality (ETL). This could be performing calculations on a value, data enrichment or adorning data with HTML elements.

With JavaScript applications not showing any signs of going away, it’s also possible that each component on a web application calls different backends, which in turn looks like a Cartesian product of complexity.

#### Building Applications

Is it a possibility that each application presented to a user group is actually a list of intent presented by a proxy, that hands off fulfilment on a backend? Imagine designing an application with a library of components. A drag drop application flow-chart style, which renders function components for a scale unit. Components as they’re deployed are enumerated and indexed, i.e. their topology is known at birth, which means it’s easy for the service mesh proxy to build out a service function chain (SFC). Specifically, I’m talking about program creation, not control structure as is common with [Helm Charts](https://github.com/helm/charts) or [Kubernetes YAML](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/) file.

From a data-plane aspect, a distributed application that does header manipulation to fulfil service function chaining could live on each host or operate with the application code in a sidecar container. This pattern is prominent today and with some minor modifications to the sidecar application, functionality can be extended to support composition.

To combat complexity, each node that does this manipulation can report activity for tracing, logging and observability operations.

It’s not important for a user to define an explicit path in terms of fulfilment of this composition, but a system could fulfil a contract request and self-re-organise upon failure or breach of contract.

I firmly believe, half the challenge is decoupling operator paranoia from declarative need. I “want” an application of type X and the infrastructure should be able to grab that intent and render my application, without worrying about primitives like VxLAN, NSH, VLANs or VRFs. Why should we care about these things? When it goes wrong is the rhetorical answer and that’s why data visibility, collection and processing is key. When the situation goes south, engineers should be able to either modify and re-deploy a la cattle style, or temporarily override to correct until a re-deploy is possible. That doesn’t mean either having power CLIs everwhere. Operators should be able to manipulate state with a usable API and have skilled engineers write a temporary fix application until a production fix is available. OpenFlow overrides are handy here! Some network element operating systems offer ephemeral configuration that can override boot time config to aid this scenario.

Application development patterns will follow a take on an Extract Transform and Load (ETL). For example, de-serialise the payload, unmarshal, modify, searialise and push. A common data encoding standard would need to be agreed by any development team for this to work effectively.

I mentioned in [part one](/blog/2019/11/pt1-composition-in-network-service-meshes), we could just use a message queue to act as data-plane pathways between each constituent component within an F2 system. It would be fairly trivial at deployment phase to set the queues up and pass in as function arguments their respective communication message queue information. I believe it adds more complexity to the F2 pattern to do this and without it, developers pop the payload, perform ETL and push it back on to the path.

#### Close

[Part Four](http://ipengineer.net/2019/11/pt4-composition-in-network-service-meshes) and the final part of this series of posts, looks at way to follow the path of a composed application.





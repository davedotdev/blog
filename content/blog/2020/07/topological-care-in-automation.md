---
title: "Importance of Topology in Automation"
date: 2020-07-07T02:00:00+00:00
image: images/blog/topological_header.png
author: David Gee
description: "Without a treasure map, there is no voyage. Topology in automation, is our treasure map."
signoff: Dave
categories: 
- Automation Principles
- Musings
tags:
- Automation Principles
- Topology
- Reliable Automation
---

This post shares some musings on the matter of the importance of consumable topology in automation.

#### Connected Automation

Automation in IT and the field of computer networking mostly comprises of reducing keystrokes in processes traditionally executed manually. That has led to innovation in pipelines that contain tool-chains with human interfaces. The original purpose on SDN was to remove the damage humans can do by moving logic to a controller and associated applications, that controlled FIBs and RIBs.Turned out, not very many network engineers like this.

Roll the clock forward a decade and where are we? Using developer tools to version control text templates, that in turn generates human readable configuration. Complaints are now commonplace that this approach is all too complex and error prone. I agree. It’s too complex and feels like we’re just attaching rocket packets to a caveman’s club.

#### Blast-Radius(x)

The outcome of making a (physical or logical) configuration change and the fall-out of such. If you break a web server, inflight traffic will be affected and there may be a number of internal connections to be closed. Any system worth the name, will remove the webserver from the pool and thus damage done. You could say this has a blast-radius of one; it affects the nodes directly attached.

Networking is more complex. A node has a blast-radius(n) characteristic; we just don’t know how far the damage spreads.

#### CICD Pipelines

CICD pipelines are great for end-states that have the characteristic of blast-radius(0). These pipelines are decomposed scripts, with each block’s inputs to each block function residing in text file form in a versioned repository, driven by a task engine invoking tools at each stage of a superimposed workflow. To word it a different way, a structured program from the 1960s has been created, with each set of inputs for the block being a set of text files and a tool which deals with the functionality of the block. These tools might generate configuration, they might run unit checks for semantic and syntax content, or perform dry runs etc. What we’ve done is disassembled human engineering and tied it back together in a compose-able way.

Good examples of fits for CICD pipelines are deploying code to servers or to container schedulers. A high level story would look like:

“An application is due for some new features. The developers add the features, add some unit tests (which they’ve already tested locally), add integration tests and deploy the whole thing to test. The application itself is a set of decomposed services with their own configuration gathering mechanism”.

At some point in the application’s design, some people have thought about how the application bootstraps and gathers configuration, how the services deal with authentication and authorisation and how they report information for observability purposes and logging. The main point here is, the software typically is a web application or set of web services often with different front-ends. The software services themselves other than knowing how to communicate with neighbouring services that offer functionality, know nothing to little about architecture, nor care.

Does the database care if only one web server is online? Each component will have been engineered for failure modes and survival, but they do not topologically care.

Network automation is different. Social media participants have argued this point over years; “Is network automation special?”. It’s not special, but it is different.

Network automation offers a ‘Blast-Radius(n)’ characteristic. These problems are wholly different and components take part in a topology where something ‘must’ care. That something up until recently are humans. Today’s approach, worryingly, is to hammer the problem into a different shape by the now rocket-powered caveman club.

Rarely in networking is there an acceptable survival mode. If an access port is down, then someone, a server or site cannot access network resources. If a backhaul link is down, capacity is usually chopped in half and resiliency is lost. With each ‘down’ event, fines can be incurred, peoples jobs lost and if the network is a service-provider, then businesses could be forced to close. Even worse, if this network deals with emergency services or the military? Lives could be lost, the biggest cost of any network ‘down’ event.

So why is it, we remove a human that has topological care, provide a dumb CICD pipeline that constraints the configuration generation process to emulate the conditions for reliability? Is it ignorance? Is it being innovative? This is what we have to solve.

Only when we can access topological care as a service can we insert its characteristics over the top of a CICD pipeline. How we do that, in my opinion, is how we move forward.

#### Topological Care

Huge hint; I’m not talking about physical topology, but the entire stack of topologies.

To reach maximum reliability we need absolute assurance that devices and configurations provide us the topologies required in order to deliver services. Therefore, we have a dependency tree of conditions that must always be met if we are to get a 100% trust metric. Having a human insert these values into a spreadsheet, database or even worse, YAML files, isn’t a harmonious reliability vector.

Dependency trees are also dynamic in nature. Some might be configurations related, some might be from operational state. Predicate logic (good sources: H.Mills, E.Dijkstra) is a way to do this. We have functions that take inputs from a process and allow us to get to a true/false. If we can reduce dependency trees to simple yes/no, then it becomes easier to measure and assert the integrity of the tree, which provides a measure of reliability for configuration mutations.

Imagine ‘knowing’ that two ports are connected correctly and LLDP sees relationships prior to configuring BGP. As a human, you might check a diagram, you may check LLDP, you might even configure a filtered test range of IP addresses to pass ICMP echo requests over said link. When it comes to network automation, what do we do? We might configure these steps in Ansible playbooks, bash scripts or proper workflow engines. We take text snippets of outputs and do text matching on them. Do we go off and check a topology graph? Rarely to no. By trying to automate today, we’ve constrained the error margin within the pipeline, but reduced the sensitivity and comprehensiveness (logical bandwidth) of predicate math.

This post doesn’t cover anything to do with low touch or self-organisation. We fail as an industry at the most simple things.

#### Wonder Product
Yep. Other constraints exist in wonder solutions and the cost is flexibility. Many solutions state “You can’t touch the box” and if you do, the system removes the human interference.

You can go down the product route and get this topological care and today any other attempt of doing so will result in DIY.

We must do better!!!
---
title: "Replacing a Network Element Config System with Git"
date: 2019-09-09T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Replacing a Network Element Config System with Git"
signoff: Dave
categories:
- Git
tags:
- Git
---

In this post I’ll explore replacing the heart of a network operating system’s configuration mechanism with the software developers take on version control. It can be argued that network operating systems, or at least good ones, already have a version control system. It’s that very system that allows you to roll back and carry out operations like commit-confirmed. More specifically, this is a version control system like Git but not specifically git.

As my day job rotates around Junos, I’ll concentrate on that. So why would anyone want to rip out the heart of Junos and replace it with a git backed directory full of configuration snippets? Software developers and now automation skilled engineers want the advantages of being able to treat the network like any other service delivering node. Imagine committing human readable configuration snippets to a network configuration directory and having the network check it out and do something with it.

Junos already has a configuration engine capable of rollbacks and provides sanity through semantic and syntax commit time checks. Mgd (the service you interact with) provides mechanisms to render interfaces through YANG models and generates the very configuration tree you interact with. You could say mgd takes care of the git like mechanisms for you but interactively. Through a user interface, a user loads text, XML or JSON snippets into mgd instead of text files. Instead of a git commit, mgd commits the new semantically checked configuration tree to the data store and then performs syntax and logic checking. I believe the gains from mgd outweigh the loss in perceived flexibility from using a version control piece of software like git. Check out [RFC 6241](https://tools.ietf.org/html/rfc6241) for the intricacies on NETCONF, which mandates the data store functionality which Junos is built upon. This mechanism has been there for twenty years and is not an afterthought to keep up with trends.

As an attempt to provide some defining language, I want to describe what my take on primitives, artefacts and assets are. These can all be version controlled using git or whatever your tool of choice is.
 
 __Primitives__
 
 VLANs, VxLANs, IP ranges, port numbers, ASNs etc

 __Artefacts__

 Configuration templates (J2, Moustache, language native templating), Terraform resources, service descriptors etc to be consumed by a workflow (machine or human driven)

__Assets__

Generated configuration state items in a network element native language or high level tool like [Terraform HCL](https://www.terraform.io/docs/configuration/syntax.html).

These components allow your configuration pipeline, whether a CI/CD system or workflow engine to change the state of your network element, satisfying the asset input conditions.

The description I gave earlier: “Imagine committing human readable configuration snippets to a network configuration directory and having the network check it out and do something with it.” is a basic description for a ‘component’ within a CI/CD pipeline. Engineers can check configuration asset fragments into a repository for the pipeline to check them out, perform some pre-tests, merge and post-test. Depending on what your pipeline actually does, with an operating system like Junos that already performs sanity semantic and syntax checking, you’re actually just doubling up the work higher up in the layers. It’s worth knowing what you’re dealing with before generating work for yourself. Generating the assets from artefacts and primitives however is always low hanging fruit.

#### Summary

Whilst the notion of replacing the guts of a network element with something like Git seems attractive, a lot of engineering time has been spent creating these network operating systems, a lot of user time has been spent getting the best out of them and many problems you may not be aware of have been solved before the industry got to this point of pondering. Moving your service logic upwards to a set of workflows, with primitive, artefact and asset management however makes perfect sense. This becomes your go to abstraction layer, leaving much of the value in place lower down the stack.






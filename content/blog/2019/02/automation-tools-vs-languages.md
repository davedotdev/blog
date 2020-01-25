---
title: "Automation: Tools vs Languages"
date: 2019-02-20T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Automation: Tools vs Languages"
signoff: Dave
categories:
- Automation
tags:
- Automation
---

When it comes to expressing intent in automation workflows, there is validation in both using a task or workflow engine and also knocking it together using scripting in some language. I try not to get involved in tool or language wars, but quite honestly sometimes can’t help myself. I’ve even been known to throw fire on the fuel and get the marshmallows out.

#### Task & Workflow Engines

Sometimes a framework or tool can feel constrained and by design can force you to work in a way that is computable. Let’s take what Ansible or Mistral does. It has a set of ordered tasks, an entry point, some input variables that "flow" through the lists of tasks and some calls to some modules that deal with outputs. I can understand how network engineers don’t like some of these approaches because it feels like dynamic feedback is missing from the engineering. Testing through both verification and validation phases is supposed to replace that immediate dynamic feedback and it can take some time to get used to.

These kinds of automation tools require installation and also the correct modules for integration against the networking components. The tool build can also be automated and thus made repeatable.

__Pros__

* Re-usable declaration of intent
* Anyone with basic understanding of a generic tool can understand what the workflow does
* Forced into using proper keywords and laying out information, which is the equivalent of a programming style guide
* Modules for the engine handle errors so the workflow designer only has to handle workflow errors
* Connections are handled by the engines and engines drivers/providers. This load is taken away from you, the workflow designer
* Support for the tool by the vendor is normally available, plus a community of fellow users
* Logging and tracing is normally built in

__Cons__

* Engines, frameworks and tools can feel very constrained and remove ‘creativity’ or dynamism
* You’re at the mercy of a thing that might one day not be supported or backwards compatible with your deployments
* Engineers often have pets and choose badly based on nostalgia or social media recommendations
* Data manipulations are at the mercy of inbuilt or plugin type systems
* Semantic versioning of the data is possible with tools, but to manage estates of networking equipment with different versions of the networking software can be a challenge. In reality, dynamic loading and unloading of modules could be required

#### Programming Languages

With a script or compile-able code, you have all of the creativity power at your finger tips, but also a huge amount of rope. Not only plenty to hang yourself with, but enough rope to turn yourself into Poppa Geppetto’s favourite little wooden person.

Just because a programming language has an SDK for a device, or a basic abstraction library covering a set of devices, it doesn’t mean it’s the right choice by default for your organisation or needs. Can your team code in said language? What about discipline and code intent? I’ve seen scripts without comments, any blank lines (at all) and thousand line scripts without error handling or common chunks of code put into functions. I’ve seen the two organisation heroes telling everyone to use `$.language` because it’s better. Better than what? Without a style guide to enfoce readability, maintainability and intent, you could be back at the design phase within six months because of runaway complexities and bad technical choices.

That said, scripts that follow a style guide and display adhereance, can be read, understood and maintained. Be warned, this takes discipline and it doesn’t take much for engineers to moan that their creativity has been taken away (again). It’s not that this should be boring, it’s just the fact that network software is versioned, tasks can be complex, data has to be transformed and southbound handling of connections and logic can be a nightmare. Not to mention logging, tracing and observability!

__Pros__

* Native use of data structures and manipulations
* Full control of logic flow without constraints of tool modules
* Fully coupled semantic versioning at your finger tips so it’s easier to keep in check with the target South-Bound API
* Lots of engineers are prepared to invest mental energy into learning because it’s their future

__Cons__

* Lack of discipline just produces a pet. The creator called it Dave and put its picture on Instagram
* Pets to control cattle is just ironic
* Very few script writers handle connection management, authentication, ETL processes and real time logic well
* Lots of engineers want opportunities to learn and be on a stage somewhere giving their hero talk so will take selfish risks

#### Close

I don’t think there is a single answer nor a single approach. Decisions are affected by technology appetite, risk aversion, current company culture, aspirational culture, vendor involvement and management. Both approaches have their place and they’re not by nature exclusive. Both can yield both great and terrible results. One thing I always try and keep in mind is to question a severe bias to one or the other and figure out what it is actually that needs to be done. Neither is better than the other in the same way moonboots ar better than a pogo stick. Both get you from A to B.

As per all technology challenges, the viewer looking at the end result, that might be a number of layers away, might not care how the process is automated. They might only care that their access port or WAN circuit is alive. Sometimes getting the job done just means that and avoiding cool.